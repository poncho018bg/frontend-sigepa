import React, { createContext, useReducer } from 'react';
import ApoyoServicioReducer from 'reducers/Catalogos/ApoyoServicioReducer';
import axios from "axios";

import {
    GET_APOYOSERVICIO, REGISTRAR_APOYOSERVICIO, ELIMINAR_APOYOSERVICIO, MODIFICAR_APOYOSERVICIO,
    AGREGAR_APOYOSERVICIO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';


const baseUrl = process.env.REACT_APP_API_URL;
export const ApoyoServicioContext = createContext();

export const ApoyoServicioContextProvider = props => {

    const initialState = {
        apoyoservicioList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }


    const [state, dispatch] = useReducer(ApoyoServicioReducer, initialState);

    const getApoyoServicio = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`apoyosServicios?page=${page}&size=${size}`);
            console.log(resultado._embedded.apoyosServicios);
            dispatch({
                type: GET_APOYOSERVICIO,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }


    const registrarApoyoSevicio = async apoyosServicios => {

        try {
            const url = `${baseUrl}apoyosServicios`;
            return new Promise((resolve, reject) => {
                axios.post(url, apoyosServicios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_APOYOSERVICIO,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_APOYOSERVICIO_ERROR,
                payload: true
            })
        }


    }


    const actualizarApoyoServicio = async apoyosServicios => {
        console.log(apoyosServicios);
        const { dsservicio, activo, clasificacion_id, clasificacionServicio, serviciosApoyos, _links: { apoyosServicios: { href } } } = apoyosServicios;
        let apoyosServiciosEnviar = {
            dsservicio,
            activo,
            crcProgramastipoapoyos: [],
            clasificacionServicio: `/${clasificacion_id}`,
            serviciosApoyos: [{}]
        }

        return new Promise((resolve, reject) => {
            axios.put(href, apoyosServicios, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_APOYOSERVICIO,
                    payload: response.data
                })
            }).catch(error => {
                reject(error);
            });
        });
    }

    const eliminarApoyoServicio = async apoyosServicios => {
        const { dsservicio, activo, clasificacion_id, clasificacionServicio, serviciosApoyos, _links: { apoyosServicios: { href } } } = apoyosServicios;
        const act = activo === true ? false : true;
        let apoyosServiciosEnviar = {
            dsservicio,
            activo: act,
            crcProgramastipoapoyos: [],
            clasificacionServicio: `/${clasificacion_id}`,
            serviciosApoyos: [{}]
        }


        try {
            const result = await axiosPostHetoas(href, apoyosServiciosEnviar, 'PUT');
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
            getApoyoServicio();
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
        <ApoyoServicioContext.Provider
            value={{
                apoyoservicioList: state.apoyoservicioList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getApoyoServicio,
                registrarApoyoSevicio,
                eliminarApoyoServicio,
                actualizarApoyoServicio,
                changePageNumber,
                changePageSize,
                changePage

            }}
        >
            {props.children}
        </ApoyoServicioContext.Provider>
    )


}