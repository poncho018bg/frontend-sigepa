import React, { useContext, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { RegistroCurp } from './RegistroCurp';
import { RegistroDatosSolicitante } from './RegistroDatosSolicitante';
import { RegistroDireccion } from './RegistroDireccion';
import { RegistroSolicitudContacto } from './RegistroSolicitudContacto';
import { RegistroCargaDocumentos } from './RegistroCargaDocumentos';
import { RegistroFinalizado } from './RegistroFinalizado';

import Button from "components/CustomButtons/Button.js";


const useStyles = makeStyles(stylesArchivo);

const pasos = [
    'Curp',
    'Datos Del Solicitante',
    'Direccion',
    'Registro de Contacto',
    'Carga de Documentos',
    'Registro Finalizado'
];

export const RegistroSolicitud = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [activar, setActivar] = useState();
    const [curp, setCurp] = useState();

    let datosEnviar;
    const llenarDatos = (nombre, apellidoPaterno, apellidoMaterno) => {
        /**
         * se guarda al ejecutar esta función
         */
        console.log("funcion llenar datos", nombre, apellidoPaterno, apellidoMaterno)
        datosEnviar = {
            nombre, apellidoPaterno, apellidoMaterno
        }
        console.log("datos enviados ---> ", datosEnviar);
        /**
         * al llegar aqui se inicia el guardado en la BD
         */
        
        /**
         * Se inicializa el nextbutton para asegurar que va a llegar a la siguiente pantalla los datos a enviar
         */
        NextButton();
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const NextButton = () => {
        console.log("aqio esta el activar ---->>", activar, curp);
        console.log("state --->", datosEnviar);
        if (activar && curp != undefined && curp != '') {
            return (
                <Button onClick={handleNext}>
                    {activeStep === pasos.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
            );
        } else {
            return (
                <Button onClick={handleNext} disabled='true'>
                    {activeStep === pasos.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
            )
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {pasos.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === pasos.length ? (
                <span>
                    Has completado todos los pasos

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reiniciar</Button>
                    </Box>
                </span>
            ) : (
                <>
                    {activeStep === 0 ?
                        <RegistroCurp setActivar={setActivar} setCurp={setCurp} />
                        : activeStep === 1 ?
                            <RegistroDatosSolicitante curpR={curp} llenarDatos={llenarDatos} />
                            : activeStep === 2 ?
                                <RegistroDireccion />
                                : activeStep === 3 ?
                                    <RegistroSolicitudContacto />
                                    : activeStep === 4 ?
                                        <RegistroCargaDocumentos />
                                        :
                                        <RegistroFinalizado />}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Regresar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/*
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Saltar
                            </Button>
                        )}
                        */}

                        <NextButton />
                    </Box>
                </>
            )}
        </Box>
    )
}