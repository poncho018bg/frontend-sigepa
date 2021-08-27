import { GET_MOTIVO_RECHAZOS, REGISTRAR_MOTIVO_RECHAZOS, MODIFICAR_MOTIVO_RECHAZOS, ELIMINAR_MOTIVO_RECHAZOS } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_MOTIVO_RECHAZOS:
            return {
                ...state,
                motivoRechazosList: action.payload
            };
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
                motivoRechazosList: state.motivoRechazosList.filter(motivoRechazos => motivoRechazos.id !== action.payload)
            };
        default:
            return state;
    }
}