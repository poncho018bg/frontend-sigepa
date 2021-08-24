import React, { createContext, useReducer } from 'react';
import ModuloSubReducer from '../reducers/ModuloSubReducer';

import Axios from 'axios';

import { GET_MODULO_SUBMODULOS } from '../types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';
import UserService from 'servicios/UserService';

export const ModuloSubContext = createContext();


export const ModuloSubContextProvider = props => {

    const initialState = {
        moduloSubList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(ModuloSubReducer, initialState);



    const getModulosBySubModulos = async subModulo => {

        try {
            console.log('mod. buscar =>', subModulo)
            const resultado = await axiosGet(`subModulos/${subModulo.id}/crcModulosCollection`);
            //   console.log(resultado);
            console.log('RES=> 1', resultado._embedded.modulos);
            dispatch({
                type: GET_MODULO_SUBMODULOS,
                payload: resultado._embedded.modulos
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <ModuloSubContext.Provider
            value={{
                moduloSubList: state.moduloSubList,
                getModulosBySubModulos,
            }}
        >
            {props.children}
        </ModuloSubContext.Provider>
    )

}