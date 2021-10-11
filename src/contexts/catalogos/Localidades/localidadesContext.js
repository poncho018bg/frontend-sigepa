import React, { createContext, useReducer } from 'react';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import {
    GET_LOCALIDADES,
    REGISTRAR_LOCALIDADES,
    ELIMINAR_LOCALIDADES,
    MODIFICAR_LOCALIDADES,
    AGREGAR_PROGRAMA_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
    GET_LOCALIDADES_BY_ID
} from 'types/actionTypes';

import LocalidadesReducer from 'reducers/Catalogos/Localidades/LocalidadesReducer';
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;



export const LocalidadesContext = createContext();

export const LocalidadesContextProvider = props => {
    const initialState = {
        localidadesList: [],
        localidad: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(LocalidadesReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`localidades?page=${page}&size=${size}`);
            dispatch({
                type: GET_LOCALIDADES,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrar = async localidades => {

        try {
            //const resultado = await axiosPost('localidades', localidades);

            const url = `${baseUrl}localidades`;
            return new Promise((resolve, reject) => {
                axios.post(url, localidades, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_LOCALIDADES,
                        payload: response
                    })
                }).catch(error => {
                    reject(error);
                });
            });

            /* dispatch({
                 type: REGISTRAR_LOCALIDADES,
                 payload: resultado
             })*/
        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_PROGRAMA_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar = async (valores) => {
        console.log('actualizando objeto 1', valores);
        
       
        const {
            _links: { localidades: { href } }
        } = valores;

        valores.idMunicipio = `/${valores.municipio_id}`
        valores.municipios = `/${valores.municipio_id}`

        console.log('actualizando objeto 2', href);

        return new Promise((resolve, reject) => {
            axios.put(href, valores, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_LOCALIDADES,
                    payload: response
                })
            }).catch(error => {
                reject(error);
            });
        });
    }

    const eliminar = async (valores) => {

        const {
            activo,
            dsclavelocalidad,
            dscodigopostal,
            dsidlocalidad,
            dslocalidad,
            id,
            municipio_id,

            _links: { localidades: { href } },
            _links: { municipios: { hrefm } }
        } = valores;
        const act = activo === true ? false : true;


        let localidad = {
            dsidlocalidad,
            dsclavelocalidad,
            id,
            dslocalidad,
            dscodigopostal,
            activo: act,
            municipios: `/${municipio_id}`

        }


        try {
            const result = await axiosPostHetoas(href, localidad, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: MODIFICAR_LOCALIDADES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    //Paginacion

    const changePage = async (page) => {
        console.log(page);

        dispatch(changePageNumber(page))
        try {
            get();
        } catch (error) {
            // console.log(error);
            //dispatch( idiomaAddedError() )
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


    const getByID = async id => {
        try {
            const result = await axiosGet(`localidades/${id}`);
            dispatch({
                type: GET_LOCALIDADES_BY_ID,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <LocalidadesContext.Provider
            value={{
                localidadesList: state.localidadesList,
                localidad: state.localidad,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                get,
                registrar,
                actualizar,
                eliminar,
                changePageNumber,
                changePageSize,
                changePage,
                getByID
            }}
        >
            {props.children}
        </LocalidadesContext.Provider>
    )
}