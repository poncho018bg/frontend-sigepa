import React, { createContext, useReducer } from 'react';
import BtActividadesReducer from 'reducers/Catalogos/BtActividadesReducer';
import Axios from 'axios';

import { GET_BTACTIVIDADES, REGISTRAR_BTACTIVIDADES, ELIMINAR_BTACTIVIDADES, MODIFICAR_BTACTIVIDADES } from 'types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';


export const BtActividadesContext = createContext();

export const BtActividadesContextProvider = props => {

    const initialState = {
        btActividadesList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(BtActividadesReducer, initialState);


    const getBtActividades = async () => {

        try {
            const resultado = await axiosGet('bitacoraActividades');
            //   console.log(resultado);
            console.log(resultado._embedded.bitacoraActividades);
            dispatch({
                type: GET_BTACTIVIDADES,
                payload: resultado._embedded.bitacoraActividades
            })
        } catch (error) {

            console.log(error);
        }
    }

    const getBtActividadesby = async (nombre, apellidopaterno, apellidoMaterno, puesto, rol, fecha, token) => {

        try {
            const resultado = await axiosGet(`BitacoraAccionesOverride/${nombre}/${apellidopaterno}/${apellidoMaterno}/${puesto}/${rol}/${fecha}/${token}`);
            //console.log(resultado);
            console.log(resultado);
            dispatch({
                type: GET_BTACTIVIDADES,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    const registrarBtActividades = async bitacoraActividades => {
        try {
            console.log(bitacoraActividades);
            const resultado = await axiosPost('bitacoraActividades', bitacoraActividades);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_BTACTIVIDADES,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }

    const actualizarBtActividades = async bitacoraActividades => {
        console.log(bitacoraActividades);
        const { id, firstName, lastName, activo, _links: { bitacoraActividades: { href } } } = bitacoraActividades;
        let personaEnviar = {
            firstName,
            lastName,
            activo
        }
        try {
            const resultado = await axiosPostHetoas(href, personaEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_PERSONA,
                payload: resultado,
            })

        } catch (error) {


            console.log(error);
        }
    }

    const eliminarPersona = async bitacoraActividades => {
        try {
            await axiosDeleteTipo(`bitacoraActividades/${bitacoraActividades}`);
            dispatch({
                type: ELIMINAR_BTACTIVIDADES,
                payload: bitacoraActividades
            })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <BtActividadesContext.Provider
            value={{
                btActividadesList: state.btActividadesList,
                getBtActividadesby
            }}
        >
            {props.children}
        </BtActividadesContext.Provider>
    )

}