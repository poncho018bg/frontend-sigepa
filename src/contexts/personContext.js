import React, { createContext, useReducer } from 'react';
import PersonReducer from '../reducers/PersonReducer';

import { GET_PERSONS,REGISTRAR_PERSONA,ELIMINAR_PERSONA,MODIFICAR_PERSONA} from '../types/actionTypes';
import { axiosGet ,axiosPost,axiosDeleteTipo,axiosPostHetoas} from 'helpers/axios';


export const PersonContext = createContext();

export const PersonContextProvider = props => {

  const initialState = {
    personList: [],
    clienteActual: null
  }

  const [state, dispatch] = useReducer(PersonReducer, initialState);

  const getPersons = async () => {
 
    try {
      const resultado = await axiosGet('people');
      console.log(resultado._embedded.people);
      dispatch({
        type: GET_PERSONS,
        payload: resultado._embedded.people
      })
    } catch (error) {
      
      console.log(error);
    }
  }


  const registrarPersona = async persona => {
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
    const { firstName, lastName,activo,_links:{person:{href}}}= persona;
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
  }


  return (
    <PersonContext.Provider
      value={{
        personList: state.personList,
        getPersons,
        registrarPersona,
        eliminarPersona,
        actualizarPersona
       
      }}
    >
      {props.children}
    </PersonContext.Provider>
  )
}