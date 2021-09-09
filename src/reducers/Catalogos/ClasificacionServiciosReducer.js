import { GET_CLASIFICACION_SERVICIOS, REGISTRAR_CLASIFICACION_SERVICIOS, MODIFICAR_CLASIFICACION_SERVICIOS, ELIMINAR_CLASIFICACION_SERVICIOS } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_CLASIFICACION_SERVICIOS:
            return {
                ...state,
                clasificacionServiciosList: action.payload
            };
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
        default:
            return state;
    }
}