import React, { createContext, useReducer } from 'react';
import RegionesReducer from 'reducers/Catalogos/RegionesReducer';
import { axiosGet, axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_REGIONES,
    REGISTRAR_REGIONES,
    ELIMINAR_REGIONES,
    MODIFICAR_REGIONES,
    REGIONES_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';




export const RegionesContext = createContext();

const baseUrl = process.env.REACT_APP_API_URL

export const RegionesContextProvider = props => {

    const initialState = {
        regionesList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(RegionesReducer, initialState);


    const getRegiones = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`regiones?page=${page}&size=${size}`);
            dispatch({
                type: GET_REGIONES,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getRegionesAll = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`regiones?page=0&size=10000`);
            dispatch({
                type: GET_REGIONES,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarRegiones = async identificacionesOficiales => {

        try {
            const url = `${baseUrl}regiones`;
            return new Promise((resolve, reject) => {
                axios.post(url, identificacionesOficiales, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_REGIONES,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: REGIONES_ERROR,
                payload: true
            })
        }
    }

    const actualizarRegiones = async identificacionesOficialesw => {
        try {
          
            const { _links: { identificacionesOficiales: { href } } } = identificacionesOficialesw;
            const resultado = await axiosPostHetoas(href, identificacionesOficialesw, 'PUT');  
            
            dispatch({
                type: MODIFICAR_REGIONES,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarRegiones = async identificacionesOficiales => {
        const { activo, _links: { identificacionesOficiales: { href } } } = identificacionesOficiales
        const act = !activo
        identificacionesOficiales.activo = act
        try {
            const result = await axiosPostHetoas(href, identificacionesOficiales, 'PUT');
            dispatch({
                type: ELIMINAR_REGIONES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getRegionesByParametros = async (search) => {
        try {            
            const result = await axiosGet(`regiones/search/findByDsidentificacionContaining?dsidentificacion=${search}`);            
            dispatch({
                type: GET_REGIONES,
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
        <RegionesContext.Provider
            value={{
                regionesList: state.regionesList,
                getRegiones,
                getRegionesAll,
                registrarRegiones,
                actualizarRegiones,
                eliminarRegiones,
                getRegionesByParametros,

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
        </RegionesContext.Provider>
    )

}