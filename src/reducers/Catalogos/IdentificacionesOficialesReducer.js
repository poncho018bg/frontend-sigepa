import {
    GET_IDENTIFICACIONES_OFICIALES,
    REGISTRAR_IDENTIFICACIONES_OFICIALES,
    ELIMINAR_IDENTIFICACIONES_OFICIALES,
    MODIFICAR_IDENTIFICACIONES_OFICIALES,
    IDENTIFICACIONES_OFICIALES_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_IDENTIFICACIONES_OFICIALES:
            return {
                ...state,
                identificacionesOficialesList: action.payload._embedded.identificacionesOficiales,
                total: action.payload?.page?.totalElements
            };
        case IDENTIFICACIONES_OFICIALES_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_IDENTIFICACIONES_OFICIALES:
            return {
                ...state,
                identificacionesOficialesList: [...state.identificacionesOficialesList, action.payload]
            };
        case MODIFICAR_IDENTIFICACIONES_OFICIALES:
            return {
                ...state,
                identificacionesOficialesList: state.identificacionesOficialesList.map(
                    identificacionesOficiales => identificacionesOficiales.id === action.payload.id ? action.payload : identificacionesOficiales
                )
            };
        case ELIMINAR_IDENTIFICACIONES_OFICIALES:
            return {
                ...state,
                identificacionesOficialesList: state.identificacionesOficialesList.filter(identificacionesOficiales => identificacionesOficiales.id !== action.payload)
            };
        case CAMBIAR_PAGINA:
            return {
                ...state,
                page: action.payload
            }
        case CAMBIAR_TAMANIO_PAGINA:
            return {
                ...state,
                size: action.payload
            }
        default:
            return state;
    }
}