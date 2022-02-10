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
} from "types/actionTypes";

import { axiosGet, axiosPostHetoas } from "helpers/axios";

const baseUrl = process.env.REACT_APP_API_URL;
export const MotivoSuspensionContext = createContext();

export const MotivoSuspensionContextProvider = (props) => {
  const initialState = {
    motivoSuspensionList: [],
    error: false,
    page: 0,
    size: 10,
    total: 0,
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

  return (
    <MotivoSuspensionContext.Provider
      value={{
        motivoSuspensionList: state.motivoSuspensionList,
        error: state.error,
        page: state.page,
        size: state.size,
        total: state.total,
        getMotivoSuspension,
        registrarMotivoSuspension,
        actualizarMotivoSuspension,
        eliminarMotivoSuspension,
        changePageNumber,
        changePageSize,
        changePageSizes,
        changePage,
        getMotivoSuspensionByParametros,
      }}
    >
      {props.children}
    </MotivoSuspensionContext.Provider>
  );
};
