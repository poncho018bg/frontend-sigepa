import React, { createContext, useReducer } from 'react';
import FirmasReducer from 'reducers/Catalogos/FirmasReducer';
import axios from "axios";
import {
    GET_FIRMAS, REGISTRAR_FIRMAS, MODIFICAR_FIRMAS, ELIMINAR_FIRMAS, GET_PROGRAMAS,
    AGREGAR_FIRMAS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const FirmasContext = createContext();

export const FirmasContextProvider = props => {
    const initialState = {
        firmasList: [],
        programaList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(FirmasReducer, initialState);

    const getFirmas = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`firmas?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.firmas);
            dispatch({
                type: GET_FIRMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getProgramas = async () => {
        try {
            const result = await axiosGet('programas');
            console.log(result._embedded);
            console.log(result._embedded.programas);
            dispatch({
                type: GET_PROGRAMAS,
                payload: result._embedded.programas
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran las firmas para los programas
     * @param {firmas} firmas 
     */
    const registrarFirmas = async firmas => {



        try {
            const url = `${baseUrl}firmas`;
            return new Promise((resolve, reject) => {
                axios.post(url, firmas, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_FIRMAS,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_FIRMAS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {firmas} firmas 
     */
    const actualizarFirmas = async firmas => {
        const { id, dsautoriza, dspuesto, dscomentario, idPrograma, activo, _links: { firmas: { href } } } = firmas;

        let FirmasEnviar = {
            id: id,
            dsautoriza: dsautoriza,
            dspuesto: dspuesto,
            dscomentario: dscomentario,
            activo: activo
        };

        try {

            const result = await axiosPostHetoas(href, FirmasEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_FIRMAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarFirmas = async idfirmas => {

        const { activo, _links: { firmas: { href } } } = idfirmas;
        const act = !activo;
        idfirmas.activo = act;

        try {

            const result = await axiosPostHetoas(href, idfirmas, 'PUT');
            dispatch({
                type: ELIMINAR_FIRMAS,
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


    const getFirmasByParametros = async (search) => {
        try {
           
            const result = await axiosGet(`firmas/search/findByDsautorizaContaining?dsautoriza=${search}`);            
            dispatch({
                type: GET_FIRMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FirmasContext.Provider
            value={{
                firmasList: state.firmasList,
                programaList: state.programaList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getFirmas,
                getProgramas,
                registrarFirmas,
                actualizarFirmas,
                eliminarFirmas,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getFirmasByParametros
            }}
        >
            {props.children}
        </FirmasContext.Provider>
    )
}