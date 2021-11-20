import React, { createContext, useReducer } from 'react';
import BtActividadesReducer from 'reducers/Catalogos/BtActividadesReducer';

import { GET_BTACTIVIDADES, REGISTRAR_BTACTIVIDADES, ELIMINAR_BTACTIVIDADES } from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';




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

            console.log(resultado._embedded.bitacoraActividades);
            dispatch({
                type: GET_BTACTIVIDADES,
                payload: resultado._embedded.bitacoraActividades
            })
        } catch (error) {

            console.log(error);
        }
    }

    const getBtActividadesby = async (nombre, apellidopaterno, apellidoMaterno, puesto, rol, fecha) => {

        try {
            const resultado = await axiosGet(`BitacoraAccionesOverride/${nombre.length === 0 ? "NULL" : nombre}/${apellidopaterno.length === 0 ? "NULL" : apellidopaterno}/${apellidoMaterno.length === 0 ? "NULL" : apellidoMaterno}/${puesto.length === 0 ? "NULL" : puesto}/${rol.length === 0 ? "NULL" : rol}/${fecha.length === 0 ? "NULL" : fecha}/${sessionStorage.getItem('token')}`);

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
        const { firstName, lastName, activo, _links: { bitacoraActividades: { href } } } = bitacoraActividades;
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

    const getBitacoraActividadesby = async (nombre, fechainicio, fechafin) => {

        try {
            const resultado = await axiosGet(`BitacoraAccionesOverride/bitacoras/${nombre.length === 0 ? "NULL" : nombre}/${fechainicio.length === 0 ? "NULL" : fechainicio}/${fechafin.length === 0 ? "NULL" : fechafin}/${sessionStorage.getItem('token')}`);

            console.log(resultado);
            dispatch({
                type: GET_BTACTIVIDADES,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }


    return (
        <BtActividadesContext.Provider
            value={{
                btActividadesList: state.btActividadesList,
                getBtActividadesby,
                getBtActividades,
                registrarBtActividades,
                actualizarBtActividades,
                eliminarPersona,
                getBitacoraActividadesby
            }}
        >
            {props.children}
        </BtActividadesContext.Provider>
    )

}