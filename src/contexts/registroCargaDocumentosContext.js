import React, { createContext, useReducer } from 'react';
import registroCargaDocumentosReducer from '../reducers/registroCargaDocumentosReducer';
import {
    GET_DOCUMENTOS_APOYO,
    GUARDAR_DATOS_BOVEDA
} from '../types/actionTypes';

import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axiosPublico';

export const RegistroCargaDocumentosContext = createContext();

export const RegistroCargaDocumentosContextProvider = props => {
    const initialState = {
        documentosApoyoList: [],
        documentosBoveda: []
    }

    const [state, dispatch] = useReducer(registroCargaDocumentosReducer, initialState);

    const getDocumentosApoyo = async idApoyo => {
        try {
            console.log("idApoyo ", idApoyo);
            const result = await axiosGet(`documentosprogramaapoyo/${idApoyo}`);
            console.log(result);
            dispatch({
                type: GET_DOCUMENTOS_APOYO,
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }

    const registrarDatosBoveda = async datos => {
        try {
            console.log("datos a guardar ---->", datos)
            const result = await axiosPost('bovedaDocumentosOverride', datos);
            console.log("resultado de los datos boveda ====> ",result);
            dispatch({
                type: GUARDAR_DATOS_BOVEDA,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <RegistroCargaDocumentosContext.Provider
            value={{
                documentosApoyoList: state.documentosApoyoList,
                documentosBoveda: state.documentosBoveda,
                getDocumentosApoyo,
                registrarDatosBoveda
            }}
        >
            {props.children}
        </RegistroCargaDocumentosContext.Provider>
    )
}