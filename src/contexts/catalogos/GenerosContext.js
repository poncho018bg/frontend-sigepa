import React, { createContext, useReducer } from 'react';
import GenerosReducer from 'reducers/Catalogos/GenerosReducer';
import { axiosGet, axiosPut } from 'helpers/axiosPublico';
import { axiosPostHetoas } from 'helpers/axios';
import {
    GET_GENERO,
    REGISTRAR_GENERO,
    ELIMINAR_GENERO,
    MODIFICAR_GENERO,
    GENERO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';



export const GenerosContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const GenerosContextProvider = props => {

    const initialState = {
        generosList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(GenerosReducer, initialState);


    const getGeneros = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`generos?page=${page}&size=${size}`);
            dispatch({
                type: GET_GENERO,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarGeneros = async generos => {

        try {
            const url = `${baseUrlPublico}generos`;
            return new Promise((resolve, reject) => {
                axios.post(url, generos, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_GENERO,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: GENERO_ERROR,
                payload: true
            })
        }
    }

    const actualizarGeneros = async generos => {
        try {
            const resultado = await axiosPut('generos', generos);

            dispatch({
                type: MODIFICAR_GENERO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarGeneros = async generos => {
        const { activo, _links: { generos: { href } } } = generos
        const act = !activo
        generos.activo = act
        try {
            const result = await axiosPostHetoas(href, generos, 'PUT');
            dispatch({
                type: ELIMINAR_GENERO,
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
        <GenerosContext.Provider
            value={{
                generosList: state.generosList,
                getGeneros,
                registrarGeneros,
                actualizarGeneros,
                eliminarGeneros,


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
        </GenerosContext.Provider>
    )

}