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
    GET_COBERTURA_POR_PROGRAMA
} from "../types/actionTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_GENEROS:
            return {
                ...state,
                generosList: action.payload._embedded.generos,
                total: action.payload.page.totalElements
            };
        case AGREGAR_SOLICITUD_FOLIO_ERROR:
            console.log('err', action.type);
            return {
                ...state,
                error: action.payload
            }
        case GET_GRADO_ESTUDIOS:
            return {
                ...state,
                estudiosList: action.payload._embedded.gradoEstudios,
                total: action.payload.page.totalElements
            };
        case BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA:
            console.log('action.payload', action.payload)
            return {
                ...state,
                solicitudParametrosBandeja: action.payload
            };
        case BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA_APROBAR:
            console.log('action.payload', action.payload)
            return {
                ...state,
                solicitudParametrosBandeja: action.payload
            };
        case BUSCAR_SOLICITUD_POR_PARAMETROS:
            console.log('action.payload', action.payload)
            return {
                ...state,
                solicitudParametros: action.payload
            };
        case GET_ESTADO_CIVIL:
            return {
                ...state,
                estadoCivilList: action.payload._embedded.estadosCiviles,
                total: action.payload.page.totalElements
            };
        case GET_IDENTIFICACIONES_OFICIALES:
            return {
                ...state,
                identificacionesList: action.payload._embedded.identificacionesOficiales,
                total: action.payload.page.totalElements
            };
        case REGISTRAR_BENEFICIARIO:
            return {
                ...state,
                beneficiario: [...state.beneficiario, action.payload]
            };
        case REGISTRAR_DIRECCION_BENEFICIARIO:
            return {
                ...state,
                direccion: [...state.direccion, action.payload]
            };

        case GUARDAR_SOLICITUD_FOLIO:
            return {
                ...state,
                solicitudFolio: action.payload
            };
        case MODIFICAR_DIRECCION_BENEFICIARIO:
            return {
                ...state,
                direccion: state.direccion.map(
                    direccion => direccion.id === action.payload.id ? action.payload : direccion
                )
            };
        case GET_BENEFICIARIO:
            return {
                ...state,
                beneficiario: action.payload
            };
        case ACTUALIZAR_BENEFICIARIO:
            return {
                ...state,
                beneficiario: action.payload
            };
        case OBTENER_DIRECCION:
            return {
                ...state,
                direccion: action.payload
            };
        case GET_BENEFICIARIO_MONETARIO:
            return {
                ...state,
                beneficiarioMonetario: action.payload
            };
        case GET_BENEFICIARIO_CANCELADO:
            return {
                ...state,
                beneficiarioCancelado: action.payload
            };
        case GET_BENEFICIARIO_REGISTRADO_PROGRAMA:
            return {
                ...state,
                beneficiarioRegistrado: action.payload
            };
        case CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_VALIDADA:
            return {
                ...state,
                //solicitudParametrosBandeja: [...state.solicitudParametrosBandeja, action.payload]
            };

        case CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_PENDIENTE:
            return {
                ...state,
                solicitudParametrosBandeja: [...state.solicitudParametrosBandeja, action.payload]
            };
        case CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_APROBAR:
            return {
                ...state,
                solicitudParametrosBandeja: [...state.solicitudParametrosBandeja, action.payload]
            };
        case PROGRAMA_VIGENTE:
            return {
                ...state,
                programaVigente: action.payload
            };

        case CAMBIAR_ESTATUS_SOLICITUD_BANDEJA_REASIGNADA:
            return {
                ...state,
                //solicitudParametrosBandeja: [...state.solicitudParametrosBandeja, action.payload]
            };
        case GET_COBERTURA_POR_PROGRAMA:
            return {
                ...state,
                coberturalist: action.payload
            };

        default:
            return state;
    }
}