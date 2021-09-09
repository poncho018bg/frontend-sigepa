import React, { createContext, useReducer } from 'react';
import ClasificacionServiciosReducer from 'reducers/Catalogos/ClasificacionServiciosReducer';

import { GET_CLASIFICACION_SERVICIOS, REGISTRAR_CLASIFICACION_SERVICIOS, MODIFICAR_CLASIFICACION_SERVICIOS, ELIMINAR_CLASIFICACION_SERVICIOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const ClasificacionServiciosContext = createContext();

export const ClasificacionServiciosContextProvider = props => {
    const initialState = {
        clasificacionServiciosList: [],
    }

    const [state, dispatch] = useReducer(ClasificacionServiciosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getClasificacionServicios = async () => {
        try {
            const result = await axiosGet('clasificacionServicios');
            console.log(result._embedded);
            console.log(result._embedded.clasificacionServicios);
            dispatch({
                type: GET_CLASIFICACION_SERVICIOS,
                payload: result._embedded.clasificacionServicios
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
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {ClasificacionServicios} clasificacionServicios 
     */
    const actualizarClasificacionServicios= async clasificacionServicios => {
        const { id, dsclasificacionservicio,dsabreviatura, activo, _links: { clasificacionServicios: { href } } } = clasificacionServicios;

        let ClasificacionServiciosEnviar = {
            id,
            dsclasificacionservicio,
            dsabreviatura,
            activo,
            'crcApoyoServicios':[]
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
        try {
            await axiosDeleteTipo(`clasificacionServicios/${idClasificacionServicios}`);
            dispatch({
                type: ELIMINAR_CLASIFICACION_SERVICIOS,
                payload: idClasificacionServicios,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ClasificacionServiciosContext.Provider
            value={{
                clasificacionServiciosList: state.clasificacionServiciosList,
                getClasificacionServicios,
                registrarClasificacionServicios,
                actualizarClasificacionServicios,
                eliminarClasificacionServicios
            }}
        >
            {props.children}
        </ClasificacionServiciosContext.Provider>
    )
}