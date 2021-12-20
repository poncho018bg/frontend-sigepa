import React, { createContext, useReducer } from 'react';
import EstatusSolicitudReducer from 'reducers/Catalogos/EstatusSolicitudReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_ESTATUS_SOLICITUD,
    REGISTRAR_ESTATUS_SOLICITUD,
    ELIMINAR_ESTATUS_SOLICITUD,
    MODIFICAR_ESTATUS_SOLICITUD,
    ESTATUS_SOLICITUD_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';

export const EstatusSolicitudContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const EstatusSolicitudContextProvider = props => {

    const initialState = {
        estatusSolicitudList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(EstatusSolicitudReducer, initialState);


    const getEstatusSolicitud = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`estatusSolicitud?page=${page}&size=${size}`);
            dispatch({
                type: GET_ESTATUS_SOLICITUD,
                payload: resultado
               
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarEstatusSolicitud = async estatusSolicitud => {

        try {
            const url = `${baseUrlPublico}estatusSolicitud`;
            return new Promise((resolve, reject) => {
                axios.post(url, estatusSolicitud, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_ESTATUS_SOLICITUD,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: ESTATUS_SOLICITUD_ERROR,
                payload: true
            })
        }
    }

    const actualizarEstatusSolicitud = async estatusSolicitudw => {
        try {
            const { _links: { estatusSolicitud: { href } } } = estatusSolicitudw;
            const resultado = await axiosPostHetoas(href, estatusSolicitudw, 'PUT');           

            dispatch({
                type: MODIFICAR_ESTATUS_SOLICITUD,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarEstatusSolicitud = async estatusSolicitud => {
        console.log('xxestatusSolicitud',estatusSolicitud)
        const { activo, _links: { estatusSolicitud: { href } } } = estatusSolicitud
        const act = !activo
        estatusSolicitud.activo = act
        try {
            const result = await axiosPostHetoas(href, estatusSolicitud, 'PUT');
            dispatch({
                type: ELIMINAR_ESTATUS_SOLICITUD,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getEstatusSolicitudByParametros = async (search) => {
        try {
            
            const result = await axiosGet(`estatusSolicitud/search/findByDsestatusregistroContaining?dsestatusregistro=${search}`);
            
            dispatch({
                type: GET_ESTATUS_SOLICITUD,
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
        <EstatusSolicitudContext.Provider
            value={{
                estatusSolicitudList: state.estatusSolicitudList,
                getEstatusSolicitud,
                registrarEstatusSolicitud,
                actualizarEstatusSolicitud,
                eliminarEstatusSolicitud,
                getEstatusSolicitudByParametros,

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
        </EstatusSolicitudContext.Provider>
    )

}