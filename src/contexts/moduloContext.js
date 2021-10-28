import React, { createContext, useReducer } from 'react';
import ModuloReducer from '../reducers/ModuloReducer';
import axios from "axios";
import {
    GET_MODULOS, REGISTRAR_MODULO, ELIMINAR_MODULO, MODIFICAR_MODULO,
    AGREGAR_MODULO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from '../types/actionTypes';
import { axiosGet,  axiosPostHetoas } from 'helpers/axios';


const baseUrl = process.env.REACT_APP_API_URL;
export const ModuloContext = createContext();

export const ModuloContextProvider = props => {

    const initialState = {
        moduloList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(ModuloReducer, initialState);

    const getModulos = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`modulos?page=${page}&size=${size}`);
            console.log(resultado._embedded.modulos);
            dispatch({
                type: GET_MODULOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarModulos = async modulo => {
        try {
            const url = `${baseUrl}modulos`;
            return new Promise((resolve, reject) => {
                axios.post(url, modulo, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_MODULO,
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
                type: AGREGAR_MODULO_ERROR,
                payload: true
            })
        }
    }

    const actualizarModulo = async modulo => {

        const { dsmodulo, boactivo, _links: { modulos: { href } } } = modulo;

        let moduloEnviar = {
            dsmodulo,
            'usuarioCreacionId': `${process.env.REACT_APP_API_URL}/usuario/${sessionStorage.getItem('idUSuario')}`,
            boactivo,
            'SubModulos': []
        }
        return new Promise((resolve, reject) => {
            axios.put(href, moduloEnviar, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_MODULO,
                    payload: response.data
                })
            }).catch(error => {
                reject(error);
            });
        });
    }

    const eliminarModulo = async modulo => {
        const { activo, _links: { modulos: { href } } } = modulo;
        console.log('modulomodulo', modulo)
        const act = !activo
        modulo.activo = act
        modulo.subModulos = []
        modulo.usuarioCreacionId = `${process.env.REACT_APP_API_URL}/usuario/${sessionStorage.getItem('idUSuario')}`

        try {
            const resultado = await axiosPostHetoas(href, modulo, 'PUT');

            dispatch({
                type: ELIMINAR_MODULO,
                payload: resultado,
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

    const getModulosParametros = async (search) => {

        try {           
            const resultado = await axiosGet(`modulos/search/findByDsmoduloContaining?dsmodulo=${search}`);            
            dispatch({
                type: GET_MODULOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ModuloContext.Provider
            value={{
                moduloList: state.moduloList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getModulos,
                registrarModulos,
                actualizarModulo,
                eliminarModulo,
                changePageNumber,
                changePageSize,
                changePageSizes,
                changePage,
                getModulosParametros

            }}
        >
            {props.children}
        </ModuloContext.Provider>
    )

}