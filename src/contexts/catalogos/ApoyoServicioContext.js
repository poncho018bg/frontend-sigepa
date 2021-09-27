import React, { createContext, useReducer } from 'react';
import ApoyoServicioReducer from 'reducers/Catalogos/ApoyoServicioReducer';


import {
    GET_APOYOSERVICIO, REGISTRAR_APOYOSERVICIO, ELIMINAR_APOYOSERVICIO, MODIFICAR_APOYOSERVICIO,
    AGREGAR_APOYOSERVICIO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';



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
            console.log(apoyosServicios);
            const resultado = await axiosPost('apoyosServicios', apoyosServicios);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_APOYOSERVICIO,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_MUNICIPIOS_ERROR,
                payload: true
            })
        }
    }


    const actualizarApoyoServicio = async apoyosServicios => {
        console.log(apoyosServicios);
        const { dsservicio, activo, _links: { apoyosServicios: { href } } } = apoyosServicios;
        let apoyosServiciosEnviar = {
            dsservicio,
            activo,
            crcProgramastipoapoyos: []
        }
        try {
            const resultado = await axiosPostHetoas(href, apoyosServiciosEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_APOYOSERVICIO,
                payload: resultado,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarApoyoServicio = async idApoyoServicio => {
        try {
            await axiosDeleteTipo(`apoyosServicios/${idApoyoServicio}`);
            dispatch({
                type: ELIMINAR_APOYOSERVICIO,
                payload: idApoyoServicio
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