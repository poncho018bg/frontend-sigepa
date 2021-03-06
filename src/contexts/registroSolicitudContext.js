import React, { createContext, useReducer } from "react";
import RegistroSolicitudReducer from "reducers/RegistroSolicitudReducer";
import axios from "axios";
import {
  GET_GENEROS,
  GET_GRADO_ESTUDIOS,
  GET_ESTADO_CIVIL,
  GET_IDENTIFICACIONES_OFICIALES,
  REGISTRAR_BENEFICIARIO,
  REGISTRAR_DIRECCION_BENEFICIARIO,
  GET_BENEFICIARIO,
  ACTUALIZAR_BENEFICIARIO,
  OBTENER_DIRECCION,
  MODIFICAR_DIRECCION_BENEFICIARIO,
  GUARDAR_SOLICITUD_FOLIO,
  AGREGAR_SOLICITUD_FOLIO_ERROR,
  BUSCAR_SOLICITUD_POR_PARAMETROS,
  GET_BENEFICIARIO_MONETARIO,
  GET_BENEFICIARIO_CANCELADO,
  BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA,
  BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA_APROBAR,
  CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_VALIDADA,
  CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_PENDIENTE,
  CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_APROBAR,
  GET_BENEFICIARIO_REGISTRADO_PROGRAMA,
  PROGRAMA_VIGENTE,
  CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_REASIGNADA,
  GET_COBERTURA_POR_PROGRAMA,
  GET_GENEROS_ACTIVOS,
  GET_IDENTIFICACIONES_OFICIALES_ACTIVOS,
} from "types/actionTypes";

import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosGetSinToken,
} from "helpers/axiosPublico";
const UserService = sessionStorage.getItem("token");
const baseUrl = process.env.REACT_APP_API_URL;
const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;
const baseUrlCurp = process.env.REACT_APP_API_PUBLICO_URL;
export const RegistroSolicitudContext = createContext();

export const RegistroSolicitudContextProvider = (props) => {
  const initialState = {
    generosList: [],
    estudiosList: [],
    estadoCivilList: [],
    identificacionesList: [],
    beneficiario: undefined,
    direccion: [],
    solicitudFolio: null,
    solicitudParametros: [],
    beneficiarioMonetario: null,
    beneficiarioCancelado: null,
    beneficiarioRegistrado: null,
    solicitudParametrosBandeja: [],
    programaVigente: null,
    coberturalist: [],
  };

  const [state, dispatch] = useReducer(RegistroSolicitudReducer, initialState);

  const getGeneros = async () => {
    try {
      const result = await axiosGetSinToken(`generos`);
      console.log("RESULT GENEROS -->", result);
      dispatch({
        type: GET_GENEROS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getGenerosActivos = async () => {
    try {
      const result = await axiosGetSinToken(`generos/search/findByActivoTrue`);
      console.log("RESULT GENEROS -->", result);
      dispatch({
        type: GET_GENEROS_ACTIVOS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getEstudios = async () => {
    try {
      const result = await axiosGetSinToken(`gradoEstudios`);
      console.log("RESULT Estudios -->", result);
      dispatch({
        type: GET_GRADO_ESTUDIOS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getEstadoCivil = async () => {
    try {
      const result = await axiosGetSinToken(
        `estadosCiviles/search/findByActivoTrue`
      );
      console.log("RESULT Estudios -->", result);
      dispatch({
        type: GET_ESTADO_CIVIL,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getIdentificaciones = async () => {
    try {
      const result = await axiosGetSinToken(`identificacionesOficiales`);
      console.log("RESULT Estudios -->", result);
      dispatch({
        type: GET_IDENTIFICACIONES_OFICIALES,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getIdentificacionesActivos = async () => {
    try {
      const result = await axiosGetSinToken(
        `identificacionesOficiales/search/findByActivoTrue`
      );
      dispatch({
        type: GET_IDENTIFICACIONES_OFICIALES_ACTIVOS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registrarBeneficiario = async (beneficiario) => {
    try {
      console.log(beneficiario);
      const resultado = await axiosPost("beneficiarioOverride", beneficiario);
      console.log("resultado --->", resultado);
      dispatch({
        type: REGISTRAR_BENEFICIARIO,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registrarDireccionBeneficiario = async (direccion) => {
    try {
      console.log(direccion);
      const resultado = await axiosPost("domicilioOverride", direccion);
      console.log("resultado --->", resultado);
      dispatch({
        type: REGISTRAR_DIRECCION_BENEFICIARIO,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarDireccionBeneficiario = async (direccion) => {
    try {
      console.log(direccion);
      const resultado = await axiosPut("domicilioOverride", direccion);
      console.log("resultado --->", resultado);
      dispatch({
        type: MODIFICAR_DIRECCION_BENEFICIARIO,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBeneficiario = async (curp) => {
    console.log("CURP CONSULTA BENEFICIARIOS ", curp);
    try {
      const url = `${baseUrlPublico}beneficiarioOverride/curp/${curp}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("AXIOS RESPONSE BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GET_BENEFICIARIO,
              payload: response.data,
            });
          })
          .catch((error) => {
            //reject(error);
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
                type: GET_BENEFICIARIO,
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
        payload: true,
      });
    }
  };

  /**
   * Se actualiza el beneficiario siempre que ya existe el registro.
   * @param {beneficiario} beneficiario
   */
  const actualizarBeneficiario = async (beneficiario) => {
    try {
      console.log(beneficiario);
      const resultado = await axiosPut("beneficiarioOverride", beneficiario);
      console.log("resultado --->", resultado);
      dispatch({
        type: ACTUALIZAR_BENEFICIARIO,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {beneficiario} beneficiario
   */
  const actualizarBeneficiarioFolio = async (beneficiario, idUsuario) => {
    try {
      console.log(beneficiario);
      const resultado = await axiosPut(
        `beneficiarioOverride/beneficiarioExpediente/${idUsuario}`,
        beneficiario
      );
      console.log("resultado --->", resultado);
      dispatch({
        type: ACTUALIZAR_BENEFICIARIO,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDireccionBeneficiario = async (idBeneficiario) => {
    try {
      console.log(
        "LLEGA EL ID DEL BENEFICIARIO DIRECCION ====>",
        idBeneficiario
      );
      const resultado = await axiosGetSinToken(
        `domicilioOverride/domicilio/${idBeneficiario}`
      );
      console.log("resultado CONSULTA DE DIRECCION--->", resultado);
      dispatch({
        type: OBTENER_DIRECCION,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registrarSolicitudFolio = async (solFolios) => {
    try {
      console.log("registrar solicitud folios ==> ", solFolios);
      const url = `${baseUrlPublico}solicitudOverride`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, solFolios, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: GUARDAR_SOLICITUD_FOLIO,
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
        type: AGREGAR_SOLICITUD_FOLIO_ERROR,
        payload: true,
      });
    }
  };

  const getSolicitudesPorParametros = async (parametros) => {
    try {
      const url = `${baseUrlPublico}solicitudOverride/consultarSolicitudes/${parametros.idPrograma}/${parametros.idEstatus}/${parametros.paterno}/${parametros.materno}/${parametros.nombre}/${parametros.folio}`;
      console.log("parametros=>", parametros);
      return new Promise((resolve, reject) => {
        axios
          .get(url,{
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: BUSCAR_SOLICITUD_POR_PARAMETROS,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const getBeneficiarioMonetario = async (curp, idPrograma) => {
    try {
      const url = `${baseUrlPublico}beneficiarioOverride/beneficiarioProgramaMon/${curp}/${idPrograma}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("Monetario response: ", response.data);
            resolve(response);
            dispatch({
              type: GET_BENEFICIARIO_MONETARIO,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      if (error.response) {
        console.log("Error response ------------->");
      } else if (error.request) {
        console.log("Error request ------------->");
      } else {
        console.log("Error otro ------------->");
      }
      console.log("Descripci??n del error ------------->:", error);
    }
  };

  const getBeneficiarioRegistradoPrograma = async (curp, idPrograma) => {
    try {
      const url = `${baseUrlPublico}beneficiarioOverride/beneficiarioProgramaRegistrado/${curp}/${idPrograma}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("Monetario response: ", response.data);
            resolve(response);
            dispatch({
              type: GET_BENEFICIARIO_REGISTRADO_PROGRAMA,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      if (error.response) {
        console.log("Error response ------------->");
      } else if (error.request) {
        console.log("Error request ------------->");
      } else {
        console.log("Error otro ------------->");
      }
      console.log("Descripci??n del error ------------->:", error);
    }
  };

  const getBeneficiarioCancelado = async (curp) => {
    try {
      const url = `${baseUrlPublico}beneficiarioOverride/beneficiarioProgramaCancela/${curp}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("AXIOS RESPONSE BENEFICIARIOS: ", response.data);
            resolve(response);
            dispatch({
              type: GET_BENEFICIARIO_CANCELADO,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      if (error.response) {
        console.log("Error response ------------->");
      } else if (error.request) {
        console.log("Error request ------------->");
      } else {
        console.log("Error otro ------------->");
      }
      console.log("Descripci??n del error ------------->:", error);
    }
  };

  const getSolParametrosBandeja = async (parametros) => {
    console.log("sol parametros bandeja ==>", parametros);
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/consultarSolicitudesRegistrada/${parametros.idPrograma}/${parametros.idMunicipio}/${parametros.idEstatus}/${parametros.paterno}/${parametros.materno}/${parametros.nombre}/${parametros.folio}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const getSolParametrosBandejaAprobar = async (parametros) => {
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/consultarSolicitudesPendientesBandeja/${parametros.idPrograma}/${parametros.idEstatus}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA_APROBAR,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const bandejaCambioEstatusValidada = async (
    SolicitudesSeleted,
    parametros
  ) => {
    /*
        let parametros = {
            idPrograma: 'NULL',
            idMunicipio: 'NULL',
            idEstatus: 'Registradas'
        }
        */
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusValidada`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, SolicitudesSeleted, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_VALIDADA,
              payload: response.data,
            });
            dispatch(getSolParametrosBandeja(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const bandejaCambioEstatusPendiente = async (
    solicitudParametros,
    parametros
  ) => {
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusPendiente`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, solicitudParametros, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_PENDIENTE,
              payload: response.data,
            });
            dispatch(getSolParametrosBandeja(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const bandejaCambioEstatusAprobar = async (
    solicitudParametros,
    parametros
  ) => {
    /*
        let parametros = {
            idPrograma: 'NULL',
            idEstatus: 'NULL'
        }
        */
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusAprobar`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, solicitudParametros, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_APROBAR,
              payload: response.data,
            });
            dispatch(getSolParametrosBandejaAprobar(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const getProgramaVigente = async (idPrograma, vigencia) => {
    try {
      const url = `${baseUrl}programasOverride/programaVigente/${idPrograma}/${vigencia}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("validar programa  response: ", response.data);
            resolve(response);
            dispatch({
              type: PROGRAMA_VIGENTE,
              payload: response.data,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      if (error.response) {
        console.log("Error response ------------->");
      } else if (error.request) {
        console.log("Error request ------------->");
      } else {
        console.log("Error otro ------------->");
      }
      console.log("Descripci??n del error ------------->:", error);
    }
  };

  const bandejaCambioEstatusReasignada = async (
    SolicitudesSeleted,
    parametros
  ) => {
    /*
        let parametros = {
            idPrograma: 'NULL',
            idMunicipio: 'NULL',
            idEstatus: 'Registradas'
        }
        */
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusReasignada`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, SolicitudesSeleted, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + UserService,
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_REASIGNADA,
              payload: response.data,
            });

            dispatch(getSolParametrosBandeja(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const reasignarSuspendida = async (solicitud) => {
    try {
      console.log("datos a reasignar ==>", solicitud);
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusReasignadaSuspendida`;
      axios
        .post(url, solicitud, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: "Bearer " + UserService,
          },
        })
        .then((response) => {
          console.log("RESPONSE=>", response.data);
          resolve(response);
        })
        .catch((error) => {
          console.log("Err", error);
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
      console.log("Err", error);
    }
  };

  const bandejaValidadaCambioEstatusReasignada = async (
    SolicitudesSeleted,
    parametros
  ) => {
    /*let parametros = {
            idPrograma: 'NULL',
            idMunicipio: 'NULL',
            idEstatus: 'Validadas'
        }*/
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusReasignada`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, SolicitudesSeleted, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_REASIGNADA,
              payload: response.data,
            });
            dispatch(getSolParametrosBandeja(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const bandejaAprobarCambioEstatusReasignada = async (
    SolicitudesSeleted,
    parametros
  ) => {
    /*
        let parametros = {
            idPrograma: 'NULL',
            idEstatus: 'NULL'
        }
        */
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambiarEstatusReasignada`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, SolicitudesSeleted, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_REASIGNADA,
              payload: response.data,
            });
            dispatch(getSolParametrosBandejaAprobar(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const getCoberturaProgramas = async (idPrograma) => {
    try {
      const url = `${baseUrlPublico}domicilioOverride/coberturaPorPrograma/${idPrograma}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch({
              type: GET_COBERTURA_POR_PROGRAMA,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const guardarCambioPrograma = async (cambioPrograma, parametros) => {
    try {
      const url = `${baseUrlPublico}bandejaSolicitudOverride/cambioPrograma`;
      return new Promise((resolve, reject) => {
        axios
          .post(url, cambioPrograma, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log("RESPONSE=>", response.data);
            resolve(response);
            dispatch(getSolParametrosBandeja(parametros));
          })
          .catch((error) => {
            console.log("Err", error);
            reject(error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  return (
    <RegistroSolicitudContext.Provider
      value={{
        generosList: state.generosList,
        estudiosList: state.estudiosList,
        estadoCivilList: state.estadoCivilList,
        identificacionesList: state.identificacionesList,
        beneficiario: state.beneficiario,
        direccion: state.direccion,
        solicitudFolio: state.solicitudFolio,
        solicitudParametros: state.solicitudParametros,
        beneficiarioMonetario: state.beneficiarioMonetario,
        beneficiarioCancelado: state.beneficiarioCancelado,
        solicitudParametrosBandeja: state.solicitudParametrosBandeja,
        beneficiarioRegistrado: state.beneficiarioRegistrado,
        programaVigente: state.programaVigente,
        coberturalist: state.coberturalist,
        getGeneros,
        getGenerosActivos,
        getEstudios,
        getEstadoCivil,
        getIdentificaciones,
        getIdentificacionesActivos,
        registrarBeneficiario,
        registrarDireccionBeneficiario,
        actualizarDireccionBeneficiario,
        getBeneficiario,
        actualizarBeneficiario,
        obtenerDireccionBeneficiario,
        registrarSolicitudFolio,
        getSolicitudesPorParametros,
        getBeneficiarioMonetario,
        getBeneficiarioCancelado,
        getSolParametrosBandeja,
        getSolParametrosBandejaAprobar,
        bandejaCambioEstatusValidada,
        bandejaCambioEstatusPendiente,
        bandejaCambioEstatusAprobar,
        getBeneficiarioRegistradoPrograma,
        actualizarBeneficiarioFolio,
        getProgramaVigente,
        bandejaCambioEstatusReasignada,
        bandejaValidadaCambioEstatusReasignada,
        bandejaAprobarCambioEstatusReasignada,
        getCoberturaProgramas,
        reasignarSuspendida,
        guardarCambioPrograma,
      }}
    >
      {props.children}
    </RegistroSolicitudContext.Provider>
  );
};
