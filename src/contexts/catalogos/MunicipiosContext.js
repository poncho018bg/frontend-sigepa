import React, { createContext, useReducer } from 'react';
import MunicipiosReducer from 'reducers/Catalogos/MunicipiosReducer';

import { GET_MUNICIPIOS, REGISTRAR_MUNICIPIOS, 
    ELIMINAR_MUNICIPIOS, MODIFICAR_MUNICIPIOS, GET_MUNICIPIO,GET_MUNICIPIOS_ID } from 'types/actionTypes';
import { axiosGet,axiosPost ,axiosDeleteTipo,axiosPostHetoas,axiosGetHetoas} from 'helpers/axios';




export const MunicipiosContext = createContext();

export const MunicipiosContextProvider = props => {

    const initialState = {
        municipiosList: [],
        municipio: null,
        clienteActual: null,
        municipiosListId: [],
    }

    const [state, dispatch] = useReducer(MunicipiosReducer, initialState);


    const getMunicipios = async () => {

        try {
            const resultado = await axiosGet('municipios');
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
        const {  dsclavemunicipio, dsmunicipio, activo, estadoId, _links: { municipios: { href } } } = municipio;
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

    return (
        <MunicipiosContext.Provider
            value={{
                municipiosList: state.municipiosList,
                municipio: state.municipio,
                municipiosListId: state.municipiosListId,
                getMunicipios,
                getMunicipioByIdHetoas,
                registrarMunicipios,
                eliminarMunicipio,
                actualizarMunicipios,
                getMunicipiosId

            }}
        >
            {props.children}
        </MunicipiosContext.Provider>
    )

}