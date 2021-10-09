import React, { createContext, useReducer } from 'react';
import NumeroApoyosReducer from 'reducers/Catalogos/NumeroApoyosReducer';

import {
    GET_NUMERO_APOYOS, REGISTRAR_NUMERO_APOYOS, MODIFICAR_NUMERO_APOYOS, ELIMINAR_NUMERO_APOYOS,
    AGREGAR_NUMERO_APOYOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';


export const NumeroApoyosContext = createContext();

export const NumeroApoyosContextProvider = props => {
    const initialState = {
        numeroApoyosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(NumeroApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getNumeroApoyos = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`numeroApoyos?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.numeroApoyos);
            dispatch({
                type: GET_NUMERO_APOYOS,
                payload: result
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
            dispatch({
                type: AGREGAR_MUNICIPIOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {numeroApoyos} numeroApoyos 
     */
    const actualizarNumeroApoyos = async numeroApoyos => {
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

        const { activo, _links: { ct_NumeroApoyos: { href } } } = idNumeroApoyos
        const act = !activo
        idNumeroApoyos.activo = act
        try {
            const result = await axiosPostHetoas(href, idNumeroApoyos, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_NUMERO_APOYOS,
                payload: result,
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
            getNumeroApoyos();
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
        <NumeroApoyosContext.Provider
            value={{
                numeroApoyosList: state.numeroApoyosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getNumeroApoyos,
                registrarNumeroApoyos,
                actualizarNumeroApoyos,
                eliminarNumeroApoyos,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </NumeroApoyosContext.Provider>
    )
}