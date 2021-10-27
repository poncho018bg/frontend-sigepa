import React, { createContext, useReducer } from 'react';
import registroCargaDocumentosReducer from '../reducers/registroCargaDocumentosReducer';
import { GET_DOCUMENTOS_APOYO } from '../types/actionTypes';

import { axiosGet } from 'helpers/axios';

export const RegistroCargaDocumentosContext = createContext();

export const RegistroCargaDocumentosContextProvider = props => {
    const initialState = {
        documentosApoyoList: []
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
    return (
        <RegistroCargaDocumentosContext.Provider
            value={{
                documentosApoyoList: state.documentosApoyoList,
                getDocumentosApoyo
            }}
        >
            {props.children}
        </RegistroCargaDocumentosContext.Provider>
    )
}