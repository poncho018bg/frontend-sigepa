import React, { createContext, useReducer } from 'react';
import registroCargaDocumentosReducer from '../reducers/registroCargaDocumentosReducer';
import {
    GET_DOCUMENTOS_APOYO,
    GUARDAR_DATOS_BOVEDA,
    GET_EXISTE_DOCUMENTO
    
} from '../types/actionTypes';

import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axiosPublico';
import axios from "axios";
export const RegistroCargaDocumentosContext = createContext();

export const RegistroCargaDocumentosContextProvider = props => {
    const initialState = {
        documentosApoyoList: [],
        documentosBoveda: [],
        existedoc:false
    }

    const [state, dispatch] = useReducer(registroCargaDocumentosReducer, initialState);

    const getDocumentosApoyo = async (idApoyo,idBeneficiario) => {
        try {
            console.log("idApoyo ", idApoyo);
            const result = await axiosGet(`documentosprogramaapoyo/${idApoyo}/${idBeneficiario}`);
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

    const existeDocumento = async (documentos, beneficiario) => {
        const baseUrl = process.env.REACT_APP_API_PUBLICO_URL;
        let url = `${baseUrl}bovedaDocumentosOverride/existeDocumento?idDocumento=${documentos.idDocumentoRequisito}&idBeneficiario=${beneficiario.id}`

        return new Promise((resolve, reject) => {
            axios.get(`${url}`, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: GET_EXISTE_DOCUMENTO,
                    payload: response
                })
            }).catch(error => {
                reject(error);
            });
        });
    }
    return (
        <RegistroCargaDocumentosContext.Provider
            value={{
                documentosApoyoList: state.documentosApoyoList,
                documentosBoveda: state.documentosBoveda,
                existedoc:state.existedoc,
                getDocumentosApoyo,
                registrarDatosBoveda,
                existeDocumento
            }}
        >
            {props.children}
        </RegistroCargaDocumentosContext.Provider>
    )
}