import React, { createContext, useReducer } from 'react';
import expedienteReducer from '../reducers/expedienteReducer.js';
import axios from "axios";
import { GET_EXPEDIENTE_PARAMETROS, ACTUALIZAR_EXPEDIENTE } from '../types/actionTypes';

import { axiosPost, axiosPut } from 'helpers/axiosPublico';
const UserService = sessionStorage.getItem('token')

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const ExpedienteContext = createContext();

export const ExpedienteContextProvider = props => {
    const initialState = {
        expedienteList: [],
        beneficiariosList: [],
    }

    const [state, dispatch] = useReducer(expedienteReducer, initialState);

    const getExpedienteParametros = async parametros => {
        try {
            const url = `${baseUrlPublico}expedienteOverride/consultarExpediente/${parametros.nombre}/${parametros.apellidoPaterno}/${parametros.apellidoMaterno}/${parametros.curp}`;
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json', Authorization: 'Bearer ' + UserService }
                }).then(response => {
                    console.log('Expediente Response=>', response.data)
                    resolve(response);
                    dispatch({
                        type: GET_EXPEDIENTE_PARAMETROS,
                        payload: response.data
                    })
                }).catch(error => {
                    console.log("Error ", error)
                    if (error.response) {
                        console.log("--------------------------------------------------")
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("ERROR DATA", error.response.data);
                        console.log("ERROR STATUS", error.response.status);
                        console.log("ERROR HEADERS", error.response.headers);
                    } else if (error.request) {
                        console.log("*************************")

                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log("ERROR REQUEST", error.request);
                    } else {
                        console.log("++++++++++++++++++++++++")
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error MESSAGE ', error.message);
                    }
                    console.log(error.config);
                });
            });
        } catch (error) {
            console.log('Err', error);
        }
    }

    const actualizarExpediente = async expediente => {
        try {
            console.log(direccion);
            const resultado = await axiosPut('expediente', expediente);
            console.log("resultado --->", resultado);
            dispatch({
                type: ACTUALIZAR_EXPEDIENTE,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ExpedienteContext.Provider
            value={{
                beneficiariosList: state.beneficiariosList,
                expedienteList: state.expedienteList,
                solicitudParametrosExpediente: state.solicitudParametrosExpediente,
                getExpedienteParametros,
                actualizarExpediente
            }}
        >
            {props.children}
        </ExpedienteContext.Provider>
    )
}