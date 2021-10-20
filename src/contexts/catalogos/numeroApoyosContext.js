import React, { createContext, useReducer } from 'react';
import NumeroApoyosReducer from 'reducers/Catalogos/NumeroApoyosReducer';
import axios from "axios";
import {
    GET_NUMERO_APOYOS, REGISTRAR_NUMERO_APOYOS, MODIFICAR_NUMERO_APOYOS, ELIMINAR_NUMERO_APOYOS,
    AGREGAR_NUMERO_APOYOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;
export const NumeroApoyosContext = createContext();

export const NumeroApoyosContextProvider = props => {
    const initialState = {
        numeroApoyosList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(NumeroApoyosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getNumeroApoyos = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`numeroApoyos?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.numeroApoyos);
            dispatch({
                type: GET_NUMERO_APOYOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {numeroApoyos} numeroApoyos 
     */
    const registrarNumeroApoyos = async numeroApoyos => {

        try {
            const url = `${baseUrl}numeroApoyos`;
            return new Promise((resolve, reject) => {
                axios.post(url, numeroApoyos, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_NUMERO_APOYOS,
                        payload: response
                    })
                }).catch(error => {
                    console.log('ERROR=>',error)
                    console.log('ERRRO2=>',error.response.data.cause)
                    console.log('ERRRO2=>',error.response.data.message)
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: AGREGAR_NUMERO_APOYOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {numeroApoyos} numeroApoyos 
     */
    const actualizarNumeroApoyos = async numeroApoyos => {
        const { noapoyo, boactivo, _links: { ct_NumeroApoyos: { href } } } = numeroApoyos;

        let numeroApoyosEnviar = {
            noapoyo,
            boactivo
        };

        console.log(numeroApoyosEnviar);
        try {
            const result = await axiosPostHetoas(href, numeroApoyos, 'PUT');
            dispatch({
                type: MODIFICAR_NUMERO_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarNumeroApoyos = async idNumeroApoyos => {

  
        const { activo, boactivo, _links: { ct_NumeroApoyos: { href } } } = idNumeroApoyos;
        const act = !activo 
        idNumeroApoyos.activo = act
        
        try {
            const result = await axiosPostHetoas(href, idNumeroApoyos, 'PUT');
            dispatch({
                type: MODIFICAR_NUMERO_APOYOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }
    //Paginacion
    const changePage = async (pages) => {  
        try {
            dispatch(changePageNumber(pages))
        } catch (error) {            
            throw error;
        }
    }

    const changePageSizes = async (sizes) => {
        try {
            dispatch(changePageSize(sizes))        
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

    const getNumeroApoyosByParametros = async (search) => {
        try {
           
            const result = await axiosGet(`numeroApoyos/search/findByNoapoyoContaining?noapoyo=${search}`);            
            dispatch({
                type: GET_NUMERO_APOYOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NumeroApoyosContext.Provider
            value={{
                numeroApoyosList: state.numeroApoyosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getNumeroApoyos,
                registrarNumeroApoyos,
                actualizarNumeroApoyos,
                eliminarNumeroApoyos,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getNumeroApoyosByParametros
            }}
        >
            {props.children}
        </NumeroApoyosContext.Provider>
    )
}