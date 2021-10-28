import {
    GET_DOCUMENTOS_APOYO,
    GUARDAR_DATOS_BOVEDA
} from "../types/actionTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_DOCUMENTOS_APOYO:
            return {
                ...state,
                documentosApoyoList: action.payload
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