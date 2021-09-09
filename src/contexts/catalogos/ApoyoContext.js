import React, { createContext, useReducer } from 'react';
import ApoyoReducer from 'reducers/Catalogos/ApoyoReducer';

import Axios from 'axios';

import { GET_APOYOS, REGISTRAR_APOYOS, ELIMINAR_APOYOS, MODIFICAR_APOYOS } from 'types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';


export const ApoyoContext = createContext();

export const ApoyoContextProvider = props => {

    const initialState = {
        apoyosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(ApoyoReducer, initialState);

    const getApoyos = async () => {

        try {
            const resultado = await axiosGet('tipoApoyoOverride');
            console.log(resultado);
            dispatch({
                type: GET_APOYOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarApoyo = async apoyo => {
        try {
            console.log(apoyo);
            const resultado = await axiosPost('tipoApoyoOverride', apoyo);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_APOYOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }



    const actualizarApoyo = async apoyo => {
        console.log(apoyo);
        try {
            const resultado = await axiosPostHetoas('tipoApoyoOverride', apoyo, 'PUT');
            dispatch({
                type: MODIFICAR_APOYOS,
                payload: resultado,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarApoyo = async idApoyo => {
        try {

            await axiosDeleteTipo(`tipoApoyoOverride/${idApoyo}`);
            dispatch({
                type: ELIMINAR_APOYOS,
                payload: idApoyo
            })

        } catch (error) {

            console.log(error);
        }
    }


    return (
        <ApoyoContext.Provider
            value={{
                apoyosList: state.apoyosList,
                getApoyos,
                registrarApoyo,
                actualizarApoyo,
                eliminarApoyo

            }}
        >
            {props.children}
        </ApoyoContext.Provider>
    )
}