import React, { createContext, useReducer } from 'react';
import IdentificacionesOficialesReducer from 'reducers/Catalogos/IdentificacionesOficialesReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_IDENTIFICACIONES_OFICIALES,
    REGISTRAR_IDENTIFICACIONES_OFICIALES,
    ELIMINAR_IDENTIFICACIONES_OFICIALES,
    MODIFICAR_IDENTIFICACIONES_OFICIALES,
    IDENTIFICACIONES_OFICIALES_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';



export const IdentificacionesOficialesContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const IdentificacionesOficialesContextProvider = props => {

    const initialState = {
        identificacionesOficialesList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(IdentificacionesOficialesReducer, initialState);


    const getIdentificacionesOficiales = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`identificacionesOficiales?page=${page}&size=${size}`);
            dispatch({
                type: GET_IDENTIFICACIONES_OFICIALES,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarIdentificacionesOficiales = async identificacionesOficiales => {

        try {
            const url = `${baseUrlPublico}identificacionesOficiales`;
            return new Promise((resolve, reject) => {
                axios.post(url, identificacionesOficiales, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_IDENTIFICACIONES_OFICIALES,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: IDENTIFICACIONES_OFICIALES_ERROR,
                payload: true
            })
        }
    }

    const actualizarIdentificacionesOficiales = async identificacionesOficialesw => {
        try {
          
            const { _links: { identificacionesOficiales: { href } } } = identificacionesOficialesw;
            const resultado = await axiosPostHetoas(href, identificacionesOficialesw, 'PUT');  
            
            dispatch({
                type: MODIFICAR_IDENTIFICACIONES_OFICIALES,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarIdentificacionesOficiales = async identificacionesOficiales => {
        const { activo, _links: { identificacionesOficiales: { href } } } = identificacionesOficiales
        const act = !activo
        identificacionesOficiales.activo = act
        try {
            const result = await axiosPostHetoas(href, identificacionesOficiales, 'PUT');
            dispatch({
                type: ELIMINAR_IDENTIFICACIONES_OFICIALES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getIdentificacionesOficialesByParametros = async (search) => {
        try {            
            const result = await axiosGet(`identificacionesOficiales/search/findByDsidentificacionContaining?dsidentificacion=${search}`);            
            dispatch({
                type: GET_IDENTIFICACIONES_OFICIALES,
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
        <IdentificacionesOficialesContext.Provider
            value={{
                identificacionesOficialesList: state.identificacionesOficialesList,
                getIdentificacionesOficiales,
                registrarIdentificacionesOficiales,
                actualizarIdentificacionesOficiales,
                eliminarIdentificacionesOficiales,
                getIdentificacionesOficialesByParametros,

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
        </IdentificacionesOficialesContext.Provider>
    )

}