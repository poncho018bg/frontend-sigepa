import React, { createContext, useReducer } from "react";
import MotivoSuspensionReducer from "reducers/Catalogos/MotivoSuspensionReducer";
import axios from "axios";
import {
  GET_MOTIVO_SUSPENSION,
  REGISTRAR_MOTIVO_SUSPENSION,
  MODIFICAR_MOTIVO_SUSPENSION,
  ELIMINAR_MOTIVO_SUSPENSION,
  AGREGAR_MOTIVO_SUSPENSION_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA,
  GET_BANDEJA_SUSPENSION,
  REGISTRAR_BANDEJA_MOTIVO_RECHAZO,
  ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO,
} from "types/actionTypes";

import { axiosGet, axiosPostHetoas } from "helpers/axios";
import { axiosPut, axiosPost } from "helpers/axiosPublico";

const UserService = sessionStorage.getItem("token");
const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;
const baseApiExpediente = process.env.REACT_APP_API_EXPEDIENTE_URL;

const baseUrl = process.env.REACT_APP_API_URL;
export const MotivoSuspensionContext = createContext();

export const MotivoSuspensionContextProvider = (props) => {
  const initialState = {
    motivoSuspensionList: [],
    error: false,
    page: 0,
    size: 10,
    total: 0,
    bandejaSuspensionList: [],
    bandejaMotivoSuspension: null,
  };

  const [state, dispatch] = useReducer(MotivoSuspensionReducer, initialState);

  /**
   * obtener tipos de apoyo
   */
  const getMotivoSuspension = async () => {
    try {
      const { page, size } = state;
      const result = await axiosGet(
        `motivoSuspension?page=${page}&size=${size}`
      );
      dispatch({
        type: GET_MOTIVO_SUSPENSION,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Se registran los tipos de apoyos
   * @param {motivoSuspension} motivoSuspension
   */
  const registrarMotivoSuspension = async (motivoSuspension) => {
    try {
      const url = `${baseUrl}motivoSuspension`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, motivoSuspension, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: REGISTRAR_MOTIVO_SUSPENSION,
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
        type: AGREGAR_MOTIVO_SUSPENSION_ERROR,
        payload: true,
      });
    }
  };

  /**
   * Se actualizan los tipos de apoyos
   * @param {motivoSuspension} motivoSuspension
   */
  const actualizarMotivoSuspension = async (motivoSuspension) => {
    const {
      _links: {
        motivoSuspension: { href },
      },
    } = motivoSuspension;

    return new Promise((resolve, reject) => {
      axios
        .put(href, motivoSuspension, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          resolve(response);
          dispatch({
            type: MODIFICAR_MOTIVO_SUSPENSION,
            payload: response.data,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const eliminarMotivoSuspension = async (motivoSuspension) => {
    const {
      id,
      dsmotivosuspesion,
      activo,
      _links: {
        motivoSuspension: { href },
      },
    } = motivoSuspension;
    const act = activo === true ? false : true;

    let motivoSuspensionEnviar = {
      id,
      dsmotivosuspesion,
      activo: act,
    };

    try {
      const result = await axiosPostHetoas(href, motivoSuspensionEnviar, "PUT");
      dispatch({
        type: ELIMINAR_MOTIVO_SUSPENSION,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Paginacion
  const changePage = async (pages) => {
    try {
      dispatch(changePageNumber(pages));
    } catch (error) {
      throw error;
    }
  };

  const changePageSizes = async (sizes) => {
    try {
      dispatch(changePageSize(sizes));
    } catch (error) {
      throw error;
    }
  };

  const changePageNumber = (page) => ({
    type: CAMBIAR_PAGINA,
    payload: page,
  });

  const changePageSize = (size) => ({
    type: CAMBIAR_TAMANIO_PAGINA,
    payload: size,
  });

  const getMotivoSuspensionByParametros = async (search) => {
    try {
      const result = await axiosGet(
        `motivoSuspension/search/findByDsmotivosuspesionContaining?dsmotivosuspesion=${search}`
      );

      dispatch({
        type: GET_MOTIVO_SUSPENSION,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBandejaSuspendidos = async (idMvBandeja) => {
    console.log("BANDEJA SUSPENSION", idMvBandeja);
    try {
      const url = `${baseUrlPublico}bandejaSuspensionOverride/bandejaSolicitudSuspension/${idMvBandeja}`;
      console.log("BANDEJA SUSPENSION URL", url);
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + UserService,
            },
          })
          .then((response) => {
            console.log("BANDEJA SUSPENSION RESPONSE =>", response.data);
            resolve(response);
            dispatch({
              type: GET_BANDEJA_SUSPENSION,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("BANDEJA SUSPENSION ERROR =>", error);
            if (error.response) {
              console.log("--------------------------------------------------");
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("ERROR DATA", error.response.data);
              console.log("ERROR STATUS", error.response.status);
              console.log("ERROR HEADERS", error.response.headers);
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
      console.log("Err", error);
    }
  };

  const registrarBandejaMotivoSuspensionExpediente = async (datos) => {
    try {
      console.log(
        "mv bandeja solicitud expediente datos motivo suspension ===>",
        datos
      );
      const url = `${baseUrlPublico}bandejaSuspensionOverride/suspenderExpediente`;
      axios
        .post(url, datos, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: "Bearer " + UserService,
          },
        })
        .then((response) => {
          console.log("GUARDADO SUSPENSION =>", response.data);
          resolve(response);
          dispatch({
            type: REGISTRAR_BANDEJA_MOTIVO_RECHAZO,
            payload: resultado,
          });
        })
        .catch((error) => {
          console.log("ERROR GUARDAR SUSPENSION =>", error);
          if (error.response) {
            console.log("--------------------------------------------------");
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("ERROR DATA", error.response.data);
            console.log("ERROR STATUS", error.response.status);
            console.log("ERROR HEADERS", error.response.headers);
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
    } catch (error) {
      console.log("mv bandeja solicitud ", error);
    }
  };

  const actualizarBandejaMotivoSuspensionExpediente = async (datos) => {
    try {
      console.log(
        "mv bandeja solicitud expediente datos motivo rechazos ===>",
        datos
      );
      const resultado = await axiosPut("bandejaSuspensionOverride", datos);
      console.log(
        "mv bandeja solicitud resultado guardado de bandeja rechazos ==>",
        resultado
      );
      dispatch({
        type: ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO,
        payload: resultado,
      });
      /*
            let bitcacora = {
                bitacoraaccion_id: "/cf648ed8-43aa-4230-9d5f-a65b8820b6d1",
                usuario_id: sessionStorage.getItem('idUSuario'),
                dsdescripcion:JSON.stringify(datos)
            }
            dispatch(registrarBtActividades(bitcacora))
            */
    } catch (error) {
      console.log("mv bandeja solicitud ", error);
    }
  };

  return (
    <MotivoSuspensionContext.Provider
      value={{
        motivoSuspensionList: state.motivoSuspensionList,
        error: state.error,
        page: state.page,
        size: state.size,
        total: state.total,
        bandejaMotivoSuspension: state.bandejaMotivoSuspension,
        bandejaSuspensionList: state.bandejaSuspensionList,
        getMotivoSuspension,
        registrarMotivoSuspension,
        actualizarMotivoSuspension,
        eliminarMotivoSuspension,
        changePageNumber,
        changePageSize,
        changePageSizes,
        changePage,
        getMotivoSuspensionByParametros,
        getBandejaSuspendidos,
        registrarBandejaMotivoSuspensionExpediente,
        actualizarBandejaMotivoSuspensionExpediente,
      }}
    >
      {props.children}
    </MotivoSuspensionContext.Provider>
  );
};
