import {
    GET_DOCUMENTOS_APOYO,
    GUARDAR_DATOS_BOVEDA,
    GET_EXISTE_DOCUMENTO,
    ERROR_DOCUMENTO_BOVEDA
} from "../types/actionTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_DOCUMENTOS_APOYO:
            return {
                ...state,
                documentosApoyoList: action.payload
            }
        case GET_EXISTE_DOCUMENTO:
            return {
                ...state,
                existedoc: action.payload
            }
        case ERROR_DOCUMENTO_BOVEDA:           
            return {
                ...state,
                error: action.payload
            }
        case GUARDAR_DATOS_BOVEDA:
            return {
                ...state,
                documentosBoveda: [...state.documentosBoveda, action.payload]
            };
        default:
            return state;
    }
}