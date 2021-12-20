import {
    GET_ESTATUS_SOLICITUD,
    REGISTRAR_ESTATUS_SOLICITUD,
    ELIMINAR_ESTATUS_SOLICITUD,
    MODIFICAR_ESTATUS_SOLICITUD,
    ESTATUS_SOLICITUD_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_ESTATUS_SOLICITUD:
            return {
                ...state,
                estatusSolicitudList: action.payload._embedded.estatusSolicitud,
                total: action.payload?.page?.totalElements
            };
        case ESTATUS_SOLICITUD_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_ESTATUS_SOLICITUD:
            return {
                ...state,
                estatusSolicitudList: [...state.estatusSolicitudList, action.payload]
            };
        case MODIFICAR_ESTATUS_SOLICITUD:
            return {
                ...state,
                estatusSolicitudList: state.estatusSolicitudList.map(
                    estatusSolicitud => estatusSolicitud.id === action.payload.id ? action.payload : estatusSolicitud
                )
            };
        case ELIMINAR_ESTATUS_SOLICITUD:
            return {
                ...state,
                estatusSolicitudList: state.estatusSolicitudList.filter(estatusSolicitud => estatusSolicitud.id !== action.payload)
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