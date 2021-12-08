import React, { createContext, useReducer } from 'react';
import TipoRequisitosReducer from 'reducers/Catalogos/TipoRequisitosReducer';
import { axiosGet,  axiosPostHetoas,  } from 'helpers/axios';

import axios from "axios";
import {
    GET_TIPO_REQUISITOS,
    REGISTRARc_TIPO_REQUISITOS,
    ELIMINAR_TIPO_REQUISITOS,
    MODIFICAR_TIPO_REQUISITOS,
    TIPO_REQUISITOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';




export const TipoRequisitosContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_URL

export const TipoRequisitosContextProvider = props => {

    const initialState = {
        tipoRequisitosList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(TipoRequisitosReducer, initialState);


    const getTipoRequisitos= async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`tipoRequisitos?page=${page}&size=${size}`);
            dispatch({
                type: GET_TIPO_REQUISITOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarTipoRequisitos = async gradoEstudios => {

        try {
            const url = `${baseUrlPublico}tipoRequisitos`;
            return new Promise((resolve, reject) => {
                axios.post(url, gradoEstudios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRARc_TIPO_REQUISITOS,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: TIPO_REQUISITOS_ERROR,
                payload: true
            })
        }
    }

    const actualizarTipoRequisitos = async tipoRequisitosw => {
        try {
                  
            const { _links: { tipoRequisitos: { href } } } = tipoRequisitosw;
            const resultado = await axiosPostHetoas(href, tipoRequisitosw, 'PUT');  

            dispatch({
                type: MODIFICAR_TIPO_REQUISITOS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTipoRequisitos = async tipoRequisitos => {
        const { activo, _links: { tipoRequisitos: { href } } } = tipoRequisitos
        const act = !activo
        tipoRequisitos.activo = act
        try {
            const result = await axiosPostHetoas(href, tipoRequisitos, 'PUT');
            dispatch({
                type: ELIMINAR_TIPO_REQUISITOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getTipoRequisitosyParametros = async (search) => {
        try {
            
            const result = await axiosGet(`tipoRequisitos/search/findByDstiporequisitoContaining?dstiporequisito=${search}`);
            
            dispatch({
                type: GET_GRADO_ESTUDIOS,
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
        <TipoRequisitosContext.Provider
            value={{
                tipoRequisitosList: state.tipoRequisitosList,
                getTipoRequisitos,
                registrarTipoRequisitos,
                actualizarTipoRequisitos,
                eliminarTipoRequisitos,
                getTipoRequisitosyParametros,

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
        </TipoRequisitosContext.Provider>
    )

}