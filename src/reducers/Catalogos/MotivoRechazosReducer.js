import {
    GET_MOTIVO_RECHAZOS, REGISTRAR_MOTIVO_RECHAZOS, MODIFICAR_MOTIVO_RECHAZOS, ELIMINAR_MOTIVO_RECHAZOS,
    AGREGAR_MOTIVO_RECHAZOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_MOTIVO_RECHAZOS:
            return {
                ...state,
                motivoRechazosList: action.payload._embedded.motivoRechazos,
                total: action.payload.page.totalElements
            };
        case AGREGAR_MOTIVO_RECHAZOS_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_MOTIVO_RECHAZOS:
            return {
                ...state,
                motivoRechazosList: [...state.motivoRechazosList, action.payload]
            };
        case MODIFICAR_MOTIVO_RECHAZOS:
            return {
                ...state,
                motivoRechazosList: state.motivoRechazosList.map(
                    motivoRechazos => motivoRechazos.id === action.payload.id ? action.payload : motivoRechazos
                )
            };
        case ELIMINAR_MOTIVO_RECHAZOS:
            return {
                ...state,
                //motivoRechazosList: state.motivoRechazosList.filter(motivoRechazos => motivoRechazos.id !== action.payload)
                motivoRechazosList: state.motivoRechazosList.map(
                    motivoRechazos => motivoRechazos.id === action.payload.id ? action.payload : motivoRechazos
                )
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