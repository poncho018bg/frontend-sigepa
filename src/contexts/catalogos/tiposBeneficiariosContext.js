import React, { createContext, useReducer } from 'react';
import TiposBeneficiariosReducer from 'reducers/Catalogos/TiposBeneficiariosReducer';

import { GET_TIPOS_BENEFICIARIOS, REGISTRAR_TIPOS_BENEFICIARIOS, ELIMINAR_TIPOS_BENEFICIARIOS, MODIFICAR_TIPOS_BENEFICIARIOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

import UserService from 'servicios/UserService';

export const TiposBeneficiariosContext = createContext();

export const TiposBeneficiariosContextProvider = props => {
    const initialState = {
        tiposBeneficiariosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(TiposBeneficiariosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getTipoBeneficiarios = async () => {
        try {
            const result = await axiosGet('tiposBeneficiarios');
            console.log(result._embedded);
            console.log(result._embedded.tiposBeneficiarios);
            dispatch({
                type: GET_TIPOS_BENEFICIARIOS,
                payload: result._embedded.tiposBeneficiarios
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {tiposBeneficiarios} tiposBeneficiarios 
     */
    const registrarTiposBeneficiarios = async tiposBeneficiarios => {
        try {
            console.log(tiposBeneficiarios);
            const resultado = await axiosPost('tiposBeneficiarios', tiposBeneficiarios);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_TIPOS_BENEFICIARIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {tiposBeneficiarios} tiposBeneficiarios 
     */
    const actualizarTiposBeneficiarios = async tiposBeneficiarios => {
        const { id, dstipoapoyo, boactivo, _links: { ct_TiposBeneficiarios: { href } } } = tiposBeneficiarios;

        let tiposBeneficiariosEnviar = {
            dstipoapoyo,
            boactivo
        };

        console.log(tiposBeneficiariosEnviar);
        try {
            const result = await axiosPostHetoas(href, tiposBeneficiarios, 'PUT');
            dispatch({
                type: MODIFICAR_TIPOS_BENEFICIARIOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTiposBeneficiarios = async idTiposBeneficiarios => {
        try {
            await axiosDeleteTipo(`/tiposBeneficiarios/${idTiposBeneficiarios}`);
            dispatch({
                type: ELIMINAR_TIPOS_BENEFICIARIOS,
                payload: idTiposBeneficiarios,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TiposBeneficiariosContext.Provider
            value={{
                tiposBeneficiariosList: state.tiposBeneficiariosList,
                getTipoBeneficiarios,
                registrarTiposBeneficiarios,
                actualizarTiposBeneficiarios,
                eliminarTiposBeneficiarios
            }}
        >
            {props.children}
        </TiposBeneficiariosContext.Provider>
    )
}