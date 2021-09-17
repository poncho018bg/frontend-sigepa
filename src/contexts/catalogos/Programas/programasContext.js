import React, { createContext, useReducer } from 'react';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { 
        REGISTRAR_PROGRAMAS,
        AGREGAR_PROGRAMA_ERROR,
        MODIFICAR_CURSOS_CAPACITACIONES,
        ELIMINAR_PROGRAMAS,
        GET_PROGRAMAS } 
from 'types/actionTypes';
import ProgramasReducer from 'reducers/Catalogos/Programas/ProgramasReducer';



export const ProgramasContext = createContext();

export const ProgramasContextProvider = props => {
    const initialState = {
        programasList: [],
        error: false,
    }

    const [state, dispatch] = useReducer(ProgramasReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get= async () => {
        try {
            const result = await axiosGet('programas');
            dispatch({
                type: GET_PROGRAMAS,
                payload: result._embedded.programas
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrar = async programas => {
        try {
            const resultado = await axiosPost('programas', programas);
            dispatch({
                type: REGISTRAR_PROGRAMAS,
                payload: resultado
            })
        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_PROGRAMA_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar= async objetoActualizar => {
        const {  dsestado, boactivo, _links: { cursosCapacitaciones: { href } } } = objetoActualizar;

        let objetoEnviar = {
            dsestado,
            boactivo
        };

        try {
            const result = await axiosPostHetoas(href, objetoEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_CURSOS_CAPACITACIONES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar= async id => {
        try {
            await axiosDeleteTipo(`programas/${id}`);
            dispatch({
                type: ELIMINAR_PROGRAMAS,
                payload: id,
            })
        } catch (error) {
            console.log(error);
        }
    }


          


    return (
        <ProgramasContext.Provider
            value={{
                programasList: state.programasList,
                error:state.error,
                get,
                registrar,
                actualizar,
                eliminar
            }}
        >
            {props.children}
        </ProgramasContext.Provider>
    )
}