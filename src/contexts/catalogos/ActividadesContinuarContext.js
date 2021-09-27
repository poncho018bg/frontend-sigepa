import React, { createContext, useReducer } from 'react';
import ActividadesContinuarReducer from 'reducers/Catalogos/ActividadesContinuarReducer';
import {
    GET_ACTIVIDADESCONTINUAR, REGISTRAR_ACTIVIDADESCONTINUAR, ELIMINAR_ACTIVIDADESCONTINUAR, MODIFICAR_ACTIVIDADESCONTINUAR,
    AGREGAR_ACTIVIDADESCONTINUAR_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';




export const ActividadesContinuarContext = createContext();

export const ActividadesContinuarContextProvider = props => {

    const initialState = {
        actividadescontinuarList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }


    const [state, dispatch] = useReducer(ActividadesContinuarReducer, initialState);

    const getActividadesContinuar = async () => {
        try {
            const { page, size } = state;
            const resultado = await axiosGet(`continuidadActividades?page=${page}&size=${size}`);
            console.log(resultado._embedded.continuidadActividades);
            dispatch({
                type: GET_ACTIVIDADESCONTINUAR,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    const registrarActividadesContinuar = async continuidadActividades => {
        try {
            console.log(continuidadActividades);
            const resultado = await axiosPost('continuidadActividades', continuidadActividades);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_ACTIVIDADESCONTINUAR,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_ACTIVIDADESCONTINUAR_ERROR,
                payload: true
            })
        }
    }


    const actualizarActividadesContinuar = async continuidadActividades => {

        console.log('Update=>', continuidadActividades);
        const { id, dsactividadcontinuidad, activo, _links: { continuidadActividades: { href } } } = continuidadActividades;
        let continuidadActividadesEnviar = {
            id,
            dsactividadcontinuidad,
            activo,
            apoyos: []
        }
        console.log('Update ENVIAR=>', continuidadActividadesEnviar);
        try {
            const resultado = await axiosPostHetoas(href, continuidadActividadesEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_ACTIVIDADESCONTINUAR,
                payload: resultado,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const eliminarActividadesContinuar = async idActividadesContinuar => {
        try {
            await axiosDeleteTipo(`continuidadActividades/${idActividadesContinuar}`);
            dispatch({
                type: ELIMINAR_ACTIVIDADESCONTINUAR,
                payload: idActividadesContinuar
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
            getActividadesContinuar();
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
        <ActividadesContinuarContext.Provider
            value={{
                actividadescontinuarList: state.actividadescontinuarList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getActividadesContinuar,
                registrarActividadesContinuar,
                eliminarActividadesContinuar,
                actualizarActividadesContinuar,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >

            {props.children}
        </ActividadesContinuarContext.Provider>
    )




}