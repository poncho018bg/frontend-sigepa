import React, { useContext, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { RegistroSolicitudContacto } from './RegistroSolicitudContacto';
import { RegistroCargaDocumentos } from './RegistroCargaDocumentos';
import { RegistroFinalizado } from './RegistroFinalizado';

import Button from "components/CustomButtons/Button.js";


const useStyles = makeStyles(stylesArchivo);

const pasos = [
    'Registro de Contacto',
    'Carga de Documentos',
    'Registro Finalizado'
];

export const RegistroSolicitud = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());


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
                        <RegistroSolicitudContacto />
                        : activeStep === 1 ?
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
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Saltar
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === pasos.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}