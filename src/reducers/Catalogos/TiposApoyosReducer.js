import {
    GET_TIPOS_APOYOS, REGISTRAR_TIPOS_APOYOS, ELIMINAR_TIPOS_APOYOS, MODIFICAR_TIPOS_APOYOS,
    CAMBIAR_PAGINA,
    AGREGAR_LOCALIDADES_ERROR,
    CAMBIAR_TAMANIO_PAGINA
} from '../../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_TIPOS_APOYOS:
            return {
                ...state,
                tiposApoyosList: action.payload._embedded.tiposApoyos,
                total: action.payload.page.totalElements
            };
        case REGISTRAR_TIPOS_APOYOS:
            return {
                ...state,
                tiposApoyosList: [...state.tiposApoyosList, action.payload]
            };
        case MODIFICAR_TIPOS_APOYOS:
            return {
                ...state,
                tiposApoyosList: state.tiposApoyosList.map(
                    tipoApoyo => tipoApoyo.id === action.payload.id ? action.payload : tipoApoyo
                )
            };
        case ELIMINAR_TIPOS_APOYOS:
            return {
                ...state,
                tiposApoyosList: state.tiposApoyosList.filter(tipoApoyo => tipoApoyo.id !== action.payload)
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