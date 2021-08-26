import { GET_TIPOS_APOYOS, REGISTRAR_TIPOS_APOYOS, ELIMINAR_TIPOS_APOYOS, MODIFICAR_TIPOS_APOYOS } from '../../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_TIPOS_APOYOS:
            return {
                ...state,
                tiposApoyosList: action.payload
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
        default:
            return state;
    }
}