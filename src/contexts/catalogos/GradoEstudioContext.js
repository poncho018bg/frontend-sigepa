import React, { createContext, useReducer } from 'react';
import GradosEstudioReducer from 'reducers/Catalogos/GradosEstudioReducer';
import { axiosGet } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import axios from "axios";
import {
    GET_GRADO_ESTUDIOS,
    REGISTRAR_GRADO_ESTUDIOS,
    ELIMINAR_GRADO_ESTUDIOS,
    MODIFICAR_GRADO_ESTUDIOS,
    GRADO_ESTUDIOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';



export const GradoEstudioContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const GradoEstudioContextProvider = props => {

    const initialState = {
        gradoEstudiosList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(GradosEstudioReducer, initialState);


    const getGradoEstudio= async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`gradoEstudios?page=${page}&size=${size}`);
            dispatch({
                type: GET_GRADO_ESTUDIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarGradoEstudio = async gradoEstudios => {

        try {
            const url = `${baseUrlPublico}gradoEstudios`;
            return new Promise((resolve, reject) => {
                axios.post(url, gradoEstudios, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_GRADO_ESTUDIOS,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: GRADO_ESTUDIOS_ERROR,
                payload: true
            })
        }
    }

    const actualizarGradoEstudio = async gradoEstudiosw => {
        try {
                  
            const { _links: { gradoEstudios: { href } } } = gradoEstudiosw;
            const resultado = await axiosPostHetoas(href, gradoEstudiosw, 'PUT');  

            dispatch({
                type: MODIFICAR_GRADO_ESTUDIOS,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarGradoEstudio = async gradoEstudios => {
        const { activo, _links: { gradoEstudios: { href } } } = gradoEstudios
        const act = !activo
        gradoEstudios.activo = act
        try {
            const result = await axiosPostHetoas(href, gradoEstudios, 'PUT');
            dispatch({
                type: ELIMINAR_GRADO_ESTUDIOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getGradoEstudioyParametros = async (search) => {
        try {
            
            const result = await axiosGet(`gradoEstudios/search/findByDsgradoContaining?dsgrado=${search}`);
            
            dispatch({
                type: GET_GRADO_ESTUDIOS,
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
        <GradoEstudioContext.Provider
            value={{
                gradoEstudiosList: state.gradoEstudiosList,
                getGradoEstudio,
                registrarGradoEstudio,
                actualizarGradoEstudio,
                eliminarGradoEstudio,
                getGradoEstudioyParametros,

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
        </GradoEstudioContext.Provider>
    )

}