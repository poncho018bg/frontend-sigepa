import { GET_PERIODICIDAD_APOYOS, REGISTRAR_PERIODICIDAD_APOYOS, MODIFICAR_PERIODICIDAD_APOYOS, ELIMINAR_PERIODICIDAD_APOYOS } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_PERIODICIDAD_APOYOS:
            return {
                ...state,
                periodicidadApoyosList: action.payload
            };
        case REGISTRAR_PERIODICIDAD_APOYOS:
            return {
                ...state,
                periodicidadApoyosList: [...state.periodicidadApoyosList, action.payload]
            };
        case MODIFICAR_PERIODICIDAD_APOYOS:
            return {
                ...state,
                periodicidadApoyosList: state.periodicidadApoyosList.map(
                    periodicidadApoyos => periodicidadApoyos.id === action.payload.id ? action.payload : periodicidadApoyos
                )
            };
        case ELIMINAR_PERIODICIDAD_APOYOS:
            return {
                ...state,
                periodicidadApoyosList: state.periodicidadApoyosList.filter(periodicidadApoyos => periodicidadApoyos.id !== action.payload)
            };
        default:
            return state;
    }
}