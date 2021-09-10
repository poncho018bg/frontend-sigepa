import React, { createContext, useReducer } from 'react';
import PeriodicidadApoyosReducer from 'reducers/Catalogos/PeriodicidadApoyosReducer';

import { GET_PERIODICIDAD_APOYOS, REGISTRAR_PERIODICIDAD_APOYOS, MODIFICAR_PERIODICIDAD_APOYOS, ELIMINAR_PERIODICIDAD_APOYOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';


export const PeriodicidadApoyosContext = createContext();

export const PeriodicidadApoyosContextProvider = props => {
    const initialState = {
        periodicidadApoyosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(PeriodicidadApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getPeriodicidadApoyos = async () => {
        try {
            const result = await axiosGet('periodicidadApoyos');
            console.log(result._embedded);
            console.log(result._embedded.periodicidadApoyos);
            dispatch({
                type: GET_PERIODICIDAD_APOYOS,
                payload: result._embedded.periodicidadApoyos
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {periodicidadApoyos} periodicidadApoyos 
     */
    const registrarPeriodicidadApoyos = async periodicidadApoyos => {
        try {
            console.log(periodicidadApoyos);
            const resultado = await axiosPost('periodicidadApoyos', periodicidadApoyos);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_PERIODICIDAD_APOYOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {periodicidadApoyos} periodicidadApoyos 
     */
    const actualizarPeriodicidadApoyos= async periodicidadApoyos => {
        const {dsperiodicidad, boactivo, _links: { ct_PeriodicidadApoyos: { href } } } = periodicidadApoyos;

        let periodicidadApoyosEnviar = {
            dsperiodicidad,
            boactivo
        };

        console.log(periodicidadApoyosEnviar);
        try {
            const result = await axiosPostHetoas(href, periodicidadApoyos, 'PUT');
            dispatch({
                type: MODIFICAR_PERIODICIDAD_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarPeriodicidadApoyos = async idPeriodicidadApoyos => {
        try {
            await axiosDeleteTipo(`/periodicidadApoyos/${idPeriodicidadApoyos}`);
            dispatch({
                type: ELIMINAR_PERIODICIDAD_APOYOS,
                payload: idPeriodicidadApoyos,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PeriodicidadApoyosContext.Provider
            value={{
                periodicidadApoyosList: state.periodicidadApoyosList,
                getPeriodicidadApoyos,
                registrarPeriodicidadApoyos,
                actualizarPeriodicidadApoyos,
                eliminarPeriodicidadApoyos
            }}
        >
            {props.children}
        </PeriodicidadApoyosContext.Provider>
    )
}