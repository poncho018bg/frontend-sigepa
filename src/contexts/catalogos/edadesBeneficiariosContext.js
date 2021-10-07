import React, { createContext, useReducer } from 'react';
import EdadesBeneficiariosReducer from 'reducers/Catalogos/EdadesBeneficiariosReducer';

import { GET_EDADES_BENEFICIARIOS, REGISTRAR_EDADES_BENEFICIARIOS, MODIFICAR_EDADES_BENEFICIARIOS, ELIMINAR_EDADES_BENEFICIARIOS,
    AGREGAR_PROGRAMA_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const EdadesBeneficiariosContext = createContext();

export const EdadesBeneficiariosContextProvider = props => {
    const initialState = {
        edadesBeneficiariosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(EdadesBeneficiariosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getEdadesBeneficiarios = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`edadesBeneficiarios?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.edadesBeneficiarios);
            dispatch({
                type: GET_EDADES_BENEFICIARIOS,
                payload: result
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
        const { dsedadbeneficiario, boactivo, _links: { edadesBeneficiarios: { href } } } = edadesBeneficiarios;

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
            await axiosDeleteTipo(`edadesBeneficiarios/${idEdadesBeneficiarios}`);
            dispatch({
                type: ELIMINAR_EDADES_BENEFICIARIOS,
                payload: idEdadesBeneficiarios,
            })
        } catch (error) {
            console.log(error);
        }
    }

     //Paginacion
     const changePage = async (page) => {
        console.log(page);

        dispatch(changePageNumber(page))
        try {
            getEdadesBeneficiarios();
        } catch (error) {         
            throw error;
        }

    }

    const changePageNumber = (page) => ({
        type: CAMBIAR_PAGINA,
        payload: page
    })

    const changePageSize = (size) => ({
        type: CAMBIAR_TAMANIO_PAGINA,
        payload: size
    })

    return (
        <EdadesBeneficiariosContext.Provider
            value={{
                edadesBeneficiariosList: state.edadesBeneficiariosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getEdadesBeneficiarios,
                registrarEdadesBeneficiarios,
                actualizarEdadesBeneficiarios,
                eliminarEdadesBeneficiarios,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </EdadesBeneficiariosContext.Provider>
    )
}