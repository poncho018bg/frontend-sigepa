import React, { createContext, useReducer } from 'react';
import ModuloReducer from '../reducers/ModuloReducer';

import {
    GET_MODULOS, REGISTRAR_MODULO, ELIMINAR_MODULO, MODIFICAR_MODULO,
    AGREGAR_MODULO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from '../types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import UserService from 'servicios/UserService';


export const ModuloContext = createContext();

export const ModuloContextProvider = props => {

    const initialState = {
        moduloList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(ModuloReducer, initialState);

    const getModulos = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`modulos?page=${page}&size=${size}`);
            console.log(resultado._embedded.modulos);
            dispatch({
                type: GET_MODULOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarModulos = async modulo => {
        try {
            console.log(modulo);
            const resultado = await axiosPost('modulos', modulo);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_MODULO,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_MODULO_ERROR,
                payload: true
            })
        }
    }

    const actualizarModulo = async modulo => {

        const { dsmodulo, boactivo, _links: { modulos: { href } } } = modulo;

        let moduloEnviar = {
            dsmodulo,
            'usuarioCreacionId': `${process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`,
            boactivo,
            'SubModulos': []
        }
        console.log(moduloEnviar);
        try {
            const resultado = await axiosPostHetoas(href, moduloEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_MODULO,
                payload: resultado,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarModulo = async idModulo => {
        try {
            await axiosDeleteTipo(`modulos/${idModulo}`);
            dispatch({
                type: ELIMINAR_MODULO,
                payload: idModulo
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
            getModulos();
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
        <ModuloContext.Provider
            value={{
                moduloList: state.moduloList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getModulos,
                registrarModulos,
                actualizarModulo,
                eliminarModulo,
                changePageNumber,
                changePageSize,
                changePage

            }}
        >
            {props.children}
        </ModuloContext.Provider>
    )

}