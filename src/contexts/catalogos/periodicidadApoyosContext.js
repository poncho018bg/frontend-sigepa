import React, { createContext, useReducer } from 'react';
import PeriodicidadApoyosReducer from 'reducers/Catalogos/PeriodicidadApoyosReducer';

import {
    GET_PERIODICIDAD_APOYOS, REGISTRAR_PERIODICIDAD_APOYOS, MODIFICAR_PERIODICIDAD_APOYOS, ELIMINAR_PERIODICIDAD_APOYOS,
    AGREGAR_PERIODICIDAD_APOYOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';


export const PeriodicidadApoyosContext = createContext();

export const PeriodicidadApoyosContextProvider = props => {
    const initialState = {
        periodicidadApoyosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(PeriodicidadApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getPeriodicidadApoyos = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`periodicidadApoyos?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.periodicidadApoyos);
            dispatch({
                type: GET_PERIODICIDAD_APOYOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {periodicidadApoyos} periodicidadApoyos 
     */
    const registrarPeriodicidadApoyos = async periodicidadApoyos => {
        try {
            console.log(periodicidadApoyos);
            const resultado = await axiosPost('periodicidadApoyos', periodicidadApoyos);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_PERIODICIDAD_APOYOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_PERIODICIDAD_APOYOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {periodicidadApoyos} periodicidadApoyos 
     */
    const actualizarPeriodicidadApoyos = async periodicidadApoyos => {
        const { dsperiodicidad, boactivo, _links: { ct_PeriodicidadApoyos: { href } } } = periodicidadApoyos;

        let periodicidadApoyosEnviar = {
            dsperiodicidad,
            boactivo
        };

        console.log(periodicidadApoyosEnviar);
        try {
            const result = await axiosPostHetoas(href, periodicidadApoyos, 'PUT');
            dispatch({
                type: MODIFICAR_PERIODICIDAD_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarPeriodicidadApoyos = async idPeriodicidadApoyos => {

        const {activo, _links: { ct_PeriodicidadApoyos: { href } } } = idPeriodicidadApoyos;
        const act = !activo;
        idPeriodicidadApoyos.activo = act
        try {
            const result = await axiosPostHetoas(href, idPeriodicidadApoyos, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_PERIODICIDAD_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Paginacion
    const changePage = async (pages) => {  
        try {
            dispatch(changePageNumber(pages))
        } catch (error) {            
            throw error;
        }
    }

    const changePageSizes = async (sizes) => {
        try {
            dispatch(changePageSize(sizes))        
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
        <PeriodicidadApoyosContext.Provider
            value={{
                periodicidadApoyosList: state.periodicidadApoyosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getPeriodicidadApoyos,
                registrarPeriodicidadApoyos,
                actualizarPeriodicidadApoyos,
                eliminarPeriodicidadApoyos,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage
            }}
        >
            {props.children}
        </PeriodicidadApoyosContext.Provider>
    )
}