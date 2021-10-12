import React, { createContext, useReducer } from 'react';
import MunicipiosReducer from 'reducers/Catalogos/MunicipiosReducer';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas, axiosGetHetoas } from 'helpers/axios';
import {
    GET_MUNICIPIOS, REGISTRAR_MUNICIPIOS, ELIMINAR_MUNICIPIOS, MODIFICAR_MUNICIPIOS, GET_MUNICIPIO,
    AGREGAR_MUNICIPIOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA, GET_MUNICIPIOS_ID
} from 'types/actionTypes';



export const MunicipiosContext = createContext();

export const MunicipiosContextProvider = props => {

    const initialState = {
        municipiosList: [],
        municipio: null,
        clienteActual: null,
        municipiosListId: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(MunicipiosReducer, initialState);


    const getMunicipios = async () => {

        try {
            const { page, size } = state;
            const resultado = await axiosGet(`municipios?page=${page}&size=${size}`);
            console.log(resultado._embedded.municipios);
            dispatch({
                type: GET_MUNICIPIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getMunicipioByIdHetoas = async endpoint => {

        try {
            const resultado = await axiosGetHetoas(endpoint);
            console.log(resultado);
            dispatch({
                type: GET_MUNICIPIO,
                payload: resultado
            })
        } catch (error) {
            console.log(error);

        }
    }


    const registrarMunicipios = async municipio => {
        try {
            municipio.regiosnes = [];
            municipio.crcCoberturaapoyos = []
            const municp = `/${municipio.estadoId}`
            municipio.estadoId = municp
            console.log(municipio);
            const resultado = await axiosPost('municipios', municipio);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_MUNICIPIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_MUNICIPIOS_ERROR,
                payload: true
            })
        }
    }


    const actualizarMunicipios = async municipio => {
        console.log(municipio);
        const { dsclavemunicipio, dsmunicipio, activo, estadoId, _links: { municipios: { href } } } = municipio;
        let municipioEnviar = {
            dsclavemunicipio,
            dsmunicipio,
            activo,
            Municipios: [],
            estadoId: `/${estadoId}`,
            regiosnes: [],
            crcCoberturaapoyos: [],
            _links: {
                1: {
                    href: `/${estadoId}`

                }
            }
        }
        try {
            const resultado = await axiosPostHetoas(href, municipioEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_MUNICIPIOS,
                payload: resultado,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarMunicipio = async idMunicipio => {
        try {

            await axiosDeleteTipo(`municipios/${idMunicipio}`);
            dispatch({
                type: ELIMINAR_MUNICIPIOS,
                payload: idMunicipio
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
            getMunicipios();
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


    const getMunicipiosId = async () => {

        try {
            const resultado = await axiosGet('municipiosRegion/municipiosEstado/a3de85a7-6c23-46a4-847b-d79b3a90963d');
            dispatch({
                type: GET_MUNICIPIOS_ID,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    const getMunicipioEstado = async idEstado => {
        try {
            const resultado = await axiosGet(`municipiosRegion/municipiosEstado/${idEstado}`);
            console.log("resultado de la consulta ", resultado);
            dispatch({
                type: GET_MUNICIPIOS_ID,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    return (
        <MunicipiosContext.Provider
            value={{
                municipiosList: state.municipiosList,
                municipio: state.municipio,
                municipiosListId: state.municipiosListId,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getMunicipios,
                getMunicipioByIdHetoas,
                registrarMunicipios,
                eliminarMunicipio,
                actualizarMunicipios,
                getMunicipiosId,
                changePageNumber,
                changePageSize,
                changePage,
                getMunicipioEstado
            }}
        >
            {props.children}
        </MunicipiosContext.Provider>
    )

}