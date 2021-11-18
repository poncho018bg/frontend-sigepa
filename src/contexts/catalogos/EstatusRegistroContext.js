import React, { createContext, useReducer } from 'react';
import EstatusRegistroReducer from 'reducers/Catalogos/EstatusRegistroReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_ESTATUS_REGISTRO,
    REGISTRAR_ESTATUS_REGISTRO,
    ELIMINAR_ESTATUS_REGISTRO,
    MODIFICAR_ESTATUS_REGISTRO,
    ESTATUS_REGISTRO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';

export const EstatusRegistroContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const EstatusRegistroContextProvider = props => {

    const initialState = {
        estatusRegistroList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(EstatusRegistroReducer, initialState);


    const getEstatusRegistro = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`estatusRegistros?page=${page}&size=${size}`);
            dispatch({
                type: GET_ESTATUS_REGISTRO,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarEstatusRegistros = async estatusRegistros => {

        try {
            const url = `${baseUrlPublico}estatusRegistros`;
            return new Promise((resolve, reject) => {
                axios.post(url, estatusRegistros, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_ESTATUS_REGISTRO,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: ESTATUS_REGISTRO_ERROR,
                payload: true
            })
        }
    }

    const actualizarEstatusRegistros = async estatusRegistrosw => {
        try {
            const { _links: { estatusRegistros: { href } } } = estatusRegistrosw;
            const resultado = await axiosPostHetoas(href, estatusRegistrosw, 'PUT');           

            dispatch({
                type: MODIFICAR_ESTATUS_REGISTRO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarEstatusRegistros = async estatusRegistros => {
        console.log('xxestatusRegistros',estatusRegistros)
        const { activo, _links: { estatusRegistros: { href } } } = estatusRegistros
        const act = !activo
        estatusRegistros.activo = act
        try {
            const result = await axiosPostHetoas(href, estatusRegistros, 'PUT');
            dispatch({
                type: ELIMINAR_ESTATUS_REGISTRO,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getEstatusRegistrosByParametros = async (search) => {
        try {
            
            const result = await axiosGet(`estatusRegistros/search/findByDsestatusregistroContaining?dsestatusregistro=${search}`);
            
            dispatch({
                type: GET_ESTATUS_REGISTRO,
                payload: result
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
            console.err(error);
            throw error;
        }
    }

    const changePageSizes = async (sizes) => {
        try {
            dispatch(changePageSize(sizes))
        } catch (error) {
            console.err(error);
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
        <EstatusRegistroContext.Provider
            value={{
                estatusRegistroList: state.estatusRegistroList,
                getEstatusRegistro,
                registrarEstatusRegistros,
                actualizarEstatusRegistros,
                eliminarEstatusRegistros,
                getEstatusRegistrosByParametros,

                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
            }}
        >
            {props.children}
        </EstatusRegistroContext.Provider>
    )

}