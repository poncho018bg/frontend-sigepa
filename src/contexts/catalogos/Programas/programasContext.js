import React, { createContext, useReducer } from 'react';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { REGISTRAR_PROGRAMAS } from 'types/actionTypes';
import { MODIFICAR_CURSOS_CAPACITACIONES } from 'types/actionTypes';
import { ELIMINAR_CURSOS_CAPACITACIONES } from 'types/actionTypes';
import { GET_CURSOS_CAPACITACIONES } from 'types/actionTypes';
import ProgramasReducer from 'reducers/Catalogos/Programas/ProgramasReducer';



export const ProgramasContext = createContext();

export const ProgramasContextProvider = props => {
    const initialState = {
        programasList: []
    }

    const [state, dispatch] = useReducer(ProgramasReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get= async () => {
        try {
            const result = await axiosGet('cursosCapacitaciones');
            dispatch({
                type: GET_CURSOS_CAPACITACIONES,
                payload: result._embedded.cursosCapacitaciones
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
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar= async objetoActualizar => {
        console.log(objetoActualizar);
        const { id, dsestado, boactivo, _links: { cursosCapacitaciones: { href } } } = objetoActualizar;

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
            await axiosDeleteTipo(`cursosCapacitaciones/${id}`);
            dispatch({
                type: ELIMINAR_CURSOS_CAPACITACIONES,
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