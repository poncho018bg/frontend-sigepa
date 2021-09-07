import React, { createContext, useReducer } from 'react';
import EstadosReducer from 'reducers/Catalogos/EstadosReducer';

import Axios from 'axios';

import { GET_ESTADOS, REGISTRAR_ESTADOS, ELIMINAR_ESTADOS, MODIFICAR_ESTADOS } from 'types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';



export const EstadosContext = createContext();

export const EstadosContextProvider = props => {

    const initialState = {
        estadosList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(EstadosReducer, initialState);


    const getEstados = async () => {

        try {
            const resultado = await axiosGet('estados');
            //   console.log(resultado);
            console.log(resultado._embedded.estados);
            dispatch({
                type: GET_ESTADOS,
                payload: resultado._embedded.estados
            })
        } catch (error) {

            console.log(error);
        }
    }


    const registrarEstados = async estado => {
        try {
            console.log(estado);
            const resultado = await axiosPost('estados', estado);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_ESTADOS,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }


    const actualizarEstados = async estado => {
        console.log(estado);
        const { id, noestado, dsestado, activo, _links: { estados: { href } } } = estado;
        let estadosEnviar = {
            noestado,
            dsestado,
            municipiosCollection:[]            

      }
        try {
            const resultado = await axiosPostHetoas(href, estadosEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_ESTADOS,
                payload: resultado,
            })

        } catch (error) {


            console.log(error);
        }
    }

    const eliminarEstados = async idEstado => {
        try {
    
              await axiosDeleteTipo(`estados/${idEstado}`);
              dispatch({
                type: ELIMINAR_ESTADOS,
                payload: idEstado
              })
    
        } catch (error) {
          
          console.log(error);
        }
      }

      return (
        <EstadosContext.Provider
          value={{
            estadosList: state.estadosList,
            getEstados,
            registrarEstados,
            eliminarEstados,
            actualizarEstados
           
          }}
        >
          {props.children}
        </EstadosContext.Provider>
      )

}