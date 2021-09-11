import React, { createContext, useReducer } from 'react';
import ModuloReducer from '../reducers/ModuloReducer';

import { GET_MODULOS, REGISTRAR_MODULO, ELIMINAR_MODULO, MODIFICAR_MODULO } from '../types/actionTypes';
import { axiosGet,axiosPost,axiosDeleteTipo,axiosPostHetoas } from 'helpers/axios';
import UserService from 'servicios/UserService';


export const ModuloContext = createContext();

export const ModuloContextProvider = props => {

    const initialState = {
        moduloList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(ModuloReducer, initialState);

    const getModulos = async () => {

        try {
            const resultado = await axiosGet('modulos');
            console.log(resultado._embedded.modulos);
            dispatch({
                type: GET_MODULOS,
                payload: resultado._embedded.modulos
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarModulos = async modulo => {
        try {
            console.log(modulo);
            const resultado = await axiosPost('modulos', modulo);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_MODULO,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarModulo = async modulo => {
        
        const {  dsmodulo,  boactivo, _links: { modulos: { href } } } = modulo;       
       
        let moduloEnviar = {
            dsmodulo,
            'usuarioCreacionId':  `${ process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}` ,
            boactivo,
            'SubModulos':[]
        }
        console.log(moduloEnviar);
        try {
            const resultado = await axiosPostHetoas(href, moduloEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_MODULO,
                payload: resultado,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarModulo = async idModulo => {
        try {
            await axiosDeleteTipo(`modulos/${idModulo}`);
            dispatch({
                type: ELIMINAR_MODULO,
                payload: idModulo
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModuloContext.Provider
            value={{
                moduloList: state.moduloList,
                getModulos,
                registrarModulos,
                actualizarModulo,
                eliminarModulo

            }}
        >
            {props.children}
        </ModuloContext.Provider>
    )

}