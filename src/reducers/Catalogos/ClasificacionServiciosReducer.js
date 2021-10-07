import {
    GET_CLASIFICACION_SERVICIOS, REGISTRAR_CLASIFICACION_SERVICIOS, MODIFICAR_CLASIFICACION_SERVICIOS, ELIMINAR_CLASIFICACION_SERVICIOS,
    AGREGAR_CLASIFICACION_SERVICIOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_CLASIFICACION_SERVICIOS:
            return {
                ...state,
                clasificacionServiciosList: action.payload._embedded.clasificacionServicios,
                total: action.payload.page.totalElements
            };
        case AGREGAR_CLASIFICACION_SERVICIOS_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_CLASIFICACION_SERVICIOS:
            return {
                ...state,
                clasificacionServiciosList: [...state.clasificacionServiciosList, action.payload]
            };
        case MODIFICAR_CLASIFICACION_SERVICIOS:
            return {
                ...state,
                clasificacionServiciosList: state.clasificacionServiciosList.map(
                    clasificacionServicio => clasificacionServicio.id === action.payload.id ? action.payload : clasificacionServicio
                )
            };
        case ELIMINAR_CLASIFICACION_SERVICIOS:
            return {
                ...state,
                clasificacionServiciosList: state.clasificacionServiciosList.filter(clasificacionServicio => clasificacionServicio.id !== action.payload)
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