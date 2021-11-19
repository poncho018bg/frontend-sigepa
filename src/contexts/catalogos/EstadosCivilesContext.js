import React, { createContext, useReducer } from 'react';
import EstadosCivilesReducer from 'reducers/Catalogos/EstadosCivilesReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_ESTADOS_CIVIL,
    REGISTRAR_ESTADOS_CIVIL,
    ELIMINAR_ESTADOS_CIVIL,
    MODIFICAR_ESTADOS_CIVIL,
    ESTADOS_CIVIL_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export const EstadosCivilesContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const EstadosCivilesContextProvider = props => {

    const initialState = {
        estadoCivilList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(EstadosCivilesReducer, initialState);


    const getEstadosCiviles = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`estadosCiviles?page=${page}&size=${size}`);
            dispatch({
                type: GET_ESTADOS_CIVIL,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarEstadosCiviles = async estadosCiviles => {

        try {
            const url = `${baseUrlPublico}estadosCiviles`;
            return new Promise((resolve, reject) => {
                axios.post(url, estadosCiviles, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_ESTADOS_CIVIL,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: ESTADOS_CIVIL_ERROR,
                payload: true
            })
        }
    }

    const actualizarEstadosCiviles = async estadosCivilesw => {
        try {
            const { _links: { estadosCiviles: { href } } } = estadosCivilesw;
            const resultado = await axiosPostHetoas(href, estadosCivilesw, 'PUT');

            dispatch({
                type: MODIFICAR_ESTADOS_CIVIL,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarEstadosCiviles = async estadosCiviles => {
        const { activo, _links: { estadosCiviles: { href } } } = estadosCiviles
        const act = !activo
        estadosCiviles.activo = act
        try {
            const result = await axiosPostHetoas(href, estadosCiviles, 'PUT');
            dispatch({
                type: ELIMINAR_ESTADOS_CIVIL,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getEstadoCivilByParametros = async (search) => {
        try {

            const result = await axiosGet(`estadosCiviles/search/findByDsestadocivilContaining?dsestadocivil=${search}`);

            dispatch({
                type: GET_ESTADOS_CIVIL,
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
        <EstadosCivilesContext.Provider
            value={{
                estadoCivilList: state.estadoCivilList,
                getEstadosCiviles,
                registrarEstadosCiviles,
                actualizarEstadosCiviles,
                eliminarEstadosCiviles,
                getEstadoCivilByParametros,

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
        </EstadosCivilesContext.Provider>
    )

}