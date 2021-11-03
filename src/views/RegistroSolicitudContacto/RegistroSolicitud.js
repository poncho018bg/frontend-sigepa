import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { axiosGet } from 'helpers/axiosPublico';

import { RegistroCurp } from './RegistroCurp';
import { RegistroDatosSolicitante } from './RegistroDatosSolicitante';
import { RegistroDireccion } from './RegistroDireccion';
import { RegistroSolicitudContacto } from './RegistroSolicitudContacto';
import { RegistroCargaDocumentos } from './RegistroCargaDocumentos';
import { RegistroFinalizado } from './RegistroFinalizado';
import { RegistroCaracteristicasAdicionales } from './RegistroCaracteristicasAdicionales';
import { RegistroIngresos } from './RegistroIngresos';

import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

import Button from "components/CustomButtons/Button.js";

import ValidarPrograma from './ValidarPrograma';
import { Loading } from 'components/Personalizados/Loading';


const useStyles = makeStyles(stylesArchivo);

const pasos = [
    'Curp',
    'Datos Del Solicitante',
    'Direccion',
    'Registro de Contacto',
    'Carga de Documentos',
    'Registro Finalizado',
    'Identificación de ingresos económicos de la mujer',
    'Características adicionales de la solicitante'
];

export const RegistroSolicitud = () => {
    //id del programa
    let query = useLocation();
    console.log("ID DEL PROGRAMA ====>", query.state?.mobNo);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [activar, setActivar] = useState();
    const [curp, setCurp] = useState();
    const [loading, setLoading] = useState(true);
    const { beneficiario, registrarBeneficiario, direccion,
        registrarDireccionBeneficiario, getBeneficiario, actualizarBeneficiario,
        obtenerDireccionBeneficiario, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);

    //constante para llenar el programa 
    const [identPrograma, setIdentPrograma] = useState();
    //funciones de hijos
    const child = useRef();
    const direccionChild = useRef();
    const contacto = useRef();
    //let datosEnviar;
    /**
     * llenado de datos del beneficiario
     * @param {nombre} nombre 
     * @param {apellidoPaterno} apellidoPaterno 
     * @param {apellidoMaterno} apellidoMaterno 
     * @param {curp} curp 
     * @param {genero} genero 
     * @param {fechaNacimientoReal} fechaNacimientoReal 
     * @param {edad} edad 
     * @param {estudios} estudios 
     * @param {estadoCivil} estadoCivil 
     * @param {identificacion} identificacion 
     */
    const llenarDatosBeneficiario = (id, nombre, apellidoPaterno, apellidoMaterno, curp, genero, fechaNacimientoReal, edad, estudios, estadoCivil, identificacion) => {
        /**
         * se guarda al ejecutar esta función
         */
        console.log("funcion llenar datos", id, nombre,
            apellidoPaterno,
            apellidoMaterno,
            curp,
            genero,
            fechaNacimientoReal,
            edad,
            estudios,
            estadoCivil,
            identificacion);

        console.log("ID DEL BENEFICIARIO", id);
        if (id == undefined) {
            let datosEnviar = {
                dsnombre: nombre,
                dsapellido1: apellidoPaterno,
                dsapellido2: apellidoMaterno,
                dscurp: curp,
                fcfechanacimiento: fechaNacimientoReal,
                idgenero: genero,
                //edad,
                idestadocivil: estadoCivil,
                idgradoestudios: estudios,
                ididentificacionoficial: identificacion
            }
            console.log("datos enviados ---> ", datosEnviar);
            /**
             * al llegar aqui se inicia el guardado en la BD
             */
            registrarBeneficiario(datosEnviar);
        } else {
            console.log("Aun tenemos el beneficiario id", id)
            let datosEnviar = {
                id: id,
                dsnombre: nombre,
                dsapellido1: apellidoPaterno,
                dsapellido2: apellidoMaterno,
                dscurp: curp,
                fcfechanacimiento: fechaNacimientoReal,
                idgenero: genero,
                //edad,
                idestadocivil: estadoCivil,
                idgradoestudios: estudios,
                ididentificacionoficial: identificacion
            }
            /**
             * si se hace algun edición se guarda aquí
             */
            actualizarBeneficiario(datosEnviar);
        }
    }



    const obtenerDireccion = direccionBeneficiario => {
        console.log("datos a GUARDAR de la direccion BENEFICIARIO", direccionBeneficiario);
        if (direccionBeneficiario.id !== undefined) {
            console.log("TRAE ID");
            actualizarDireccionBeneficiario(direccionBeneficiario);
        } else {
            console.log("NUEVA DIRECCION");
            registrarDireccionBeneficiario(direccionBeneficiario);
        }
        console.log("datos que devuelve el guardar direccion primera parte---> ", direccion);
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        setLoading(true);
        if (activeStep == 0) {
            console.log("curp----->", curp);
            /**
             * consulta para traer el id y datos del beneficiario
             */

            getBeneficiario(curp).then(response => {
                setLoading(false);
            }).catch(err => {
                setLoading(true);
            });

        }
        if (activeStep == 1) {
            console.log("PROGRAMA NUEVO ====>", identPrograma);
            child.current.registroBeneficiario();
            /**
             * hacemos una consulta para obtener el domicilio del beneficiario, si es que tiene datos
             */
            console.log("BENEFICIARIO ID DIRECCION ====>", beneficiario.id);
           // obtenerDireccionBeneficiario(beneficiario.id);
        }
        if (activeStep == 2) {
            console.log("ACtive STEP 2", beneficiario)
          //  direccionChild.current.registroDireccion(beneficiario);
        }
        if (activeStep == 3) {
            console.log("DIRECCION para el paso 3 de contacto --->", direccion);
           // contacto.current.registroContacto();
        }
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
        console.log("BENEFICIARIO --->", beneficiario);
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

        <ValidarPrograma idPrograma={query.state?.mobNo}>
            < Box sx={{ width: '100%' }
            }>
                <Stepper activeStep={activeStep}>
                    {pasos.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {
                    activeStep === pasos.length ? (
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
                                    <RegistroDatosSolicitante
                                        curpR={curp}
                                        llenarDatosBeneficiario={llenarDatosBeneficiario}
                                        ref={child}
                                        beneficiario={beneficiario}
                                        setIdentPrograma={setIdentPrograma}
                                        idPrograma={query.state?.mobNo} />
                                    : activeStep === 2 ?
                                        <RegistroDireccion beneficiario={beneficiario} obtenerDireccion={obtenerDireccion} ref={direccionChild} direccionBeneficiario={direccion} />
                                        : activeStep === 3 ?
                                            <RegistroSolicitudContacto direccionB={direccion} beneficiario={beneficiario} ref={contacto} />
                                            : activeStep === 4 ?
                                                <RegistroCargaDocumentos beneficiario={beneficiario} idPrograma={query.state?.mobNo} identPrograma={identPrograma} />
                                                : activeStep === 5 ?
                                                    <RegistroIngresos idPrograma={query.state?.mobNo} />
                                                    : activeStep === 6 ?
                                                        <RegistroCaracteristicasAdicionales idPrograma={query.state?.mobNo} />
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
                    )
                }
                <Loading
                    loading={loading}
                />
            </Box >
        </ValidarPrograma >
    )
}