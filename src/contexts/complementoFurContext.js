import React, { createContext, useReducer } from 'react';
import complementoFursReducer from '../reducers/complementoFursReducer';
import { GET_COMPLEMENTO_FURS, REGISTRAR_COMPLEMENTO_FURS, ACTUALIZAR_COMPLEMENTO_FURS } from '../types/actionTypes';
import axios from "axios";
import { axiosPost, axiosPut } from 'helpers/axiosPublico';

const UserService = sessionStorage.getItem('token')
const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const ComplementoFursContext = createContext();

export const ComplementoFursContextProvider = props => {
    const initialState = {
        complementoList: []
    }

    const [state, dispatch] = useReducer(complementoFursReducer, initialState);

    const getComplementoFurs = async (idPrograma, idBeneficiario) => {
        const url = `${baseUrlPublico}complementoFursOverride/consultarFurs/${idPrograma}/${idBeneficiario}`;
        try {
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json', Authorization: 'Bearer ' + UserService }
                }).then(response => {
                    console.log('complemento Response=> ++++++++++++++++++++++++++', response.data)
                    resolve(response);
                    dispatch({
                        type: GET_COMPLEMENTO_FURS,
                        payload: response.data
                    });
                }).catch(error => {
                    console.log("Error ", error)
                });
            });
        } catch (error) {
            console.log('Err', error);
        }
    }

    const registrarComplementoFurs = async complementoFurs => {
        try {
            console.log(complementoFurs);
            const resultado = await axiosPost('complementoFursOverride', complementoFurs);
            console.log("resultado --->", resultado);
            dispatch({
                type: REGISTRAR_COMPLEMENTO_FURS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarComplementoFurs = async complementoFurs => {
        try {
            console.log(direccion);
            const resultado = await axiosPut('complementoFursOverride', complementoFurs);
            console.log("resultado --->", resultado);
            dispatch({
                type: ACTUALIZAR_COMPLEMENTO_FURS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ComplementoFursContext.Provider
            value={{
                complementoList: state.complementoList,
                getComplementoFurs,
                registrarComplementoFurs,
                actualizarComplementoFurs
            }}
        >
            {props.children}
        </ComplementoFursContext.Provider>
    )
}