import React, { createContext, useReducer } from 'react';
import EstadosReducer from 'reducers/Catalogos/EstadosReducer';


import {
    GET_ESTADOS, REGISTRAR_ESTADOS, ELIMINAR_ESTADOS, MODIFICAR_ESTADOS, GET_ESTADO,
    AGREGAR_ESTADOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';
import { axiosGet, axiosPost,  axiosPostHetoas, axiosGetHetoas } from 'helpers/axios';





export const EstadosContext = createContext();

export const EstadosContextProvider = props => {

    const initialState = {
        estadosList: [],
        estado: null,
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(EstadosReducer, initialState);


    const getEstados = async () => {

        try {

            const { page, size } = state;
            const resultado = await axiosGet(`estados?page=${page}&size=${size}`);
            console.log(resultado._embedded.estados);
            dispatch({
                type: GET_ESTADOS,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    const getTodosEstados = async () => {

        try {

           
            const resultado = await axiosGet(`estados?page=0&size=50`);
            console.log(resultado._embedded.estados);
            dispatch({
                type: GET_ESTADOS,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    const getEstadoByIdHetoas = async endpoint => {

        try {
            const resultado = await axiosGetHetoas(endpoint);
            console.log(resultado);
            dispatch({
                type: GET_ESTADO,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }


    const registrarEstados = async estado => {
        try {
            console.log(estado);
            const resultado = await axiosPost('estados', estado);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_ESTADOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_ESTADOS_ERROR,
                payload: true
            })
        }
    }


    const actualizarEstados = async estado => {
        console.log(estado);
        const { noestado, dsestado, dsabreviatura, _links: { estados: { href } } } = estado;
        let estadosEnviar = {
            noestado,
            dsestado,
            dsabreviatura,
            municipiosCollection: []

        }
        try {
            const resultado = await axiosPostHetoas(href, estadosEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_ESTADOS,
                payload: resultado,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarEstados = async estado => {

        const { activo, _links: { estados: { href } } } = estado;
        const act = !activo
        estado.activo = act
        try {
            const resultado = await axiosPostHetoas(href, estado, 'PUT');
            dispatch({
                type: ELIMINAR_ESTADOS,
                payload: resultado,
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
            await  getEstados();
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
    const getEstadosAll = async () => {

        try {

            
            const resultado = await axiosGet(`estados?page=${0}&size=${50}`);
            console.log(resultado._embedded.estados);
            dispatch({
                type: GET_ESTADOS,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }




    return (
        <EstadosContext.Provider
            value={{
                estadosList: state.estadosList,
                estado: state.estado,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getEstados,
                getEstadoByIdHetoas,
                registrarEstados,
                eliminarEstados,
                actualizarEstados,
                changePageNumber,
                changePageSize,
                changePage,
                getEstadosAll,
                getTodosEstados

            }}
        >
            {props.children}
        </EstadosContext.Provider>
    )

}