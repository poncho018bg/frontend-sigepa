import React, { createContext, useReducer } from 'react';
import complementoFursReducer from '../reducers/complementoFursReducer';
import { GET_COMPLEMENTO_FURS, REGISTRAR_COMPLEMENTO_FURS, ACTUALIZAR_COMPLEMENTO_FURS } from '../types/actionTypes';

import { axiosGet } from 'helpers/axios';
import { axiosPost} from 'helpers/axiosPublico';
import { axiosPut} from 'helpers/axiosPublico';

export const ComplementoFursContext = createContext();

export const ComplementoFursContextProvider = props => {
    const initialState = {
        complementoFursList: []
    }

    const [state, dispatch] = useReducer(complementoFursReducer, initialState);

    const getComplementoFurs = async idPrograma => {
        try {
            console.log("idPrograma ", idPrograma);
            const result = await axiosGet(`complementoFurs/${idPrograma}`);
            console.log(result);
            dispatch({
                type: GET_COMPLEMENTO_FURS,
                payload: result
            });
        } catch (error) {
            console.log(error);
        }
    }

    const registrarComplementoFurs = async complementoFurs => {
        try {
            console.log(complementoFurs);
            const resultado = await axiosPost('complementoFurs', complementoFurs);
            console.log("resultado --->", resultado);
            dispatch({
                type: REGISTRAR_COMPLEMENTO_FURS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarComplementoFurs = async complementoFurs => {
        try {
            console.log(direccion);
            const resultado = await axiosPut('complementoFurs', complementoFurs);
            console.log("resultado --->", resultado);
            dispatch({
                type: ACTUALIZAR_COMPLEMENTO_FURS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ComplementoFursContext.Provider
            value={{
                complementoFursList: state.complementoFursList,
                getComplementoFurs,
                registrarComplementoFurs,
                actualizarComplementoFurs
            }}
        >
            {props.children}
        </ComplementoFursContext.Provider>
    )
}