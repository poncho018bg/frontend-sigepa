import React, { createContext, useReducer } from 'react';
import PuntosEntregaReducer from 'reducers/Catalogos/PuntosEntregaReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_PUNTOS_ENTREGA,
    REGISTRAR_PUNTOS_ENTREGA,
    ELIMINAR_PUNTOS_ENTREGA,
    MODIFICAR_PUNTOS_ENTREGA,
    PUNTOS_ENTREGA_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
    GET_TARJETAS_PARA_ENTREGA,
    REGISTRAR_LOTES_ENTREGA
} from 'types/actionTypes';




export const PuntosEntregaContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL
const UserService = sessionStorage.getItem('token')
export const PuntosEntregaContextProvider = props => {

    const initialState = {
        puntosEntregaList: [],
        terjetasEntregaList:[],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(PuntosEntregaReducer, initialState);


    const getPuntosEntrega = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`puntoEntregas?page=${page}&size=${size}`);
            dispatch({
                type: GET_PUNTOS_ENTREGA,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarPuntosEntrega = async puntoEntregas => {

        try {
            const url = `${baseUrlPublico}puntoEntregas`;
            return new Promise((resolve, reject) => {
                axios.post(url, puntoEntregas, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_PUNTOS_ENTREGA,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: PUNTOS_ENTREGA_ERROR,
                payload: true
            })
        }
    }

    const actualizarPuntosEntrega = async puntoEntregasw => {
        try {
          
            const { _links: { puntoEntregas: { href } } } = puntoEntregasw;
            const resultado = await axiosPostHetoas(href, puntoEntregasw, 'PUT');  
            
            dispatch({
                type: MODIFICAR_PUNTOS_ENTREGA,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarPuntosEntrega = async puntoEntregas => {
        const { activo, _links: { puntoEntregas: { href } } } = puntoEntregas
        const act = !activo
        puntoEntregas.activo = act
        try {
            const result = await axiosPostHetoas(href, puntoEntregas, 'PUT');
            dispatch({
                type: ELIMINAR_PUNTOS_ENTREGA,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getPuntosEntregaByParametros = async (search) => {
        try {            
            const result = await axiosGet(`puntoEntregas/search/findByDspuntoentregaContaining?dspuntoentrega=${search}`);            
            dispatch({
                type: GET_PUNTOS_ENTREGA,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getTarjetasParaLotes = async (lstmunicipios) => {
 

        try {
            const url = `${baseUrlPublico}lotes/tarjetasparalotes`;
            return new Promise((resolve, reject) => {
                axios.post(url, lstmunicipios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json', Authorization: 'Bearer ' +  sessionStorage.getItem('token')}
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: GET_TARJETAS_PARA_ENTREGA,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: PUNTOS_ENTREGA_ERROR,
                payload: true
            })
        }
    }


    const registrarLotesEntrega = async lotesEntregas => {

        try {
            const url = `${baseUrlPublico}lotes/guardarlotes`;
            return new Promise((resolve, reject) => {
                axios.post(url, lotesEntregas, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json',Authorization: 'Bearer ' + UserService }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_LOTES_ENTREGA,
                        payload: response?.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: PUNTOS_ENTREGA_ERROR,
                payload: true
            })
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
        <PuntosEntregaContext.Provider
            value={{
                puntosEntregaList: state.puntosEntregaList,
                terjetasEntregaList:state.terjetasEntregaList,
                getPuntosEntrega,
                registrarPuntosEntrega,
                actualizarPuntosEntrega,
                eliminarPuntosEntrega,
                getPuntosEntregaByParametros,
                getTarjetasParaLotes,
                registrarLotesEntrega,

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
        </PuntosEntregaContext.Provider>
    )

}