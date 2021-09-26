import React, { createContext, useReducer } from 'react';
import MotivoRechazosReducer from 'reducers/Catalogos/MotivoRechazosReducer';

import {
    GET_MOTIVO_RECHAZOS, REGISTRAR_MOTIVO_RECHAZOS, MODIFICAR_MOTIVO_RECHAZOS, ELIMINAR_MOTIVO_RECHAZOS,
    AGREGAR_MOTIVO_RECHAZOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const MotivoRechazosContext = createContext();

export const MotivoRechazosContextProvider = props => {
    const initialState = {
        motivoRechazosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(MotivoRechazosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getMotivoRechazos = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`motivoRechazos?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.motivoRechazos);
            dispatch({
                type: GET_MOTIVO_RECHAZOS,
                payload: result
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
            dispatch({
                type: AGREGAR_MOTIVO_RECHAZOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizarMotivoRechazos = async motivoRechazos => {
        const { dsmotivorechazo, boactivo, _links: { ct_MotivoRechazos: { href } } } = motivoRechazos;

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
            await axiosDeleteTipo(`motivoRechazos/${idMotivoRechazos}`);
            dispatch({
                type: ELIMINAR_MOTIVO_RECHAZOS,
                payload: idMotivoRechazos,
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Paginacion
    const changePage = async (page) => {
        console.log(page);

        dispatch(changePageNumber(page))
        try {
            getMotivoRechazos();
        } catch (error) {
            throw error;
        }

    }

    const changePageNumber = (page) => ({
        type: CAMBIAR_PAGINA,
        payload: page
    })

    const changePageSize = (size) => ({
        type: CAMBIAR_TAMANIO_PAGINA,
        payload: size
    })

    return (
        <MotivoRechazosContext.Provider
            value={{
                motivoRechazosList: state.motivoRechazosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getMotivoRechazos,
                registrarMotivoRechazos,
                actualizarMotivoRechazos,
                eliminarMotivoRechazos,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </MotivoRechazosContext.Provider>
    )
}