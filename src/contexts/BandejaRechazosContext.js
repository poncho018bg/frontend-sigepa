import React, { createContext, useReducer } from "react";
import BandejaRechazosReducer from "reducers/BandejaRechazosReducer";
import { axiosGet } from "helpers/axiosPublico";
import { axiosPostHetoas } from "helpers/axios";
import axios from "axios";
import {
  GET_BANDEJA_RECHAZOS,
  REGISTRAR_BANDEJA_RECHAZOS,
  ELIMINAR_BANDEJA_RECHAZOS,
  MODIFICAR_BANDEJA_RECHAZOS,
  BANDEJA_RECHAZOS_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA,
  REGISTRAR_BANDEJA_SUSPENSION,
} from "types/actionTypes";

export const BandejaRechazosContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;

export const BandejaRechazosContextProvider = (props) => {
  const initialState = {
    bandejaRechazosList: [],
    error: false,
    page: 0,
    size: 10,
    total: 0,
  };

  const [state, dispatch] = useReducer(BandejaRechazosReducer, initialState);

  const getBandejaRechazos = async () => {
    try {
      const { page, size } = state;
      const resultado = await axiosGet(
        `bandejaRechazos?page=${page}&size=${size}`
      );
      dispatch({
        type: GET_BANDEJA_RECHAZOS,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registrarBandejaRechazos = async (bandejaRechazos) => {
    try {
      const UserService = sessionStorage.getItem("token");
      const url = `${baseUrlPublico}bandejaRechazos`;
      console.log("axios url  =>", url);
      console.log("axios bandejaRechazos =>", bandejaRechazos);
      return new Promise((resolve, reject) => {
        axios
          .post(url, bandejaRechazos, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + UserService,
            },
          })
          .then((response) => {
            console.log("response", response);
            resolve(response);
            dispatch({
              type: REGISTRAR_BANDEJA_RECHAZOS,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      dispatch({
        type: BANDEJA_RECHAZOS_ERROR,
        payload: true,
      });
    }
  };

  const registrarBandejaRechazosPadron = async (bandejaRechazos) => {
    try {
      const UserService = sessionStorage.getItem("token");
      const url = `${baseUrlPublico}bandejaRechazosOverride/rechazopadron`;
      console.log("axios url  =>", url);
      console.log("axios bandejaRechazos =>", bandejaRechazos);
      return new Promise((resolve, reject) => {
        axios
          .post(url, bandejaRechazos, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + UserService,
            },
          })
          .then((response) => {
            console.log("response", response);
            resolve(response);
            dispatch({
              type: REGISTRAR_BANDEJA_RECHAZOS,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      dispatch({
        type: BANDEJA_RECHAZOS_ERROR,
        payload: true,
      });
    }
  };
  const registrarBandejaSuspensionPadron = async (bandejaSuspension) => {
    try {
      const UserService = sessionStorage.getItem("token");
      const url = `${baseUrlPublico}bandejaSuspensionOverride/suspensionpadron`;
      console.log("axios url  =>", url);
      console.log("axios bandejaRechazos =>", bandejaSuspension);
      return new Promise((resolve, reject) => {
        axios
          .post(url, bandejaSuspension, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + UserService,
            },
          })
          .then((response) => {
            console.log("response", response);
            resolve(response);
            dispatch({
              type: REGISTRAR_BANDEJA_SUSPENSION,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      dispatch({
        type: BANDEJA_RECHAZOS_ERROR,
        payload: true,
      });
    }
  };

  const actualizarBandejaRechazos = async (bandejaRechazosw) => {
    try {
      const {
        _links: {
          bandejaRechazos: { href },
        },
      } = bandejaRechazosw;
      const resultado = await axiosPostHetoas(href, bandejaRechazosw, "PUT");

      dispatch({
        type: MODIFICAR_BANDEJA_RECHAZOS,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarBandejaRechazos = async (bandejaRechazos) => {
    const {
      activo,
      _links: {
        bandejaRechazos: { href },
      },
    } = bandejaRechazos;
    const act = !activo;
    bandejaRechazos.activo = act;
    try {
      const result = await axiosPostHetoas(href, bandejaRechazos, "PUT");
      dispatch({
        type: ELIMINAR_BANDEJA_RECHAZOS,
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
      console.err(error);
      throw error;
    }
  };

  const changePageSizes = async (sizes) => {
    try {
      dispatch(changePageSize(sizes));
    } catch (error) {
      console.err(error);
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

  return (
    <BandejaRechazosContext.Provider
      value={{
        bandejaRechazosList: state.bandejaRechazosList,
        bandejaSuspensionList: state.bandejaSuspensionList,
        getBandejaRechazos,
        registrarBandejaRechazos,
        actualizarBandejaRechazos,
        eliminarBandejaRechazos,
        registrarBandejaRechazosPadron,
        registrarBandejaSuspensionPadron,

        error: state.error,
        page: state.page,
        size: state.size,
        total: state.total,
        changePageNumber,
        changePageSize,
        changePageSizes,
        changePage,
      }}
    >
      {props.children}
    </BandejaRechazosContext.Provider>
  );
};
