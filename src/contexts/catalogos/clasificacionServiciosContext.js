import React, { createContext, useReducer } from 'react';
import ClasificacionServiciosReducer from 'reducers/Catalogos/ClasificacionServiciosReducer';

import {
    GET_CLASIFICACION_SERVICIOS, REGISTRAR_CLASIFICACION_SERVICIOS, MODIFICAR_CLASIFICACION_SERVICIOS, ELIMINAR_CLASIFICACION_SERVICIOS,
    AGREGAR_CLASIFICACION_SERVICIOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const ClasificacionServiciosContext = createContext();

export const ClasificacionServiciosContextProvider = props => {
    const initialState = {
        clasificacionServiciosList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(ClasificacionServiciosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getClasificacionServicios = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`clasificacionServicios?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.clasificacionServicios);
            dispatch({
                type: GET_CLASIFICACION_SERVICIOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {clasificacionServicios} clasificacionServicios 
     */
    const registrarClasificacionServicios = async clasificacionServicios => {
        try {
            console.log(clasificacionServicios);
            const resultado = await axiosPost('clasificacionServicios', clasificacionServicios);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_CLASIFICACION_SERVICIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_CLASIFICACION_SERVICIOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {ClasificacionServicios} clasificacionServicios 
     */
    const actualizarClasificacionServicios = async clasificacionServicios => {
        const { id, dsclasificacionservicio, dsabreviatura, activo, _links: { clasificacionServicios: { href } } } = clasificacionServicios;

        let ClasificacionServiciosEnviar = {
            id,
            dsclasificacionservicio,
            dsabreviatura,
            activo,
            'crcApoyoServicios': []
        };

        console.log(ClasificacionServiciosEnviar);
        console.log(clasificacionServicios)
        try {
            const result = await axiosPostHetoas(href, ClasificacionServiciosEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_CLASIFICACION_SERVICIOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    const eliminarClasificacionServicios = async idClasificacionServicios => {

        const { id, dsclasificacionservicio,dsabreviatura, activo, _links: { clasificacionServicios: { href } } } = idClasificacionServicios;
        const act = activo === true ? false : true;

        let clasificacionServiciosEnviar = {
            id,
            dsclasificacionservicio,
            dsabreviatura,
            activo: act,
            'crcApoyoServicios': []
        };

        try {
            const result = await axiosPostHetoas(href, clasificacionServiciosEnviar, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_CLASIFICACION_SERVICIOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarClasificacionServicios1 = async idClasificacionServicios => {

        try {
            await axiosDeleteTipo(`clasificacionServicios/${idClasificacionServicios.id}`);
            dispatch({
                type: ELIMINAR_CLASIFICACION_SERVICIOS,
                payload: idClasificacionServicios.id,
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

    const getClasificacionServiciosByParametros = async (search) => {
        try {            
            const result = await axiosGet(`clasificacionServicios/search/findByDsclasificacionservicioContaining?dsclasificacionservicio=${search}`);            
            dispatch({
                type: GET_CLASIFICACION_SERVICIOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ClasificacionServiciosContext.Provider
            value={{
                clasificacionServiciosList: state.clasificacionServiciosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getClasificacionServicios,
                registrarClasificacionServicios,
                actualizarClasificacionServicios,
                eliminarClasificacionServicios,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getClasificacionServiciosByParametros
            }}
        >
            {props.children}
        </ClasificacionServiciosContext.Provider>
    )
}