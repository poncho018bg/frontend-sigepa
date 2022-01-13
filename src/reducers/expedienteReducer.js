import {
    GET_EXPEDIENTE_PARAMETROS, ACTUALIZAR_EXPEDIENTE,
    GET_ULTIMO_PROGRAMA_BENEFICIARIO, GET_ETAPAS_BY_PLANTILLA, GET_SOLICITUDES_EXPEDIENTE_BENEFICIARIO, GET_DOCUMENTOS_BY_ETAPA_EXPEDIENTE,
    GET_CONTENIDO_DOCUMENTO, AGREGAR_CONTENIDO_DOCUMENTO, DESHABILITAR_DOCUMENTO_EXPEDIENTE, GET_SOLICITUD_BENEFICIARIO_PROGRAMA,
    REGISTRAR_BANDEJA_MOTIVO_RECHAZO,
    GET_BANDEJA_RECHAZOS, ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO, GET_EXPEDIENTE_BOVEDA_BY_BENEFICIARIO,GENERAR_EXPEDIENTE_PDF
} from '../types/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case GET_EXPEDIENTE_PARAMETROS:
            console.log('action.payload', action.payload)
            return {
                ...state,
                beneficiariosList: action.payload
            };
        case ACTUALIZAR_EXPEDIENTE:
            return {
                ...state,
                expediente: action.payload
            };
        case GET_ULTIMO_PROGRAMA_BENEFICIARIO:
        case GET_SOLICITUDES_EXPEDIENTE_BENEFICIARIO:
            return {
                ...state,
                programaList: action.payload
            };

        case GET_ETAPAS_BY_PLANTILLA:
            return {
                ...state,
                etapasPlantilla: action.payload
            };
        case GET_DOCUMENTOS_BY_ETAPA_EXPEDIENTE:
            return {
                ...state,
                documentosExpedienteLst: action.payload
            };
        case GET_CONTENIDO_DOCUMENTO:
            return {
                ...state,
                contenidoDocumento: action.payload
            };

        case AGREGAR_CONTENIDO_DOCUMENTO:
            return {
                ...state,
                agregarcontenidoDocumento: action.payload
            };
            case GENERAR_EXPEDIENTE_PDF:
                return {
                    ...state,
                    expedientepdf: action.payload
                };
        case DESHABILITAR_DOCUMENTO_EXPEDIENTE:
            return {
                ...state,
                deshabilitarDocumento: action.payload
            };
        case GET_SOLICITUD_BENEFICIARIO_PROGRAMA:
            return {
                ...state,
                mvbandejasolicitud: action.payload
            };
        case REGISTRAR_BANDEJA_MOTIVO_RECHAZO:
            return {
                ...state,
                bandejaMotivoRechazo: action.payload
            }
        case ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO:
        case GET_BANDEJA_RECHAZOS:
            return {
                ...state,
                bandejaRechazo: action.payload
            }

        case GET_EXPEDIENTE_BOVEDA_BY_BENEFICIARIO:
            return {
                ...state,
                expedienteBoveda: action.payload
            };
    }

}