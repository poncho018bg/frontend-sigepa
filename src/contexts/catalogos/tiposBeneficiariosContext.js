import React, { createContext, useReducer } from 'react';
import TiposBeneficiariosReducer from 'reducers/Catalogos/TiposBeneficiariosReducer';
import axios from "axios";
import {
    GET_TIPOS_BENEFICIARIOS, REGISTRAR_TIPOS_BENEFICIARIOS, ELIMINAR_TIPOS_BENEFICIARIOS, MODIFICAR_TIPOS_BENEFICIARIOS,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
    AGREGAR_TIPOS_BENEFICIARIOS_ERROR
} from "../../types/actionTypes";

import { axiosGet,   axiosPostHetoas } from 'helpers/axios';
const baseUrl = process.env.REACT_APP_API_URL;
export const TiposBeneficiariosContext = createContext();

export const TiposBeneficiariosContextProvider = props => {
    const initialState = {
        tiposBeneficiariosList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(TiposBeneficiariosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getTipoBeneficiarios = async () => {
        try {
            console.log("page size ---> ", page, size);
            const { page, size } = state;
            const result = await axiosGet(`tiposBeneficiarios?page=${page}&size=${size}`);
            console.log(result);
            console.log("tipoBeneficiarios --->", result._embedded.tiposBeneficiarios);
            dispatch({
                type: GET_TIPOS_BENEFICIARIOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getTipoBeneficiariosActivos = async () => {
        try {
            console.log("page size ---> ", page, size);
            const { page, size } = state;
            const result = await axiosGet(`tiposBeneficiarios/search/findByActivoTrue`);
            console.log(result);
            console.log("tipoBeneficiarios --->", result._embedded.tiposBeneficiarios);
            dispatch({
                type: GET_TIPOS_BENEFICIARIOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {tiposBeneficiarios} tiposBeneficiarios 
     */
    const registrarTiposBeneficiarios = async tiposBeneficiarios => {


        try {
            const url = `${baseUrl}tiposBeneficiarios`;
            return new Promise((resolve, reject) => {
                axios.post(url, tiposBeneficiarios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_TIPOS_BENEFICIARIOS,
                        payload: response
                    })
                }).catch(error => {
                    console.log('ERROR=>', error)
                    console.log('ERRRO2=>', error.response.data.cause)
                    console.log('ERRRO2=>', error.response.data.message)
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: AGREGAR_TIPOS_BENEFICIARIOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {tiposBeneficiarios} tiposBeneficiarios 
     */
    const actualizarTiposBeneficiarios = async tiposBeneficiarios => {
        const { _links: { ct_TiposBeneficiarios: { href } } } = tiposBeneficiarios;
        try {
            return new Promise((resolve, reject) => {
                axios.put(href, tiposBeneficiarios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: MODIFICAR_TIPOS_BENEFICIARIOS,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });
        } catch (error) {
            dispatch({
                type: AGREGAR_TIPOS_BENEFICIARIOS_ERROR,
                payload: true
            })
        }
    }

    const eliminarTiposBeneficiarios = async idTiposBeneficiarios => {

        const { activo, _links: { ct_TiposBeneficiarios: { href } } } = idTiposBeneficiarios;
        const act = !activo;
        idTiposBeneficiarios.activo = act
        try {
            const result = await axiosPostHetoas(href, idTiposBeneficiarios, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_TIPOS_BENEFICIARIOS,
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

    const getTipoBeneficiariosByParametros = async (search) => {
        try {
            
            const result = await axiosGet(`tiposBeneficiarios/search/findByDstipobeneficiarioContaining?dstipobeneficiario=${search}`);
           
            dispatch({
                type: GET_TIPOS_BENEFICIARIOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TiposBeneficiariosContext.Provider
            value={{
                tiposBeneficiariosList: state.tiposBeneficiariosList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getTipoBeneficiarios,
                registrarTiposBeneficiarios,
                actualizarTiposBeneficiarios,
                eliminarTiposBeneficiarios,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getTipoBeneficiariosByParametros,
                getTipoBeneficiariosActivos
            }}
        >
            {props.children}
        </TiposBeneficiariosContext.Provider>
    )
}