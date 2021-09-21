import React, { createContext, useReducer } from 'react';

const baseUrl = process.env.REACT_APP_API_URL;
import axios from "axios";
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { 
        REGISTRAR_PROGRAMAS,
        AGREGAR_PROGRAMA_ERROR,
        MODIFICAR_PROGRAMAS,
        ELIMINAR_PROGRAMAS,
        GET_PROGRAMAS } 
from 'types/actionTypes';
import ProgramasReducer from 'reducers/Catalogos/Programas/ProgramasReducer';
import { GET_PROGRAMAS_BY_ID } from 'types/actionTypes';



export const ProgramasContext = createContext();

export const ProgramasContextProvider = props => {
    const initialState = {
        programasList: [],
        programa:null
    }

    const [state, dispatch] = useReducer(ProgramasReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get= async () => {
        try {
            const result = await axiosGet('programas');
            dispatch({
                type: GET_PROGRAMAS,
                payload: result._embedded.programas
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrar = async programas => {
     
           // const resultado = await axiosPost('programas', programas);
            const url = `${ baseUrl }programas`;
            return new Promise((resolve, reject) => {
                axios.post(url, programas, {
                    headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
                }).then(response => {
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_PROGRAMAS,
                        payload: response
                    })
                }).catch(error => {
                    reject(error);
                });
            });

            
      
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar= async objetoActualizar => {

        const {  _links: { programas: { href } } } = objetoActualizar;

            let { dsprograma,
                    dsclaveprograma,
                    fcvigenciainicio,
                    fcvigenciafin,
                    fcregistrowebinicio,
                    fcregistrowebfin,
                    fcregistropresencialinicio,
                    fcregistropresencialfin,
                    dsdescripcion,
                    dscriterioelegibilidad,
                    dscontinuidad,
                    dsobservaciones,
                    boactivo} = objetoActualizar


        let objetoEnviar = {
                    dsprograma,
                    dsclaveprograma,
                    fcvigenciainicio,
                    fcvigenciafin,
                    fcregistrowebinicio,
                    fcregistrowebfin,
                    fcregistropresencialinicio,
                    fcregistropresencialfin,
                    dsdescripcion,
                    dscriterioelegibilidad,
                    dscontinuidad,
                    dsobservaciones,
                    boactivo
        }
        try {
            const result = await axiosPostHetoas(href, objetoEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_PROGRAMAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar= async id => {
        try {
            await axiosDeleteTipo(`programas/${id}`);
            dispatch({
                type: ELIMINAR_PROGRAMAS,
                payload: id,
            })
        } catch (error) {
            console.log(error);
        }
    }

     /**
     * obtener tipos de apoyo
     */
      const getByID= async id => {
        try {
            const result = await axiosGet(`programas/${id}`);
            dispatch({
                type: GET_PROGRAMAS_BY_ID,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }
          


    return (
        <ProgramasContext.Provider
            value={{
                programasList: state.programasList,
                programa: state.programa,
                errorInsert:state.errorInsert,
                mensajeError:state.mensajeError,
                get,
                registrar,
                actualizar,
                eliminar,
                getByID
            }}
        >
            {props.children}
        </ProgramasContext.Provider>
    )
}