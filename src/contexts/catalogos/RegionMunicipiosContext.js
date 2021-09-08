import React, { createContext, useReducer } from 'react';
import RegionMunicipiosReducer from 'reducers/Catalogos/RegionMunicipiosReducer';

import Axios from 'axios';

import { GET_REGIONMUNICIPIOS, REGISTRAR_REGIONMUNICIPIOS, ELIMINAR_REGIONMUNICIPIOS, MODIFICAR_REGIONMUNICIPIOS } from 'types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';


export const RegionMunicipiosContext = createContext();

export const RegionMunicipiosContextProvider = props => {

    const initialState = {
        regionList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(RegionMunicipiosReducer, initialState);

    const getRegionMunicipios = async () => {

        try {
            const resultado = await axiosGet('municipiosRegion');
            console.log(resultado);
            dispatch({
                type: GET_REGIONMUNICIPIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarRegionMunicipios = async regionMunicipio => {
        try {
            console.log(regionMunicipio);
            const resultado = await axiosPost('municipiosRegion', regionMunicipio);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_REGIONMUNICIPIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }



    const actualizarRegionMunicipios = async regionMunicipio => {
        console.log(regionMunicipio);
        // const { id, firstName, lastName, activo, _links: { person: { href } } } = regionMunicipio;
        // let personaEnviar = {
        //     firstName,
        //     lastName,
        //     activo
        // }
        try {
            //const resultado = await axiosPostHetoas(href, personaEnviar, 'PUT');
            const resultado = await axiosPost('municipiosRegion', regionMunicipio);

            dispatch({
                type: MODIFICAR_REGIONMUNICIPIOS,
                payload: resultado,
            })

        } catch (error) {


            console.log(error);
        }
    }

    const eliminarRegionMunicipios = async idRegionMunicipio => {
        try {

            await axiosDeleteTipo(`regiones/${idRegionMunicipio}`);
            dispatch({
                type: ELIMINAR_REGIONMUNICIPIOS,
                payload: idRegionMunicipio
            })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <RegionMunicipiosContext.Provider
            value={{
                regionList: state.regionList,
                getRegionMunicipios,
                registrarRegionMunicipios,
                eliminarRegionMunicipios,
                actualizarRegionMunicipios

            }}
        >
            {props.children}
        </RegionMunicipiosContext.Provider>
    )
}