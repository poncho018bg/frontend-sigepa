import React, { createContext, useReducer } from 'react';

import { GET_SUBMODULOSBYPERFIL,  } from '../types/actionTypes';
import { axiosGet } from 'helpers/axios';
import submodulosByperfilReducer from 'reducers/submodulosByperfilReducer';

export const SubmodulosByPerfilContex = createContext();

export const SubmodulosByPerfilContexProvider = props => {

    const initialState = {
        submodulosPerfilList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(submodulosByperfilReducer, initialState);

    const getSubmodulosByperfil = async idPerfil => {

        try {
            const resultado = await axiosGet(`perfilessubmodulosOverride/${idPerfil}`);
            console.log(resultado);
            dispatch({
                type: GET_SUBMODULOSBYPERFIL,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }
 
    return (
        <SubmodulosByPerfilContex.Provider
            value={{
                submodulosPerfilList: state.submodulosPerfilList,
                getSubmodulosByperfil
            }}
        >
            {props.children}
        </SubmodulosByPerfilContex.Provider>
    )
}