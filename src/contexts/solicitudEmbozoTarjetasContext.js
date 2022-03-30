import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosGetSinToken,
} from "helpers/axiosPublico";
import solicitudEmbozoTarjetasReducer from "reducers/solicitudEmbozoTarjetasReducer";
import {
  GET_EMBOZO_TARJETAS,
  AGREGAR_SOLICITUD_FOLIO_ERROR,
  GUARDAR_EMBOZO_TARJETAS,
  GET_ETIQUETADO_TARJETAS,
  GUARDAR_ETIQUETADO_TARJETAS,
  GET_ETIQUETA_EVENTO,
} from "types/actionTypes";
import { InsertDriveFileTwoTone } from "@material-ui/icons";

const baseUrl = process.env.REACT_APP_API_URL;
const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;
const baseUrlCurp = process.env.REACT_APP_API_PUBLICO_URL;

export const SolicitudEmbozoTarjetasContext = createContext();

export const SolicitudEmbozoTarjetasContextProvider = (props) => {
  const initialState = {
    embozoBeneficiarios: [],
    etiquetadoBeneficiarios: [],
    eventoTarjetasEtiquetadas: [],
  };

  const [state, dispatch] = useReducer(
    solicitudEmbozoTarjetasReducer,
    initialState
  );

  const getEmbozoBeneficiarios = async () => {
    try {
      /**
       * ToDo: Se debe de cambiar el endpoint por el correcto
       */
      const url = `${baseUrlPublico}solicitudOverride/solicitudEmbozoTarjetas`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("EMBOZO BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GET_EMBOZO_TARJETAS,
              payload: response.data,
            });
          })
          .catch((error) => {
            /**
             * se agrega esto para detectar el error, si no es necesario, borrar
             */
            console.log("Error ", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
              dispatch({
                type: GET_EMBOZO_TARJETAS,
                payload: error.response,
              });
            } else if (error.request) {
              console.log("*************************");

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("ERROR REQUEST", error.request);
            } else {
              console.log("++++++++++++++++++++++++");
              // Something happened in setting up the request that triggered an Error
              console.log("Error MESSAGE ", error.message);
            }
            console.log(error.config);
          });
      });
    } catch (error) {
      dispatch({
        type: AGREGAR_SOLICITUD_FOLIO_ERROR,
        payload: false,
      });
    }
  };

  const guardarEmbozoTarjetas = async (embozados) => {
    try {
      const url = `${baseUrlPublico}solicitudEmbozo`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, embozados, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log("EMBOZO BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GUARDAR_EMBOZO_TARJETAS,
              payload: response.data,
            });
            dispatch(getEmbozoBeneficiarios());
          })
          .catch((error) => {
            /**
             * se agrega esto para detectar el error, si no es necesario, borrar
             */
            console.log("Error ", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
              dispatch({
                type: GUARDAR_EMBOZO_TARJETAS,
                payload: error.response,
              });
            } else if (error.request) {
              console.log("*************************");

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("ERROR REQUEST", error.request);
            } else {
              console.log("++++++++++++++++++++++++");
              // Something happened in setting up the request that triggered an Error
              console.log("Error MESSAGE ", error.message);
            }
            console.log(error.config);
          });
      });
    } catch (error) {
      dispatch({
        type: AGREGAR_SOLICITUD_FOLIO_ERROR,
        payload: false,
      });
    }
  };

  /**
   * Busca todos los beneficiarios listos para el etiquetado
   * @returns etiquetadoBeneficiarios
   */
  const getEtiquedadoBeneficiarios = async () => {
    try {
      const url = `${baseUrlPublico}emisiontarjetas/etiquetaTarjeta`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("ETIQUETADO BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GET_ETIQUETADO_TARJETAS,
              payload: response.data,
            });
          })
          .catch((error) => {
            /**
             * se agrega esto para detectar el error, si no es necesario, borrar
             */
            console.log("Error ", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
              dispatch({
                type: GET_EMBOZO_TARJETAS,
                payload: error.response,
              });
            } else if (error.request) {
              console.log("*************************");

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("ERROR REQUEST", error.request);
            } else {
              console.log("++++++++++++++++++++++++");
              // Something happened in setting up the request that triggered an Error
              console.log("Error MESSAGE ", error.message);
            }
            console.log(error.config);
          });
      });
    } catch (error) {
      dispatch({
        type: AGREGAR_SOLICITUD_FOLIO_ERROR,
        payload: false,
      });
    }
  };

  const guardarEtiquetadoTarjetas = async (etiquetados, idLote) => {
    try {
      const url = `${baseUrlPublico}emisiontarjetas/registroEtiqueta`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, etiquetados, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((response) => {
            console.log("ETIQUETADO BENEFICIARIOS GUARDAR: ", response.data);
            resolve(response);
            dispatch({
              type: GUARDAR_EMBOZO_TARJETAS,
              payload: response.data,
            });
            dispatch(getEtiquedadoBeneficiariosLote(idLote));
          })
          .catch((error) => {
            /**
             * se agrega esto para detectar el error, si no es necesario, borrar
             */
            console.log("Error ", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
              dispatch({
                type: GUARDAR_EMBOZO_TARJETAS,
                payload: error.response,
              });
            } else if (error.request) {
              console.log("*************************");

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("ERROR REQUEST", error.request);
            } else {
              console.log("++++++++++++++++++++++++");
              // Something happened in setting up the request that triggered an Error
              console.log("Error MESSAGE ", error.message);
            }
            console.log(error.config);
          });
      });
    } catch (error) {
      dispatch({
        type: AGREGAR_SOLICITUD_FOLIO_ERROR,
        payload: false,
      });
    }
  };

  /**
   * Busca a los beneficiarios por lote
   * @returns etiquetadoBeneficiarios
   */
  const getEtiquedadoBeneficiariosLote = async (idLote) => {
    try {
      const url = `${baseUrlPublico}emisiontarjetas/etiquetaTarjetaLote/${idLote}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("ETIQUETADO BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GET_ETIQUETADO_TARJETAS,
              payload: response.data,
            });
          })
          .catch((error) => {
            /**
             * se agrega esto para detectar el error, si no es necesario, borrar
             */
            console.log("Error ", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
              dispatch({
                type: GET_EMBOZO_TARJETAS,
                payload: error.response,
              });
            } else if (error.request) {
              console.log("*************************");

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("ERROR REQUEST", error.request);
            } else {
              console.log("++++++++++++++++++++++++");
              // Something happened in setting up the request that triggered an Error
              console.log("Error MESSAGE ", error.message);
            }
            console.log(error.config);
          });
      });
    } catch (error) {
      dispatch({
        type: AGREGAR_SOLICITUD_FOLIO_ERROR,
        payload: false,
      });
    }
  };

  /**
   * Busca a los beneficiarios que ya fueron etiquetados por evento
   * @returns eventoTarjetasEtiquetadas
   */
  const getEtiquetasEvento = async (idEvento) => {
    console.log("busca las etiquetas");
    try {
      const url = `${baseUrlPublico}emisiontarjetas/etiquetaTarjetasEvento/${idEvento}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("ETIQUETADO BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GET_ETIQUETA_EVENTO,
              payload: response.data,
            });
          })
          .catch((error) => {
            /**
             * se agrega esto para detectar el error, si no es necesario, borrar
             */
            console.log("Error ", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
              dispatch({
                type: GET_ETIQUETA_EVENTO,
                payload: error.response,
              });
            } else if (error.request) {
              console.log("*************************");

              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log("ERROR REQUEST", error.request);
            } else {
              console.log("++++++++++++++++++++++++");
              // Something happened in setting up the request that triggered an Error
              console.log("Error MESSAGE ", error.message);
            }
            console.log(error.config);
          });
      });
    } catch (error) {
      dispatch({
        type: GET_ETIQUETA_EVENTO,
        payload: false,
      });
    }
  };

  return (
    <SolicitudEmbozoTarjetasContext.Provider
      value={{
        embozoBeneficiarios: state.embozoBeneficiarios,
        etiquetadoBeneficiarios: state.etiquetadoBeneficiarios,
        eventoTarjetasEtiquetadas: state.eventoTarjetasEtiquetadas,
        getEmbozoBeneficiarios,
        guardarEmbozoTarjetas,
        guardarEtiquetadoTarjetas,
        getEtiquedadoBeneficiariosLote,
        getEtiquetasEvento,
      }}
    >
      {props.children}
    </SolicitudEmbozoTarjetasContext.Provider>
  );
};
