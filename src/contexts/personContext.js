import React, { createContext, useReducer } from 'react';
import PersonReducer from '../reducers/PersonReducer';

import Axios from 'axios';

import { GET_PERSONS,REGISTRAR_PERSONA} from '../types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';

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
   //   console.log(resultado);
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


  return (
    <PersonContext.Provider
      value={{
        personList: state.personList,
        getPersons,
        registrarPersona
       
      }}
    >
      {props.children}
    </PersonContext.Provider>
  )
}