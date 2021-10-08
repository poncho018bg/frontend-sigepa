import React, { createContext, useReducer } from 'react';
import RegistroSolicitudReducer from 'reducers/RegistroSolicitudReducer';

import {
    GET_GENEROS,
    GET_GRADO_ESTUDIOS,
    GET_ESTADO_CIVIL,
    GET_IDENTIFICACIONES_OFICIALES,
    REGISTRAR_BENEFICIARIO
} from 'types/actionTypes';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axiosPublico';

export const RegistroSolicitudContext = createContext();

export const RegistroSolicitudContextProvider = props => {
    const initialState = {
        generosList: [],
        estudiosList: [],
        estadoCivilList: [],
        identificacionesList: [],
        beneficiario: [],
    }


    const [state, dispatch] = useReducer(RegistroSolicitudReducer, initialState);

    const getGeneros = async () => {
        try {
            const { page, size } = state;
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
            const { page, size } = state;
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
            const { page, size } = state;
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
            const { page, size } = state;
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

    const registrarBeneficiario = async beneficiario =>{
        try{
            console.log(beneficiario);
            const resultado = await axiosPost('beneficiarioOverride', beneficiario);
            console.log("resultado --->", resultado);
            dispatch({
                type: REGISTRAR_BENEFICIARIO,
                payload: resultado
            });
        }catch (error) {
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
            getGeneros,
            getEstudios,
            getEstadoCivil,
            getIdentificaciones,
            registrarBeneficiario
        }}>
            {props.children}
        </RegistroSolicitudContext.Provider>
    )
}