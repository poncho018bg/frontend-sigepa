import React, { createContext, useReducer } from 'react';
import RegistroSolicitudReducer from 'reducers/RegistroSolicitudReducer';

import {
    GET_GENEROS,
    GET_GRADO_ESTUDIOS,
    GET_ESTADO_CIVIL,
    GET_IDENTIFICACIONES_OFICIALES,
    REGISTRAR_BENEFICIARIO,
    REGISTRAR_DIRECCION_BENEFICIARIO,
    GET_BENEFICIARIO,
    ACTUALIZAR_BENEFICIARIO,
    OBTENER_DIRECCION
} from 'types/actionTypes';

import { axiosGet, axiosPost,  axiosPut } from 'helpers/axiosPublico';

export const RegistroSolicitudContext = createContext();

export const RegistroSolicitudContextProvider = props => {
    const initialState = {
        generosList: [],
        estudiosList: [],
        estadoCivilList: [],
        identificacionesList: [],
        beneficiario: [],
        direccion: []
    }


    const [state, dispatch] = useReducer(RegistroSolicitudReducer, initialState);

    const getGeneros = async () => {
        try {
           
            const result = await axiosGet(`generos`);
            console.log("RESULT GENEROS -->", result);
            dispatch({
                type: GET_GENEROS,
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }
    const getEstudios = async () => {
        try {
           
            const result = await axiosGet(`gradoEstudios`);
            console.log("RESULT Estudios -->", result);
            dispatch({
                type: GET_GRADO_ESTUDIOS,
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getEstadoCivil = async () => {
        try {
           
            const result = await axiosGet(`estadosCiviles`);
            console.log("RESULT Estudios -->", result);
            dispatch({
                type: GET_ESTADO_CIVIL,
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getIdentificaciones = async () => {
        try {
            
            const result = await axiosGet(`identificacionesOficiales`);
            console.log("RESULT Estudios -->", result);
            dispatch({
                type: GET_IDENTIFICACIONES_OFICIALES,
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }

    const registrarBeneficiario = async beneficiario => {
        try {
            console.log(beneficiario);
            const resultado = await axiosPost('beneficiarioOverride', beneficiario);
            console.log("resultado --->", resultado);
            dispatch({
                type: REGISTRAR_BENEFICIARIO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const registrarDireccionBeneficiario = async direccion => {
        try {
            console.log(direccion);
            const resultado = await axiosPost('domicilioOverride', direccion);
            console.log("resultado --->", resultado);
            dispatch({
                type: REGISTRAR_DIRECCION_BENEFICIARIO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarDireccionBeneficiario = async direccion => {
        try {
            console.log(direccion);
            const resultado = await axiosPut('domicilioOverride', direccion);
            console.log("resultado --->", resultado);
            dispatch({
                type: REGISTRAR_DIRECCION_BENEFICIARIO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getBeneficiario = async curp => {
        try {
            const resultado = await axiosGet(`beneficiarioOverride/curp/${curp}`);
            console.log("resultado de la consulta ===>", resultado);
            dispatch({
                type: GET_BENEFICIARIO,
                payload: resultado
            }
            );
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualiza el beneficiario siempre que ya existe el registro.
     * @param {beneficiario} beneficiario 
     */
    const actualizarBeneficiario = async beneficiario => {
        try {
            console.log(beneficiario);
            const resultado = await axiosPut('beneficiarioOverride', beneficiario);
            console.log("resultado --->", resultado);
            dispatch({
                type: ACTUALIZAR_BENEFICIARIO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerDireccionBeneficiario = async idBeneficiario => {
        try {
            console.log("LLEGA EL ID DEL BENEFICIARIO DIRECCION ====>",idBeneficiario);
            const resultado = await axiosGet(`domicilioOverride/domicilio/${idBeneficiario}`);
            console.log("resultado CONSULTA DE DIRECCION--->", resultado);
            dispatch({
                type: OBTENER_DIRECCION,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <RegistroSolicitudContext.Provider value={{
            generosList: state.generosList,
            estudiosList: state.estudiosList,
            estadoCivilList: state.estadoCivilList,
            identificacionesList: state.identificacionesList,
            beneficiario: state.beneficiario,
            direccion: state.direccion,
            getGeneros,
            getEstudios,
            getEstadoCivil,
            getIdentificaciones,
            registrarBeneficiario,
            registrarDireccionBeneficiario,
            actualizarDireccionBeneficiario,
            getBeneficiario,
            actualizarBeneficiario,
            obtenerDireccionBeneficiario
        }}>
            {props.children}
        </RegistroSolicitudContext.Provider>
    )
}