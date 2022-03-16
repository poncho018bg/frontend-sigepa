import React, { createContext, useReducer } from 'react';
import ActividadesContinuarReducer from 'reducers/Catalogos/ActividadesContinuarReducer';
import {
    GET_ACTIVIDADESCONTINUAR, REGISTRAR_ACTIVIDADESCONTINUAR, ELIMINAR_ACTIVIDADESCONTINUAR, MODIFICAR_ACTIVIDADESCONTINUAR,
    AGREGAR_ACTIVIDADESCONTINUAR_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';
import { axiosGet, axiosPost,  axiosPostHetoas } from 'helpers/axios';




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
    
    const getActividadesContinuarActivos = async () => {
        try {
            const { page, size } = state;
            const resultado = await axiosGet(`continuidadActividades/search/findByActivoTrue`);
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


    const eliminarActividadesContinuar = async continuidadActividades => {

        const { dsactividadcontinuidad,
            id,
            fechaRegistro,
            activo, _links: { continuidadActividades: { href } } } = continuidadActividades;
        const act = activo === true ? false : true;
        let continuidadActividadesEnviar = {
            dsactividadcontinuidad,
            id,
            fechaRegistro,
            activo: act,
        }

        try {
            const result = await axiosPostHetoas(href, continuidadActividadesEnviar, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_ACTIVIDADESCONTINUAR,
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

    const getActividadesContinuarByParametros = async (search) => {
        try {
            
            const resultado = await axiosGet(`continuidadActividades/search/findByDsactividadcontinuidadContaining?dsactividadcontinuidad=${search}`);
            
            dispatch({
                type: GET_ACTIVIDADESCONTINUAR,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    return (
        <ActividadesContinuarContext.Provider
            value={{
                actividadescontinuarList: state.actividadescontinuarList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getActividadesContinuar,
                getActividadesContinuarActivos,
                registrarActividadesContinuar,
                eliminarActividadesContinuar,
                actualizarActividadesContinuar,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getActividadesContinuarByParametros
            }}
        >

            {props.children}
        </ActividadesContinuarContext.Provider>
    )




}