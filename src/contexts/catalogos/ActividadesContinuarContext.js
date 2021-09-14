import React, { createContext, useReducer } from 'react';
import ActividadesContinuarReducer from 'reducers/Catalogos/ActividadesContinuarReducer';
import { GET_ACTIVIDADESCONTINUAR, REGISTRAR_ACTIVIDADESCONTINUAR, ELIMINAR_ACTIVIDADESCONTINUAR, MODIFICAR_ACTIVIDADESCONTINUAR } from 'types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';




export const ActividadesContinuarContext = createContext();

export const ActividadesContinuarContextProvider = props => {

    const initialState = {
        actividadescontinuarList: [],
        clienteActual: null
    }


    const [state, dispatch] = useReducer(ActividadesContinuarReducer, initialState);

    const getActividadesContinuar = async () => {
        try {
            const resultado = await axiosGet('continuidadActividades');
            console.log(resultado._embedded.continuidadActividades);
            dispatch({
                type: GET_ACTIVIDADESCONTINUAR,
                payload: resultado._embedded.continuidadActividades
            })
        } catch (error) {

            console.log(error);
        }
    }

    const registrarActividadesContinuar = async continuidadActividades => {
        try {
            console.log(continuidadActividades);
            const resultado = await axiosPost('continuidadActividades', continuidadActividades);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_ACTIVIDADESCONTINUAR,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }


    const actualizarActividadesContinuar = async continuidadActividades => {

        console.log('Update=>', continuidadActividades);
        const { id, dsactividadcontinuidad, activo, _links: { continuidadActividades: { href } } } = continuidadActividades;
        let continuidadActividadesEnviar = {
            id,
            dsactividadcontinuidad,
            activo,
            apoyos: []
        }
        console.log('Update ENVIAR=>', continuidadActividadesEnviar);
        try {
            const resultado = await axiosPostHetoas(href, continuidadActividadesEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_ACTIVIDADESCONTINUAR,
                payload: resultado,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const eliminarActividadesContinuar = async idActividadesContinuar => {
        try {
            await axiosDeleteTipo(`continuidadActividades/${idActividadesContinuar}`);
            dispatch({
                type: ELIMINAR_ACTIVIDADESCONTINUAR,
                payload: idActividadesContinuar
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ActividadesContinuarContext.Provider
            value={{
                actividadescontinuarList: state.actividadescontinuarList,
                getActividadesContinuar,
                registrarActividadesContinuar,
                eliminarActividadesContinuar,
                actualizarActividadesContinuar
            }}
        >

            {props.children}
        </ActividadesContinuarContext.Provider>
    )




}