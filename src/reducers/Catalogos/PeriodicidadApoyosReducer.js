import {
    GET_PERIODICIDAD_APOYOS, REGISTRAR_PERIODICIDAD_APOYOS, MODIFICAR_PERIODICIDAD_APOYOS, ELIMINAR_PERIODICIDAD_APOYOS,
    CAMBIAR_PAGINA,
    AGREGAR_LOCALIDADES_ERROR,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_PERIODICIDAD_APOYOS:
            return {
                ...state,
                periodicidadApoyosList: action.payload._embedded.periodicidadApoyos,
                total: action.payload?.page?.totalElements

            };
        case AGREGAR_LOCALIDADES_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
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