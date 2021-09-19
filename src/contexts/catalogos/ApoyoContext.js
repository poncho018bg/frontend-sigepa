import React, { createContext, useReducer } from 'react';
import ApoyoReducer from 'reducers/Catalogos/ApoyoReducer';


import { GET_APOYOS, REGISTRAR_APOYOS, ELIMINAR_APOYOS, MODIFICAR_APOYOS } from 'types/actionTypes';
import { axiosGet,axiosPost,axiosDeleteTipo ,axiosPostHetoas} from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;

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
        console.log(`${baseUrl}tipoApoyoOverride`)
        try {
            const resultado = await axiosPostHetoas(`${baseUrl}tipoApoyoOverride`, apoyo, 'PUT');
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
            console.log('x=>',idApoyo)
            // axiosDeleteTipo(`tipoApoyoOverride/${idApoyo}`);
             await axiosPostHetoas(`${baseUrl}tipoApoyoOverride`, idApoyo, 'DELETE')
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