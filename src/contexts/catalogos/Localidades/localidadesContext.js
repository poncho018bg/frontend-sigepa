import React, { createContext, useReducer } from 'react';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { GET_LOCALIDADES,
        REGISTRAR_LOCALIDADES,
        ELIMINAR_LOCALIDADES,
        MODIFICAR_LOCALIDADES 
} from 'types/actionTypes';

import LocalidadesReducer from 'reducers/Catalogos/Localidades/LocalidadesReducer';
import { AGREGAR_PROGRAMA_ERROR } from 'types/actionTypes';



export const LocalidadesContext = createContext();

export const LocalidadesContextProvider = props => {
    const initialState = {
        localidadesList: [],
        error: false,
    }

    const [state, dispatch] = useReducer(LocalidadesReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get= async () => {
        try {
            const result = await axiosGet('localidades');
            dispatch({
                type: GET_LOCALIDADES,
                payload: result._embedded.localidades
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrar = async localidades => {
        console.log(localidades);
        try {
            const resultado = await axiosPost('localidades', localidades);
            dispatch({
                type: REGISTRAR_LOCALIDADES,
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
        console.log(objetoActualizar);
        const { id, dsestado, boactivo, _links: { cursosCapacitaciones: { href } } } = objetoActualizar;

        let objetoEnviar = {
            dsestado,
            boactivo
        };

        try {
            const result = await axiosPostHetoas(href, objetoEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_LOCALIDADES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar= async id => {
     
        try {
            await axiosDeleteTipo(`localidades/${id}`);
            dispatch({
                type: ELIMINAR_LOCALIDADES,
                payload: id,
            })
        } catch (error) {
            console.log(error);
        }
    }


          


    return (
        <LocalidadesContext.Provider
            value={{
                localidadesList: state.localidadesList,
                error:state.error,
                get,
                registrar,
                actualizar,
                eliminar
            }}
        >
            {props.children}
        </LocalidadesContext.Provider>
    )
}