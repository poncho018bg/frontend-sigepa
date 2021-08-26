import React, { createContext, useReducer } from 'react';
import TiposApoyosReducer from 'reducers/Catalogos/TiposApoyosReducer';

import { GET_TIPOS_APOYOS, REGISTRAR_TIPOS_APOYOS, ELIMINAR_TIPOS_APOYOS, MODIFICAR_TIPOS_APOYOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

import UserService from 'servicios/UserService';

export const TiposApoyosContext = createContext();

export const TiposApoyosContextProvider = props => {
    const initialState = {
        tiposApoyosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(TiposApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getTiposApoyos = async () => {
        try {
            const result = await axiosGet('tiposApoyos');
            console.log(result._embedded);
            console.log(result._embedded.tiposApoyos);
            dispatch({
                type: GET_TIPOS_APOYOS,
                payload: result._embedded.tiposApoyos
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {tiposApoyos} tiposApoyos 
     */
    const registrarTiposApoyos = async tiposApoyos => {
        try {
            console.log(tiposApoyos);
            const resultado = await axiosPost('tiposApoyos', tiposApoyos);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_TIPOS_APOYOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {tiposApoyos} tiposApoyos 
     */
    const actualizarTiposApoyos = async tiposApoyos => {
        const { id, dstipoapoyo, boactivo, _links: { ct_TiposApoyos: { href } } } = tiposApoyos;

        let tiposApoyosEnviar = {
            dstipoapoyo,
            boactivo
        };

        console.log(tiposApoyosEnviar);
        try {
            const result = await axiosPostHetoas(href, tiposApoyos, 'PUT');
            dispatch({
                type: MODIFICAR_TIPOS_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTiposApoyos = async idTiposApoyos => {
        try {
            await axiosDeleteTipo(`/tiposApoyos/${idTiposApoyos}`);
            dispatch({
                type: ELIMINAR_TIPOS_APOYOS,
                payload: idTiposApoyos,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TiposApoyosContext.Provider
            value={{
                tiposApoyosList: state.tiposApoyosList,
                getTiposApoyos,
                registrarTiposApoyos,
                actualizarTiposApoyos,
                eliminarTiposApoyos
            }}
        >
            {props.children}
        </TiposApoyosContext.Provider>
    )
}