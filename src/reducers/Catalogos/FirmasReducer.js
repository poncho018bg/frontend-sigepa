import { GET_FIRMAS, REGISTRAR_FIRMAS, MODIFICAR_FIRMAS, ELIMINAR_FIRMAS, GET_PROGRAMAS } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_FIRMAS:
            return {
                ...state,
                firmasList: action.payload
            };
        case REGISTRAR_FIRMAS:
            return {
                ...state,
                firmasList: [...state.firmasList, action.payload]
            };
        case MODIFICAR_FIRMAS:
            return {
                ...state,
                firmasList: state.firmasList.map(
                    firmas => firmas.id === action.payload.id ? action.payload : firmas
                )
            };
        case ELIMINAR_FIRMAS:
            return {
                ...state,
                firmasList: state.firmasList.filter(firmas => firmas.id !== action.payload)
            };
        case GET_PROGRAMAS:
            return {
                ...state,
                programaList: action.payload
            };
        default:
            return state;
    }
}