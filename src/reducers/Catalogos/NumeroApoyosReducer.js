import {
    GET_NUMERO_APOYOS, REGISTRAR_NUMERO_APOYOS, MODIFICAR_NUMERO_APOYOS, ELIMINAR_NUMERO_APOYOS,
    AGREGAR_NUMERO_APOYOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_NUMERO_APOYOS:
            return {
                ...state,
                numeroApoyosList: action.payload._embedded.numeroApoyos,
                total: action.payload.page.totalElements
            };
        case AGREGAR_NUMERO_APOYOS_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_NUMERO_APOYOS:
            return {
                ...state,
                numeroApoyosList: [...state.numeroApoyosList, action.payload]
            };
        case MODIFICAR_NUMERO_APOYOS:
            return {
                ...state,
                numeroApoyosList: state.numeroApoyosList.map(
                    numeroApoyos => numeroApoyos.id === action.payload.id ? action.payload : numeroApoyos
                )
            };
        case ELIMINAR_NUMERO_APOYOS:
            return {
                ...state,
                numeroApoyosList: state.numeroApoyosList.filter(numeroApoyos => numeroApoyos.id !== action.payload)
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