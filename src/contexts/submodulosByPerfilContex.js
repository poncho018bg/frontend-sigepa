import React, { createContext, useReducer } from 'react';
import PersonReducer from '../reducers/PersonReducer';

import Axios from 'axios';

import { GET_SUBMODULOSBYPERFIL, REGISTRAR_SUBMODULOSBYPERFIL, ELIMINAR_SUBMODULOSBYPERFIL, MODIFICAR_SUBMODULOSBYPERFIL } from '../types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';
import submodulosByperfilReducer from 'reducers/submodulosByperfilReducer';

export const SubmodulosByPerfilContex = createContext();

export const SubmodulosByPerfilContexProvider = props => {

    const initialState = {
        submodulosPerfilList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(submodulosByperfilReducer, initialState);

    const getSubmodulosByperfil = async idPerfil => {

        try {
            const resultado = await axiosGet(`perfilessubmodulosOverride/${idPerfil}`);
            //   console.log(resultado);
            console.log(resultado);
            dispatch({
                type: GET_SUBMODULOSBYPERFIL,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }


    /*   const registrarPersona = async persona => {
        try {
          console.log(persona);
          const resultado = await axiosPost('people', persona);
          console.log(resultado);
          dispatch({
            type: REGISTRAR_PERSONA,
            payload: resultado
          })
        } catch (error) {
        
          console.log(error);
        }
      }
    
      
    
      const actualizarPersona = async persona => {
        console.log(persona);
        const {id, firstName, lastName,activo,_links:{person:{href}}}= persona;
        let personaEnviar={
          firstName,
          lastName,
          activo
      } 
       try {
         const resultado = await axiosPostHetoas(href,personaEnviar,'PUT' );   
            
          dispatch({
            type: MODIFICAR_PERSONA,
            payload: resultado,
          })
    
        } catch (error) {
        
    
          console.log(error);
        }
      }
    
      const eliminarPersona = async idPersona => {
        try {
    
              await axiosDeleteTipo(`people/${idPersona}`);
              dispatch({
                type: ELIMINAR_PERSONA,
                payload: idPersona
              })
    
        } catch (error) {
          
          console.log(error);
        }
      } */


    return (
        <SubmodulosByPerfilContex.Provider
            value={{
                submodulosPerfilList: state.submodulosPerfilList,
                getSubmodulosByperfil
            }}
        >
            {props.children}
        </SubmodulosByPerfilContex.Provider>
    )
}