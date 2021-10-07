import React, { createContext, useReducer } from 'react';
import ComiteSecretariasReducer from 'reducers/Catalogos/ComiteSecretariasReducer';

import { GET_COMITE_SECRETARIAS, REGISTRAR_COMITE_SECRETARIAS, ELIMINAR_COMITE_SECRETARIAS, MODIFICAR_COMITE_SECRETARIAS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const ComiteSecretariasContext = createContext();

export const ComiteSecretariasContextProvider = props => {
    const initialState = {
        comiteSecretariasList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(ComiteSecretariasReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getComiteSecretarias = async () => {
        try {
            const result = await axiosGet('comiteSecretarias');
            console.log(result._embedded);
            console.log(result._embedded.comiteSecretarias);
            dispatch({
                type: GET_COMITE_SECRETARIAS,
                payload: result._embedded.comiteSecretarias
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {comiteSecretarias} comiteSecretarias 
     */
    const registrarComiteSecretarias = async comiteSecretarias => {
        try {
            console.log(comiteSecretarias);
            const resultado = await axiosPost('comiteSecretarias', comiteSecretarias);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_COMITE_SECRETARIAS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {comiteSecretarias} comiteSecretarias 
     */
    const actualizarComiteSecretarias = async comiteSecretarias => {
        const { dssecretaria, boactivo, _links: { ct_ComiteSecretarias: { href } } } = comiteSecretarias;

        let comiteSecretariasEnviar = {
            dssecretaria,
            boactivo
        };

        console.log(comiteSecretariasEnviar);
        try {
            const result = await axiosPostHetoas(href, comiteSecretarias, 'PUT');
            dispatch({
                type: MODIFICAR_COMITE_SECRETARIAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarComiteSecretarias = async idComiteSecretarias => {
        try {
            await axiosDeleteTipo(`/comiteSecretarias/${idComiteSecretarias}`);
            dispatch({
                type: ELIMINAR_COMITE_SECRETARIAS,
                payload: idComiteSecretarias,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ComiteSecretariasContext.Provider
            value={{
                comiteSecretariasList: state.comiteSecretariasList,
                getComiteSecretarias,
                registrarComiteSecretarias,
                actualizarComiteSecretarias,
                eliminarComiteSecretarias
            }}
        >
            {props.children}
        </ComiteSecretariasContext.Provider>
    )
}