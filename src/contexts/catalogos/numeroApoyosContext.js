import React, { createContext, useReducer } from 'react';
import NumeroApoyosReducer from 'reducers/Catalogos/NumeroApoyosReducer';

import { GET_NUMERO_APOYOS, REGISTRAR_NUMERO_APOYOS, MODIFICAR_NUMERO_APOYOS, ELIMINAR_NUMERO_APOYOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';


export const NumeroApoyosContext = createContext();

export const NumeroApoyosContextProvider = props => {
    const initialState = {
        numeroApoyosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(NumeroApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getNumeroApoyos = async () => {
        try {
            const result = await axiosGet('numeroApoyos');
            console.log(result._embedded);
            console.log(result._embedded.numeroApoyos);
            dispatch({
                type: GET_NUMERO_APOYOS,
                payload: result._embedded.numeroApoyos
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {numeroApoyos} numeroApoyos 
     */
    const registrarNumeroApoyos = async numeroApoyos => {
        try {
            console.log(numeroApoyos);
            const resultado = await axiosPost('numeroApoyos', numeroApoyos);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_NUMERO_APOYOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {numeroApoyos} numeroApoyos 
     */
    const actualizarNumeroApoyos= async numeroApoyos => {
        const { noapoyo, boactivo, _links: { ct_NumeroApoyos: { href } } } = numeroApoyos;

        let numeroApoyosEnviar = {
            noapoyo,
            boactivo
        };

        console.log(numeroApoyosEnviar);
        try {
            const result = await axiosPostHetoas(href, numeroApoyos, 'PUT');
            dispatch({
                type: MODIFICAR_NUMERO_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarNumeroApoyos = async idNumeroApoyos => {
        try {
            await axiosDeleteTipo(`/numeroApoyos/${idNumeroApoyos}`);
            dispatch({
                type: ELIMINAR_NUMERO_APOYOS,
                payload: idNumeroApoyos,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NumeroApoyosContext.Provider
            value={{
                numeroApoyosList: state.numeroApoyosList,
                getNumeroApoyos,
                registrarNumeroApoyos,
                actualizarNumeroApoyos,
                eliminarNumeroApoyos
            }}
        >
            {props.children}
        </NumeroApoyosContext.Provider>
    )
}