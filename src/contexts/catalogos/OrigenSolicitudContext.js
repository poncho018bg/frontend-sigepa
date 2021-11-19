import React, { createContext, useReducer } from 'react';
import OrigenSolicitudReducer from 'reducers/Catalogos/OrigenSolicitudReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_ORIGENES_SOLICITUD,
    REGISTRAR_ORIGENES_SOLICITUD,
    ELIMINAR_ORIGENES_SOLICITUD,
    MODIFICAR_ORIGENES_SOLICITUD,
    ORIGENES_SOLICITUD_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';



export const OrigenSolicitudContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const OrigenSolicitudContextProvider = props => {

    const initialState = {
        origenesList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(OrigenSolicitudReducer, initialState);


    const getOrigenes = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`origensolicitudes?page=${page}&size=${size}`);
            dispatch({
                type: GET_ORIGENES_SOLICITUD,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarOrigenes = async origensolicitudes => {

        try {
            const url = `${baseUrlPublico}origensolicitudes`;
            return new Promise((resolve, reject) => {
                axios.post(url, origensolicitudes, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_ORIGENES_SOLICITUD,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: ORIGENES_SOLICITUD_ERROR,
                payload: true
            })
        }
    }

    const actualizarOrigenes = async origensolicitudesw => {
        try {
          
            const { _links: { origensolicitudes: { href } } } = origensolicitudesw;
            const resultado = await axiosPostHetoas(href, origensolicitudesw, 'PUT');  
            
            dispatch({
                type: MODIFICAR_ORIGENES_SOLICITUD,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarOrigenes = async origensolicitudes => {
        const { activo, _links: { origensolicitudes: { href } } } = origensolicitudes
        const act = !activo
        origensolicitudes.activo = act
        try {
            const result = await axiosPostHetoas(href, origensolicitudes, 'PUT');
            dispatch({
                type: ELIMINAR_ORIGENES_SOLICITUD,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getOrigenesByParametros = async (search) => {
        try {            
            const result = await axiosGet(`origensolicitudes/search/findByDsorigensolicitudContaining?dsorigensolicitud=${search}`);    
            console.log('getOrigenesByParametros',result)        
            dispatch({
                type: GET_ORIGENES_SOLICITUD,
                payload: result
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
            console.err(error);
            throw error;
        }
    }

    const changePageSizes = async (sizes) => {
        try {
            dispatch(changePageSize(sizes))
        } catch (error) {
            console.err(error);
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
        <OrigenSolicitudContext.Provider
            value={{
                origenesList: state.origenesList,
                getOrigenes,
                registrarOrigenes,
                actualizarOrigenes,
                eliminarOrigenes,
                getOrigenesByParametros,

                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
            }}
        >
            {props.children}
        </OrigenSolicitudContext.Provider>
    )

}