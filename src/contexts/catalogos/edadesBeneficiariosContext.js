import React, { createContext, useReducer } from 'react';
import EdadesBeneficiariosReducer from 'reducers/Catalogos/EdadesBeneficiariosReducer';
import axios from "axios";
import { GET_EDADES_BENEFICIARIOS,
     REGISTRAR_EDADES_BENEFICIARIOS, 
     MODIFICAR_EDADES_BENEFICIARIOS, ELIMINAR_EDADES_BENEFICIARIOS,
     GET_EDADES_BENEFICIARIOS_BY_ID,
    AGREGAR_PROGRAMA_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { axiosGetHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;
export const EdadesBeneficiariosContext = createContext();

export const EdadesBeneficiariosContextProvider = props => {
    const initialState = {
        edadesBeneficiariosList: [],
        edadesBeneficiario: null,
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
            const url = `${baseUrl}edadesBeneficiarios`;
            return new Promise((resolve, reject) => {
                axios.post(url, edadesBeneficiarios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_EDADES_BENEFICIARIOS,
                        payload: response
                    })
                }).catch(error => {
                    console.log('ERROR=>',error)
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: AGREGAR_APOYOS_ERROR,
                payload: true
            })
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
        const {activo, _links:{edadesBeneficiarios:{href}}}=idEdadesBeneficiarios
        const act = !activo
        idEdadesBeneficiarios.activo = act
        try {
            const result = await axiosPostHetoas(href, idEdadesBeneficiarios, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_EDADES_BENEFICIARIOS,
                payload: result,
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

     /**
     * obtener tipos de apoyo
     */
      const getByIDBeneficiarios= async url => {
        try {
            const result = await axiosGetHetoas(url);
            dispatch({
                type: GET_EDADES_BENEFICIARIOS_BY_ID,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EdadesBeneficiariosContext.Provider
            value={{
                edadesBeneficiariosList: state.edadesBeneficiariosList,
                edadesBeneficiario:state.edadesBeneficiario,
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
                changePage,
                getByIDBeneficiarios
            }}
        >
            {props.children}
        </EdadesBeneficiariosContext.Provider>
    )
}