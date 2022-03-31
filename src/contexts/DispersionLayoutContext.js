import React, { createContext, useReducer } from 'react';
import DispersionLayoutReducer from 'reducers/DispersionLayoutReducer';
import { axiosGet } from 'helpers/axiosPublico';
import axios from "axios";
import {
    GET_DISPERSION_LAYOUT,
    REGISTRAR_DISPERSION_LAYOUT,
    DISPERSION_LAYOUT_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';




export const DispersionLayoutContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const DispersionLayoutContextProvider = props => {

    const initialState = {
        dispersionLayouList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(DispersionLayoutReducer, initialState);


    const getDispersionLayout = async () => {

        try {            
            const resultado = await axiosGet(`dispersionTarjetas`);
            dispatch({
                type: GET_DISPERSION_LAYOUT,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarDispersionLayout = async dispersion => {

        try {
            const url = `${baseUrlPublico}dispersionTarjetas`;
            return new Promise((resolve, reject) => {
                axios.post(url, dispersion, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_DISPERSION_LAYOUT,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: DISPERSION_LAYOUT_ERROR,
                payload: true
            })
        }
    }




    const getDispersionLayoutByParametros = async (fecha) => {
        try {            
            const result = await axiosGet(`dispersionTarjetas/${fecha}`);            
            dispatch({
                type: GET_DISPERSION_LAYOUT,
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
        <DispersionLayoutContext.Provider
            value={{
                dispersionLayouList: state.dispersionLayouList,
                getDispersionLayout,
                registrarDispersionLayout,              
                getDispersionLayoutByParametros,
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
        </DispersionLayoutContext.Provider>
    )

}