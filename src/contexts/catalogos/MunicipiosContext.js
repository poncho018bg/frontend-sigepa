import React, { createContext, useReducer } from 'react';
import MunicipiosReducer from 'reducers/Catalogos/MunicipiosReducer';

import Axios from 'axios';

import { GET_MUNICIPIOS, REGISTRAR_MUNICIPIOS, ELIMINAR_MUNICIPIOS, MODIFICAR_MUNICIPIOS, GET_MUNICIPIO } from 'types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';
import { axiosGetHetoas } from 'helpers/axios';




export const MunicipiosContext = createContext();

export const MunicipiosContextProvider = props => {

    const initialState = {
        municipiosList: [],
        municipio: null,
        clienteActual: null
    }

    const [state, dispatch] = useReducer(MunicipiosReducer, initialState);


    const getMunicipios = async () => {

        try {
            const resultado = await axiosGet('municipios');
            //   console.log(resultado);
            console.log(resultado._embedded.municipios);
            dispatch({
                type: GET_MUNICIPIOS,
                payload: resultado._embedded.municipios
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
        }
    }


    const actualizarMunicipios = async municipio => {
        console.log(municipio);
        const { id, dsclavemunicipio, dsmunicipio, activo, estadoId, _links: { municipios: { href } } } = municipio;
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

    return (
        <MunicipiosContext.Provider
            value={{
                municipiosList: state.municipiosList,
                municipio: state.municipio,
                getMunicipios,
                getMunicipioByIdHetoas,
                registrarMunicipios,
                eliminarMunicipio,
                actualizarMunicipios

            }}
        >
            {props.children}
        </MunicipiosContext.Provider>
    )

}