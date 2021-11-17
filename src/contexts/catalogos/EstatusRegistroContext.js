import React, { createContext, useReducer } from 'react';
import EstatusRegistroReducer from 'reducers/Catalogos/EstatusRegistroReducer';
import { axiosGet, axiosPut } from 'helpers/axiosPublico';
import { GET_ESTATUS_REGISTRO, REGISTRAR_ESTATUS_REGISTRO, MODIFICAR_ESTATUS_REGISTRO, ESTATUS_REGISTRO_ERROR } from 'types/actionTypes';

export const EstatusRegistroContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const EstatusRegistroContextProvider = props => {

    const initialState = {
        estatusRegistroList: []

    }

    const [state, dispatch] = useReducer(EstatusRegistroReducer, initialState);


    const getEstatusRegistro = async () => {

        try {
            const resultado = await axiosGet('estatusRegistros');
            dispatch({
                type: GET_ESTATUS_REGISTRO,
                payload: resultado._embedded.estatusRegistros
            })
        } catch (error) {
            console.log(error);
        }
    }


    const registrarEstatusRegistros = async estatusRegistros => {

        try {
            const url = `${baseUrlPublico}estatusRegistros`;
            return new Promise((resolve, reject) => {
                axios.post(url, estatusRegistros, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_ESTATUS_REGISTRO,
                        payload: response
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            dispatch({
                type: ESTATUS_REGISTRO_ERROR,
                payload: true
            })
        }
    }

    const actualizarEstatusRegistros = async estatusRegistros => {
        try {
            const resultado = await axiosPut('estatusRegistros', estatusRegistros);

            dispatch({
                type: MODIFICAR_ESTATUS_REGISTRO,
                payload: resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <EstatusRegistroContext.Provider
            value={{
                estatusRegistroList: state.estatusRegistroList,
                getEstatusRegistro,
                registrarEstatusRegistros,
                actualizarEstatusRegistros
            }}
        >
            {props.children}
        </EstatusRegistroContext.Provider>
    )

}