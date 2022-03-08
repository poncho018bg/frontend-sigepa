import React, { createContext, useReducer } from 'react';
import axios from "axios";

import { axiosGet,  axiosPostHetoas } from 'helpers/axios';
import CursosCapacitacionesReducer from 'reducers/Catalogos/CursosCapacitacionesReducer';
import {
    REGISTRAR_CURSOS_CAPACITACIONES, GET_CURSOS_CAPACITACIONES, ELIMINAR_CURSOS_CAPACITACIONES, MODIFICAR_CURSOS_CAPACITACIONES,
    AGREGAR_CURSOS_CAPACITACIONES_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


const baseUrl = process.env.REACT_APP_API_URL;
export const CursosCapacitacionesContext = createContext();

export const CursosCapacitacionesContextProvider = props => {
    const initialState = {
        cursosCapacitacionesList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(CursosCapacitacionesReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`cursosCapacitaciones?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.cursosCapacitaciones);
            dispatch({
                type: GET_CURSOS_CAPACITACIONES,
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
    const registrar = async cursosCapacitaciones => {

        try {
            const url = `${baseUrl}cursosCapacitaciones`;
            return new Promise((resolve, reject) => {
                axios.post(url, cursosCapacitaciones, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    console.log(response);
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_CURSOS_CAPACITACIONES,
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
                type: AGREGAR_CURSOS_CAPACITACIONES_ERROR,
                payload: true
            })
        }

    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar = async objetoActualizar => {
        console.log(objetoActualizar);
        const { dscurso, boactivo, _links: { cursosCapacitaciones: { href } } } = objetoActualizar;

        let objetoEnviar = {
            dscurso,
            boactivo
        };

        return new Promise((resolve, reject) => {
            axios.put(href, objetoEnviar, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_CURSOS_CAPACITACIONES,
                    payload: response.data
                })
            }).catch(error => {
                reject(error);
            });
        });

    }

    const eliminar = async cursosCapacitacionesw => {

        const {
            dscurso,
            id,
            fechaRegistro,
            activo,
            _links: { self: { href } },
        } = cursosCapacitacionesw;
        const act = activo === true ? false : true;


        let localidad = {
            dscurso,
            id,
            fechaRegistro,
            activo: act
        }
        console.log(cursosCapacitacionesw)


        try {
            const result = await axiosPostHetoas(href, localidad, 'PUT');            
            dispatch({
                type: ELIMINAR_CURSOS_CAPACITACIONES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }


    }

    //Paginacion
    const changePage = async (page) => {  
        try {
            dispatch(changePageNumber(page))
        } catch (error) {            
            throw error;
        }
    }

    const changePageSizes = async (size) => {
        try {
            dispatch(changePageSize(size))        
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

    const getByParametros = async (search) => {
        try {
            
            const result = await axiosGet(`cursosCapacitaciones/search/findByDscursoContaining?dscurso=${search}`);
            
            dispatch({
                type: GET_CURSOS_CAPACITACIONES,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CursosCapacitacionesContext.Provider
            value={{
                cursosCapacitacionesList: state.cursosCapacitacionesList,
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
                changePageSizes,
                changePage,
                getByParametros
            }}
        >
            {props.children}
        </CursosCapacitacionesContext.Provider>
    )
}