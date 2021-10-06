import React, { createContext, useReducer } from 'react';
import MotivoRechazosReducer from 'reducers/Catalogos/MotivoRechazosReducer';
import axios from "axios";
import {
    GET_MOTIVO_RECHAZOS, REGISTRAR_MOTIVO_RECHAZOS, MODIFICAR_MOTIVO_RECHAZOS, ELIMINAR_MOTIVO_RECHAZOS,
    AGREGAR_MOTIVO_RECHAZOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;
export const MotivoRechazosContext = createContext();

export const MotivoRechazosContextProvider = props => {
    const initialState = {
        motivoRechazosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(MotivoRechazosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getMotivoRechazos = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`motivoRechazos?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.motivoRechazos);
            dispatch({
                type: GET_MOTIVO_RECHAZOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrarMotivoRechazos = async motivoRechazos => {

        try {
            const url = `${baseUrl}motivoRechazos`;
            return new Promise((resolve, reject) => {
                axios.post(url, motivoRechazos, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_MOTIVO_RECHAZOS,
                        payload: response
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_MOTIVO_RECHAZOS_ERROR,
                payload: true
            })
        }

    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizarMotivoRechazos = async motivoRechazos => {
        const { dsmotivorechazo, boactivo, _links: { ct_MotivoRechazos: { href } } } = motivoRechazos;

        let motivoRechazosEnviar = {
            dsmotivorechazo,
            boactivo
        };



        return new Promise((resolve, reject) => {
            axios.put(href, motivoRechazos, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_MOTIVO_RECHAZOS,
                    payload: response
                })
            }).catch(error => {
                reject(error);
            });
        });
    }

    const eliminarMotivoRechazos = async motivoRechazos => {


        const { id, dsmotivorechazo, activo, _links: { ct_MotivoRechazos: { href } } } = motivoRechazos;
        const act = activo === true ? false : true;

        let motivoRechazosEnviar = {
            id,
            dsmotivorechazo,
            activo: act,
        };


        try {
            const result = await axiosPostHetoas(href, motivoRechazosEnviar, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_APOYOSERVICIO,
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
            getMotivoRechazos();
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
        <MotivoRechazosContext.Provider
            value={{
                motivoRechazosList: state.motivoRechazosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getMotivoRechazos,
                registrarMotivoRechazos,
                actualizarMotivoRechazos,
                eliminarMotivoRechazos,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </MotivoRechazosContext.Provider>
    )
}