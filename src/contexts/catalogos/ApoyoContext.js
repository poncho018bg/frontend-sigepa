import React, { createContext, useReducer } from 'react';
import ApoyoReducer from 'reducers/Catalogos/ApoyoReducer';
import axios from "axios";

import { GET_APOYOS, REGISTRAR_APOYOS, ELIMINAR_APOYOS, MODIFICAR_APOYOS, AGREGAR_APOYOS_ERROR } from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

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
            const url = `${baseUrl}tipoApoyoOverride`;
            return new Promise((resolve, reject) => {
                axios.post(url, apoyo, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_APOYOS,
                        payload: response
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: AGREGAR_APOYOS_ERROR,
                payload: true
            })
        }
    }



    const actualizarApoyo = async apoyo => {

        return new Promise((resolve, reject) => {
            axios.put(`${baseUrl}tipoApoyoOverride`, apoyo, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_APOYOS,
                    payload: response
                })
            }).catch(error => {
                reject(error);
            });
        });
    }
    

    const eliminarApoyo = async idApoyo => {
        try {
            console.log('x=>', idApoyo)
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