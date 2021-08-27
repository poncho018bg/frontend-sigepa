import { GET_NUMERO_APOYOS, REGISTRAR_NUMERO_APOYOS, MODIFICAR_NUMERO_APOYOS, ELIMINAR_NUMERO_APOYOS } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_NUMERO_APOYOS:
            return {
                ...state,
                numeroApoyosList: action.payload
            };
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
        default:
            return state;
    }
}