import React, { useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { RegistroDatosSolicitante } from './RegistroDatosSolicitante';
import { RegistroDireccion } from './RegistroDireccion';
import { RegistroSolicitudContacto } from './RegistroSolicitudContacto';
import { RegistroCargaDocumentos } from './RegistroCargaDocumentos';
import { RegistroFinalizado } from './RegistroFinalizado';
import { RegistroPreguntas } from './RegistroPreguntas';

import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { OrigenSolicitudContext } from 'contexts/catalogos/OrigenSolicitudContext';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

import Button from "components/CustomButtons/Button.js";


import ValidarPrograma from '../RegistroSolicitudContacto/ValidarPrograma';
import ValidarEdadBeneficiario from '../RegistroSolicitudContacto/ValidarEdadBeneficiario';
import ValidarProgramaMonetario from '../RegistroSolicitudContacto/ValidarProgramaMonetario';
import ValidarBeneficiarioGuardado from '../RegistroSolicitudContacto/ValidarBeneficiarioGuardado';
import ValidarProgramaTipoApoyo from './ValidarProgramaTipoApoyo';

import ValidarVigenciaPrograma from '../RegistroSolicitudContacto/ValidarVigenciaPrograma';

//
import { RegistroCurp } from './RegistroCurp';


const useStyles = makeStyles(stylesArchivo);

const pasos = [
    'CURP',
    'Datos del solicitante',
    'Dirección',
    'Registro de contacto',
    'Carga de documentos',
    'Características adicionales de la solicitante',
    'Registro finalizado'
];
const ORIGEN_SOLICITUD_AGENTE_MODULO = 'Registro por URL'

export const RegistroProgramas = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const parametroPrograma = queryParams.get('programa');
    console.log("QUERY ====>", parametroPrograma);
    //deconsole.log("LINK ANTERIOR ===========>", window.history.back());
    //id del programa
    //let query = useLocation();
    //console.log("ID DEL PROGRAMA ====>", idPrograma);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [activar, setActivar] = useState();
    const [curp, setCurp] = useState();
    const [loading, setLoading] = useState(true);
    const { getProgramaByUrlParameter, idPrograma, programa, getByID } = useContext(ProgramasContext);
    const { beneficiario, registrarBeneficiario, direccion,
        registrarDireccionBeneficiario, getBeneficiario, actualizarBeneficiario,
        obtenerDireccionBeneficiario, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);

    const { getOrigenesByParametros, origenesList } = useContext(OrigenSolicitudContext);

    const [edadValida, setEdadValida] = useState();
    //
    const child = useRef();
    const direccionChild = useRef();
    const contacto = useRef();
    const [validarDocs, setValidarDocs] = useState([]);
    const [identPrograma, setIdentPrograma] = useState();
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
     * @param {idIdentificaion} idIdentificaion
     */

    useEffect(() => {
        getProgramaByUrlParameter(parametroPrograma);
    }, [parametroPrograma]);

    useEffect(() => {
        getByID(idPrograma);
    }, [idPrograma])
    const llenarDatosBeneficiario = (id, nombre, apellidoPaterno, apellidoMaterno, curp, genero, fechaNacimientoReal, edad, estudios, estadoCivil, identificacion, rfc, idIdentificaion) => {
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
            identificacion,
            rfc, idIdentificaion);

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
                ididentificacionoficial: identificacion,
                rfc: rfc,
                dsiddocumento: idIdentificaion
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
                ididentificacionoficial: identificacion,
                rfc: rfc,
                dsiddocumento: idIdentificaion
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
            getBeneficiario(curp)
        }
        if (activeStep == 1) {
            child.current.registroBeneficiario();
            /**
             * hacemos una consulta para obtener el domicilio del beneficiario, si es que tiene datos
             */
            console.log("BENEFICIARIO ID DIRECCION ====>", beneficiario.id);
            if (beneficiario.id !== undefined) {
                obtenerDireccionBeneficiario(beneficiario?.id);
            }
        }
        if (activeStep == 2) {
            console.log("ACtive STEP 2", beneficiario)
            direccionChild.current.registroDireccion(beneficiario);
        }
        if (activeStep == 3) {
            console.log("DIRECCION para el paso 3 de contacto --->", direccion);
            contacto.current.registroContacto();
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        console.log('5 validarDocs=>', validarDocs)
        console.log('5 activeStep=>', activeStep)
        if (activeStep === 3) {
            /*
            let valdcs = true
            validarDocs.map(e => { if (!e.validarCarga) { valdcs = e.validarCarga } })
            console.log('validarDocs=>',validarDocs)
            console.log('valdcs=>',valdcs)
            setActivar(valdcs)
            */
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        getBeneficiario(curp)
        if (beneficiario.id !== undefined) {
            obtenerDireccionBeneficiario(beneficiario?.id);
        }
    };

    useEffect(() => {
        getOrigenesByParametros(ORIGEN_SOLICITUD_AGENTE_MODULO);
    }, []);



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

    //console.log("Programa ========>", programa);
    if (programa !== null) {
        return (

            <ValidarPrograma idPrograma={idPrograma}>
                <ValidarVigenciaPrograma idPrograma={idPrograma} setActivar={setActivar} origen={ORIGEN_SOLICITUD_AGENTE_MODULO}>
                    <ValidarEdadBeneficiario idPrograma={idPrograma} curp={curp} edadValida={edadValida}>
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
                                            <ValidarProgramaTipoApoyo programa={programa} setActivar={setActivar}>
                                                <RegistroCurp setActivar={setActivar} curp={curp} setCurp={setCurp}
                                                    nombrePrograma={programa.dsprograma} />
                                            </ValidarProgramaTipoApoyo>
                                            : activeStep === 1 ?
                                                <ValidarProgramaMonetario curp={curp} edadValida={edadValida} idPrograma={idPrograma} setActivar={setActivar}
                                                    origen={ORIGEN_SOLICITUD_AGENTE_MODULO}>
                                                    <RegistroDatosSolicitante
                                                        curpR={curp}
                                                        llenarDatosBeneficiario={llenarDatosBeneficiario}
                                                        ref={child}
                                                        beneficiario={beneficiario}
                                                        setIdentPrograma={setIdentPrograma}
                                                        idPrograma={idPrograma}
                                                        setEdadValida={setEdadValida}
                                                        nombrePrograma={programa.dsprograma}
                                                        activar={activar}
                                                        setActivar={setActivar} />
                                                </ValidarProgramaMonetario>
                                                : activeStep === 2 ?
                                                    <ValidarBeneficiarioGuardado beneficiario={beneficiario} setActivar={setActivar}>
                                                        <RegistroDireccion
                                                            activar={activar}
                                                            setActivar={setActivar}
                                                            beneficiario={beneficiario}
                                                            obtenerDireccion={obtenerDireccion}
                                                            ref={direccionChild}
                                                            direccionBeneficiario={direccion}
                                                            nombrePrograma={programa.dsprograma} 
                                                            idPrograma={idPrograma}/>
                                                    </ValidarBeneficiarioGuardado>
                                                    : activeStep === 3 ?
                                                        <RegistroSolicitudContacto
                                                            activar={activar}
                                                            setActivar={setActivar}
                                                            direccionB={direccion}
                                                            beneficiario={beneficiario}
                                                            ref={contacto}
                                                            nombrePrograma={programa.dsprograma} />
                                                        : activeStep === 4 ?
                                                            <RegistroCargaDocumentos
                                                                beneficiario={beneficiario}
                                                                idPrograma={idPrograma}
                                                                identPrograma={identPrograma}
                                                                setValidarDocs={setValidarDocs}
                                                                validarDocs={validarDocs}
                                                                setActivar={setActivar}
                                                                activar={activar}
                                                                nombrePrograma={programa.dsprograma} />
                                                            : activeStep === 5 ?
                                                                <RegistroPreguntas
                                                                    beneficiario={beneficiario}
                                                                    idPrograma={idPrograma}
                                                                    setActivar={setActivar}
                                                                    nombrePrograma={programa.dsprograma} />
                                                                :
                                                                <RegistroFinalizado
                                                                    beneficiario={beneficiario}
                                                                    idPrograma={idPrograma}
                                                                    nombrePrograma={programa.dsprograma}
                                                                    origen={origenesList[0]} />}
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
                                            <NextButton />
                                        </Box>
                                    </>
                                )
                            }
                        </Box>
                    </ValidarEdadBeneficiario>
                </ValidarVigenciaPrograma>
            </ValidarPrograma >
        )
    } else {
        return (<>Iniciando</>)
    }
}
