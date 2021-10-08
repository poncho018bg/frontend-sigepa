import React, { createContext, useReducer } from 'react';
import RegionMunicipiosReducer from 'reducers/Catalogos/RegionMunicipiosReducer';

import { GET_REGIONMUNICIPIOS, REGISTRAR_REGIONMUNICIPIOS, ELIMINAR_REGIONMUNICIPIOS, MODIFICAR_REGIONMUNICIPIOS } from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';



const baseUrl = process.env.REACT_APP_API_URL;
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

    const getMunicipiosEstados = async idEstado => {

        try {
            const resultado = await axiosGet(`municipiosRegion/municipiosEstado/${idEstado}`);
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
        try {
            const resultado = await axiosPost('municipiosRegion', regionMunicipio);
            dispatch({
                type: MODIFICAR_REGIONMUNICIPIOS,
                payload: resultado,
            })

        } catch (error) {


            console.log(error);
        }


    }

    const eliminarRegionMunicipios = async regionMunicipio => {
        const { idRegion, activo } = regionMunicipio
        const act = activo === true ? false : true;
        let regionMunicipioEnviar = {
            id: idRegion,
            activo: act,
        };
        regionMunicipio.activo = act

        const url = `${baseUrl}municipiosRegion/${idRegion}`;
        console.log(url)
        try {
            const result = await axiosPostHetoas(url, regionMunicipioEnviar, 'PUT');
            dispatch({
                type: ELIMINAR_REGIONMUNICIPIOS,
                payload: result,
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