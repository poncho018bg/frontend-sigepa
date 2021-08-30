import React, { createContext, useReducer } from 'react';
import MotivoRechazosReducer from 'reducers/Catalogos/MotivoRechazosReducer';

import { GET_MOTIVO_RECHAZOS, REGISTRAR_MOTIVO_RECHAZOS, MODIFICAR_MOTIVO_RECHAZOS, ELIMINAR_MOTIVO_RECHAZOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

import UserService from 'servicios/UserService';

export const MotivoRechazosContext = createContext();

export const MotivoRechazosContextProvider = props => {
    const initialState = {
        motivoRechazosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(MotivoRechazosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getMotivoRechazos = async () => {
        try {
            const result = await axiosGet('motivoRechazos');
            console.log(result._embedded);
            console.log(result._embedded.motivoRechazos);
            dispatch({
                type: GET_MOTIVO_RECHAZOS,
                payload: result._embedded.motivoRechazos
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrarMotivoRechazos = async motivoRechazos => {
        try {
            console.log(motivoRechazos);
            const resultado = await axiosPost('motivoRechazos', motivoRechazos);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_MOTIVO_RECHAZOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizarMotivoRechazos= async motivoRechazos => {
        const { id, dsmotivorechazo, boactivo, _links: { ct_MotivoRechazos: { href } } } = motivoRechazos;

        let motivoRechazosEnviar = {
            dsmotivorechazo,
            boactivo
        };

        console.log(motivoRechazosEnviar);
        try {
            const result = await axiosPostHetoas(href, motivoRechazos, 'PUT');
            dispatch({
                type: MODIFICAR_MOTIVO_RECHAZOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarMotivoRechazos = async idMotivoRechazos => {
        try {
            await axiosDeleteTipo(`/motivoRechazos/${idMotivoRechazos}`);
            dispatch({
                type: ELIMINAR_MOTIVO_RECHAZOS,
                payload: idMotivoRechazos,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MotivoRechazosContext.Provider
            value={{
                motivoRechazosList: state.motivoRechazosList,
                getMotivoRechazos,
                registrarMotivoRechazos,
                actualizarMotivoRechazos,
                eliminarMotivoRechazos
            }}
        >
            {props.children}
        </MotivoRechazosContext.Provider>
    )
}