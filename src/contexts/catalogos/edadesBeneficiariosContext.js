import React, { createContext, useReducer } from 'react';
import EdadesBeneficiariosReducer from 'reducers/Catalogos/EdadesBeneficiariosReducer';

import { GET_EDADES_BENEFICIARIOS, REGISTRAR_EDADES_BENEFICIARIOS, MODIFICAR_EDADES_BENEFICIARIOS, ELIMINAR_EDADES_BENEFICIARIOS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const EdadesBeneficiariosContext = createContext();

export const EdadesBeneficiariosContextProvider = props => {
    const initialState = {
        edadesBeneficiariosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(EdadesBeneficiariosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getEdadesBeneficiarios = async () => {
        try {
            const result = await axiosGet('edadesBeneficiarios');
            console.log(result._embedded);
            console.log(result._embedded.edadesBeneficiarios);
            dispatch({
                type: GET_EDADES_BENEFICIARIOS,
                payload: result._embedded.edadesBeneficiarios
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {edadesBeneficiarios} edadesBeneficiarios 
     */
    const registrarEdadesBeneficiarios = async edadesBeneficiarios => {
        try {
            console.log(edadesBeneficiarios);
            const resultado = await axiosPost('edadesBeneficiarios', edadesBeneficiarios);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_EDADES_BENEFICIARIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {edadesBeneficiarios} edadesBeneficiarios 
     */
    const actualizarEdadesBeneficiarios= async edadesBeneficiarios => {
        const { dsedadbeneficiario, boactivo, _links: { ct_EdadesBeneficiarios: { href } } } = edadesBeneficiarios;

        let edadesBeneficiariosEnviar = {
            dsedadbeneficiario,
            boactivo
        };

        console.log(edadesBeneficiariosEnviar);
        try {
            const result = await axiosPostHetoas(href, edadesBeneficiarios, 'PUT');
            dispatch({
                type: MODIFICAR_EDADES_BENEFICIARIOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarEdadesBeneficiarios = async idEdadesBeneficiarios => {
        try {
            await axiosDeleteTipo(`/edadesBeneficiarios/${idEdadesBeneficiarios}`);
            dispatch({
                type: ELIMINAR_EDADES_BENEFICIARIOS,
                payload: idEdadesBeneficiarios,
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EdadesBeneficiariosContext.Provider
            value={{
                edadesBeneficiariosList: state.edadesBeneficiariosList,
                getEdadesBeneficiarios,
                registrarEdadesBeneficiarios,
                actualizarEdadesBeneficiarios,
                eliminarEdadesBeneficiarios
            }}
        >
            {props.children}
        </EdadesBeneficiariosContext.Provider>
    )
}