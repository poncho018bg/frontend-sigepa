import {
    GET_ORIGENES_SOLICITUD,
    REGISTRAR_ORIGENES_SOLICITUD,
    ELIMINAR_ORIGENES_SOLICITUD,
    MODIFICAR_ORIGENES_SOLICITUD,
    ORIGENES_SOLICITUD_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_ORIGENES_SOLICITUD:
            return {
                ...state,
                origenesList: action.payload._embedded.origensolicitudes,
                total: action.payload?.page?.totalElements
            };
        case ORIGENES_SOLICITUD_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_ORIGENES_SOLICITUD:
            return {
                ...state,
                origenesList: [...state.origenesList, action.payload]
            };
        case MODIFICAR_ORIGENES_SOLICITUD:
            return {
                ...state,
                origenesList: state.origenesList.map(
                    origenes => origenes.id === action.payload.id ? action.payload : origenes
                )
            };
        case ELIMINAR_ORIGENES_SOLICITUD:
            return {
                ...state,
                origenesList: state.origenesList.filter(origenes => origenes.id !== action.payload)
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