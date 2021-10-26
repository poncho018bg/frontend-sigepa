import React, { createContext, useReducer } from 'react';
import TiposApoyosReducer from 'reducers/Catalogos/TiposApoyosReducer';

import {
    GET_TIPOS_APOYOS, REGISTRAR_TIPOS_APOYOS, ELIMINAR_TIPOS_APOYOS, MODIFICAR_TIPOS_APOYOS,
    
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost,  axiosPostHetoas } from 'helpers/axios';

export const TiposApoyosContext = createContext();

export const TiposApoyosContextProvider = props => {
    const initialState = {
        tiposApoyosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(TiposApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getTiposApoyos = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`tiposApoyos?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.tiposApoyos);
            dispatch({
                type: GET_TIPOS_APOYOS,
                payload: result
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
        const { dstipoapoyo, boactivo, _links: { ct_TiposApoyos: { href } } } = tiposApoyos;

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

        const { activo, _links: { ct_TiposApoyos: { href } } } = idTiposApoyos
        const act = !activo
        idTiposApoyos.activo = act

        try {
            const result = await axiosPostHetoas(href, idTiposApoyos, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_TIPOS_APOYOS,
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

    const getTiposApoyosByParametros = async (search) => {
        try {
            
            const result = await axiosGet(`tiposApoyos/search/findByDstipoapoyoContaining?dstipoapoyo=${search}`);
            
            dispatch({
                type: GET_TIPOS_APOYOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TiposApoyosContext.Provider
            value={{
                tiposApoyosList: state.tiposApoyosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getTiposApoyos,
                registrarTiposApoyos,
                actualizarTiposApoyos,
                eliminarTiposApoyos,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getTiposApoyosByParametros
            }}
        >
            {props.children}
        </TiposApoyosContext.Provider>
    )
}