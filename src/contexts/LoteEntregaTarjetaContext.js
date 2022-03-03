import React, { createContext, useReducer } from 'react';
import LoteEntregaTarjetaReducer from 'reducers/LoteEntregaTarjetaReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_LOTE_ENTREGA_TARJETAS,
    REGISTRAR_LOTE_ENTREGA_TARJETAS,
    ELIMINAR_LOTE_ENTREGA_TARJETAS,
    MODIFICAR_LOTE_ENTREGA_TARJETAS,
    LOTE_ENTREGA_TARJETAS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';




export const LoteEntregaTarjetaContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const LoteEntregaTarjetaContextProvider = props => {

    const initialState = {
        lotesEntregaTarjetaList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(LoteEntregaTarjetaReducer, initialState);


    const getLoteEntregaTarjeta = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`loteEntregaEarjetas?page=${page}&size=${size}`);
            dispatch({
                type: GET_LOTE_ENTREGA_TARJETAS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarLoteEntregaTarjeta = async loteEntregaEarjetas => {

        try {
            const url = `${baseUrlPublico}loteEntregaEarjetas`;
            return new Promise((resolve, reject) => {
                axios.post(url, loteEntregaEarjetas, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_LOTE_ENTREGA_TARJETAS,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: LOTE_ENTREGA_TARJETAS_ERROR,
                payload: true
            })
        }
    }

    const actualizarLoteEntregaTarjeta = async loteEntregaEarjetasw => {
        try {
          
            const { _links: { loteEntregaEarjetas: { href } } } = loteEntregaEarjetasw;
            const resultado = await axiosPostHetoas(href, loteEntregaEarjetasw, 'PUT');  
            
            dispatch({
                type: MODIFICAR_LOTE_ENTREGA_TARJETAS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarLoteEntregaTarjeta = async loteEntregaEarjetas => {
        const { activo, _links: { loteEntregaEarjetas: { href } } } = loteEntregaEarjetas
        const act = !activo
        loteEntregaEarjetas.activo = act
        try {
            const result = await axiosPostHetoas(href, loteEntregaEarjetas, 'PUT');
            dispatch({
                type: ELIMINAR_LOTE_ENTREGA_TARJETAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getLoteEntregaTarjetaByParametros = async (search) => {
        try {            
            const result = await axiosGet(`loteEntregaEarjetas/search/findByDsclaveeventoContaining?dsclaveevento=${search}`);            
            dispatch({
                type: GET_LOTE_ENTREGA_TARJETAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getLoteEntregaTarjetaAll = async () => {

        try {            
            const result = await axiosGet(`loteEntregaEarjetas/search/findByActivoTrue`);            
            dispatch({
                type: GET_LOTE_ENTREGA_TARJETAS,
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
        <LoteEntregaTarjetaContext.Provider
            value={{
                lotesEntregaTarjetaList: state.lotesEntregaTarjetaList,
                getLoteEntregaTarjeta,
                registrarLoteEntregaTarjeta,
                actualizarLoteEntregaTarjeta,
                eliminarLoteEntregaTarjeta,
                getLoteEntregaTarjetaByParametros,
                getLoteEntregaTarjetaAll,
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
        </LoteEntregaTarjetaContext.Provider>
    )

}