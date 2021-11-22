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
    BUSCAR_SOLICITUD_POR_PARAMETROS_BANDEJA
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
        default:
            return state;
    }
}