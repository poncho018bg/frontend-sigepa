import React, { createContext, useReducer } from "react";
import TarjetasEmbozadasReducer from "reducers/TarjetasEmbozadasReducer";
import axios from "axios";
import {
  REGISTRAR_TARJETAS_EMBOZADAS,
  REGISTRAR_TARJETAS_EMBOZADAS_ERROR,
} from "../types/actionTypes";

const UserService = sessionStorage.getItem('token')
const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;
export const TarjetasEmbozadasContext = createContext();

export const TarjetasEmbozadasContextProvider = (props) => {
  const initialState = {
    tarjetasList: [],
    error: false,
  };

  const [state, dispatch] = useReducer(TarjetasEmbozadasReducer, initialState);

  const registrarTarjetasEmbozo = async (datos) => {
    try {
    
      const url = `${baseUrlPublico}emisiontarjetas`;

      let datosfinal ={
        datos
      }

      return new Promise((resolve, reject) => {
        axios
          .post(url, datosfinal, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: 'Bearer ' + UserService 
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: REGISTRAR_TARJETAS_EMBOZADAS,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.log("ocurrio un error en el context");
      console.log(error);
      dispatch({
        type: REGISTRAR_TARJETAS_EMBOZADAS_ERROR,
        payload: true,
      });
    }
  };

  return (
    <TarjetasEmbozadasContext.Provider
      value={{
        tarjetasList: state.tarjetasList,
        registrarTarjetasEmbozo,
      }}
    >
      {props.children}
    </TarjetasEmbozadasContext.Provider>
  );
};
