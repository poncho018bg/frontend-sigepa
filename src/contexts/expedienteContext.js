import React, { createContext, useReducer } from "react";
import expedienteReducer from "../reducers/expedienteReducer.js";
import axios from "axios";
import {
  GET_EXPEDIENTE_PARAMETROS,
  ACTUALIZAR_EXPEDIENTE,
  GET_ULTIMO_PROGRAMA_BENEFICIARIO,
  GET_ETAPAS_BY_PLANTILLA,
  GET_SOLICITUDES_EXPEDIENTE_BENEFICIARIO,
  GET_DOCUMENTOS_BY_ETAPA_EXPEDIENTE,
  GET_CONTENIDO_DOCUMENTO,
  AGREGAR_CONTENIDO_DOCUMENTO,
  DESHABILITAR_DOCUMENTO_EXPEDIENTE,
  GET_SOLICITUD_BENEFICIARIO_PROGRAMA,
  REGISTRAR_BANDEJA_MOTIVO_RECHAZO,
  GET_BANDEJA_RECHAZOS,
  ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO,
  GET_EXPEDIENTE_BOVEDA_BY_BENEFICIARIO,
  GENERAR_EXPEDIENTE_PDF,
  REGISTRAR_BTACTIVIDADES
} from "../types/actionTypes";

import { axiosPut, axiosPost } from "helpers/axiosPublico";
const UserService = sessionStorage.getItem("token");

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;
const baseApiExpediente = process.env.REACT_APP_API_EXPEDIENTE_URL;

export const ExpedienteContext = createContext();

export const ExpedienteContextProvider = (props) => {
  const initialState = {
    expedienteList: [],
    beneficiariosList: [],
    programaList: [],
    etapasPlantilla: [],
    documentosExpedienteLst: [],
    deshabilitarDocumento: null,
    mvbandejasolicitud: null,
    bandejaMotivoRechazo: null,
    bandejaRechazo: null,
    expedienteBoveda: null,
    expedientepdf: null,
  };

  const [state, dispatch] = useReducer(expedienteReducer, initialState);

  const getExpedienteParametros = async (parametros) => {
    try {
      const url = `${baseUrlPublico}expedienteOverride/consultarExpediente/${parametros.nombre}/${parametros.apellidoPaterno}/${parametros.apellidoMaterno}/${parametros.curp}`;
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
            console.log("Expediente Response=>", response.data);
            resolve(response);
            dispatch({
              type: GET_EXPEDIENTE_PARAMETROS,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
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

  const actualizarExpediente = async (expediente) => {
    try {
      console.log(direccion);
      const resultado = await axiosPut("expediente", expediente);
      console.log("resultado --->", resultado);
      dispatch({
        type: ACTUALIZAR_EXPEDIENTE,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const BeneficiarioPrograma = async (idBeneficiario) => {
    const url = `${baseUrlPublico}expedienteOverride/beneficiario/${idBeneficiario}`;
    try {
      console.log("expediente idBeneficiario =>", idBeneficiario);
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
            console.log("Expediente Response=>", response.data);
            resolve(response);
            dispatch({
              type: GET_ULTIMO_PROGRAMA_BENEFICIARIO,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
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
      console.log(error);
    }
  };

  const expedienteBeneficiario = async (idBeneficiario) => {
    const url = `${baseUrlPublico}solicitudOverride/solicitudesExpediente/${idBeneficiario}`;
    try {
      console.log("expediente idBeneficiario =>", idBeneficiario);
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
            console.log("Expediente Response=>", response.data);
            resolve(response);
            dispatch({
              type: GET_SOLICITUDES_EXPEDIENTE_BENEFICIARIO,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
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
      console.log(error);
    }
  };

  const getEtapasByPlantilla = async (idEtapa) => {
    try {
      const url = `${baseApiExpediente}/etapas/etapasByPlantilla/${idEtapa}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: GET_ETAPAS_BY_PLANTILLA,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const expDigDocumentosStartLoading = async (idEtapa, idExpediente) => {
    try {
      const url = `${baseApiExpediente}/documentosExpediente/findDocumentosByEtapaAndExpediente/${idEtapa}/${idExpediente}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: GET_DOCUMENTOS_BY_ETAPA_EXPEDIENTE,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const expDigDocStartLoading = async (idDocumento) => {
    try {
      const url = `${baseApiExpediente}/documentosExpediente/obtenerContenidoDocumento/${idDocumento}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: GET_CONTENIDO_DOCUMENTO,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const expDigDocuments = async (documentExp, files) => {
    const formData = new FormData();
    const blobOverrides = new Blob([JSON.stringify(documentExp)], {
      type: "application/json",
    });

    formData.append("file", files);
    formData.append("documentosExp", blobOverrides);

    const url = `${baseApiExpediente}/documentosExpediente/guardarDocumentosExpedienteSinHistorico`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, formData, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          resolve(response);
          dispatch({
            type: AGREGAR_CONTENIDO_DOCUMENTO,
            payload: response,
          });
          
        })
        .catch((error) => {
          console.log("Err", error);
          reject(error);
        });
    });
  };

  const registrarBtActividades = async (bitacoraActividades) => {
    try {
      console.log(bitacoraActividades);
      const resultado = await axiosPost(
        "bitacoraActividades",
        bitacoraActividades
      );
      console.log(resultado);
      dispatch({
        type: REGISTRAR_BTACTIVIDADES,
        payload: resultado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const bitacoraActiv  = async (bitacoraActividades) => {
    const url = `${baseUrlPublico}bitacoraActividades`;
    return new Promise((resolve, reject) => {
      axios
        .post(url,bitacoraActividades, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          resolve(response);
          dispatch({
            type: REGISTRAR_BTACTIVIDADES,
            payload: resultado,
          });          
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const deshabilitarDocumentoExpediente = async (idDocumentoExpediente) => {
    const url = `${baseApiExpediente}/documentosExpediente/deshabilitarDocumentosExpediente/${idDocumentoExpediente}`;
    return new Promise((resolve, reject) => {
      axios
        .put(url, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          resolve(response);
          dispatch({
            type: DESHABILITAR_DOCUMENTO_EXPEDIENTE,
            payload: response.data,
          });          
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const solicitudBeneficiarioPrograma = async (idBeneficiario, idPrograma) => {
    const url = `${baseUrlPublico}solicitudOverride/solicitudesBeneficiarioPrograma/${idBeneficiario}/${idPrograma}`;
    try {
      console.log(
        "mv bandeja solicitud Expediente Solicitud idBeneficiario Programa =>",
        idBeneficiario,
        idPrograma
      );
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
            console.log(
              "mv bandeja solicitud Expediente Response=>",
              response.data
            );
            resolve(response);
            dispatch({
              type: GET_SOLICITUD_BENEFICIARIO_PROGRAMA,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("mv bandeja solicitud Error ", error);
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
      console.log(error);
    }
  };

  const registrarBandejaMotivoRechazoExpediente = async (datos) => {
    try {
      console.log(
        "mv bandeja solicitud expediente datos motivo rechazos ===>",
        datos
      );
      const resultado = await axiosPost("bandejaRechazosOverride/rechazoexpediente", datos);
      console.log(
        "mv bandeja solicitud resultado guardado de bandeja rechazos ==>",
        resultado
      );
      dispatch({
        type: REGISTRAR_BANDEJA_MOTIVO_RECHAZO,
        payload: resultado,
      });
    } catch (error) {
      console.log("mv bandeja solicitud ", error);
    }
  };

  const actualizarBandejaMotivoRechazoExpediente = async (datos) => {
    try {
      console.log(
        "mv bandeja solicitud expediente datos motivo rechazos ===>",
        datos
      );
      const resultado = await axiosPut("bandejaRechazosOverride", datos);
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

  const getBandejaRechazos = async (idMvBandeja) => {
    console.log("mv bandeja solicitud BANDEJA RECHAZOS", idMvBandeja);
    try {
      const url = `${baseUrlPublico}bandejaRechazosOverride/bandejaSolicitud/${idMvBandeja}`;
      console.log("mv bandeja solicitud BANDEJA RECHAZOS", url);
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
            console.log(
              "mv bandeja solicitud CONSULTA BANDEJA RECHAZOS =>",
              response.data
            );
            resolve(response);
            dispatch({
              type: GET_BANDEJA_RECHAZOS,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log(
              "mv bandeja solicitud Error consulta BANDEJA RECHAZOS =>",
              error
            );
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

  const getExpedienteBovedaByBeneficiario = async (idBeneficiario) => {
    try {
      const url = `${baseApiExpediente}/expediente/obtenerExpedienteByUsuario/${idBeneficiario}`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            resolve(response);
            dispatch({
              type: GET_EXPEDIENTE_BOVEDA_BY_BENEFICIARIO,
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log("Error ", error);
          });
      });
    } catch (error) {
      console.log("Err", error);
    }
  };

  const generarExpedientepdf = async (preguntasFormioDTO) => {
    const url = `${baseUrlPublico}expedientepdf`;
    console.log("URL=>", url);
    return new Promise((resolve, reject) => {
      axios
        .post(url, preguntasFormioDTO, {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          resolve(response);
          dispatch({
            type: GENERAR_EXPEDIENTE_PDF,
            payload: response,
          });
        })
        .catch((error) => {
          console.log("Err", error);
          reject(error);
        });
    });
  };

  return (
    <ExpedienteContext.Provider
      value={{
        beneficiariosList: state.beneficiariosList,
        expedienteList: state.expedienteList,
        solicitudParametrosExpediente: state.solicitudParametrosExpediente,
        programaList: state.programaList,
        etapasPlantilla: state.etapasPlantilla,
        documentosExpedienteLst: state.documentosExpedienteLst,
        contenidoDocumento: state.contenidoDocumento,
        agregarcontenidoDocumento: state.agregarcontenidoDocumento,
        deshabilitarDocumento: state.deshabilitarDocumento,
        mvbandejasolicitud: state.mvbandejasolicitud,
        bandejaMotivoRechazo: state.bandejaMotivoRechazo,
        bandejaRechazo: state.bandejaRechazo,
        expedienteBoveda: state.expedienteBoveda,
        getExpedienteParametros,
        actualizarExpediente,
        BeneficiarioPrograma,
        expedienteBeneficiario,
        getEtapasByPlantilla,
        expDigDocumentosStartLoading,
        expDigDocStartLoading,
        expDigDocuments,
        deshabilitarDocumentoExpediente,
        solicitudBeneficiarioPrograma,
        registrarBandejaMotivoRechazoExpediente,
        getBandejaRechazos,
        actualizarBandejaMotivoRechazoExpediente,
        getExpedienteBovedaByBeneficiario,
        generarExpedientepdf,
        registrarBtActividades,
        bitacoraActiv
      }}
    >
      {props.children}
    </ExpedienteContext.Provider>
  );
};
