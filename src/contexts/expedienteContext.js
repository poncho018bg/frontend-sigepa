import React, { createContext, useReducer } from 'react';
import expedienteReducer from '../reducers/expedienteReducer.js';
import axios from "axios";
import { GET_EXPEDIENTE_PARAMETROS, ACTUALIZAR_EXPEDIENTE } from '../types/actionTypes';

import { axiosPost, axiosPut } from 'helpers/axiosPublico';

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const ExpedienteContext = createContext();

export const ExpedienteContextProvider = props => {
    const initialState = {
        expedienteList: []
    }

    const [state, dispatch] = useReducer(expedienteReducer, initialState);

    const getExpedienteParametros = async parametros => {

        try {
            const url = `${baseUrlPublico}ExpedienteOverride/consultarExpediente/${parametros.nombre}/${parametros.curp}`;
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    console.log('RESPONSE=>', response.data)
                    resolve(response);
                    dispatch({
                        type: GET_EXPEDIENTE_PARAMETROS,
                        payload: response.data
                    })
                }).catch(error => {
                    console.log('Err', error);
                    reject(error);
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