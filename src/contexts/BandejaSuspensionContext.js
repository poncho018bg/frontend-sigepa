import React, { createContext, useReducer } from "react";
import BandejaSuspensionReducer from "reducers/BandejaSuspensionReducer";
import { axiosGet } from "helpers/axiosPublico";
import { axiosPostHetoas } from "helpers/axios";
import axios from "axios";
import {
    GET_BANDEJA_SUSPENSION,
    REGISTRAR_BANDEJA_SUSPENSION,
    ELIMINAR_BANDEJA_SUSPENSION,
    MODIFICAR_BANDEJA_SUSPENSION,
    BANDEJA_SUSPENSION_ERROR,    
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
} from "types/actionTypes";


export const BandejaSuspensionContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;

export const BandejaSuspensionContextProvider = (props) => {
  const initialState = {
    bandejaSuspensionList: [],
    error: false,
    page: 0,
    size: 10,
    total: 0,
  };

  const [state, dispatch] = useReducer(BandejaSuspensionReducer, initialState);

  const getBandejaSuspension = async () => {
    try {
      const { page, size } = state;
      const resultado = await axiosGet(
        `bandejaSuspesion?page=${page}&size=${size}`
      );
      dispatch({
        type: GET_BANDEJA_SUSPENSION,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registrarBandejaSuspension = async (bandejaRechazos) => {
    try {
      const UserService = sessionStorage.getItem("token");
      const url = `${baseUrlPublico}bandejaSuspesion`;
      
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
        type: BANDEJA_SUSPENSION_ERROR,
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
        type: BANDEJA_SUSPENSION_ERROR,
        payload: true,
      });
    }
  };

  const actualizarBandejaSuspension = async (bandejaRechazosw) => {
    try {
      const {
        _links: {
            bandejaSuspesion: { href },
        },
      } = bandejaRechazosw;
      const resultado = await axiosPostHetoas(href, bandejaRechazosw, "PUT");

      dispatch({
        type: MODIFICAR_BANDEJA_SUSPENSION,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarBandejaSuspension = async (bandejaRechazos) => {
    const {
      activo,
      _links: {
        bandejaSuspesion: { href },
      },
    } = bandejaRechazos;
    const act = !activo;
    bandejaRechazos.activo = act;
    try {
      const result = await axiosPostHetoas(href, bandejaRechazos, "PUT");
      dispatch({
        type: ELIMINAR_BANDEJA_SUSPENSION,
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
    <BandejaSuspensionContext.Provider
      value={{
        bandejaRechazosList: state.bandejaRechazosList,
        bandejaSuspensionList: state.bandejaSuspensionList,
        getBandejaSuspension,
        registrarBandejaSuspension,
        actualizarBandejaSuspension,
        eliminarBandejaSuspension,
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
    </BandejaSuspensionContext.Provider>
  );
};
