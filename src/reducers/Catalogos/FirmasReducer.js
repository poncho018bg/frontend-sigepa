import { GET_FIRMAS, REGISTRAR_FIRMAS, MODIFICAR_FIRMAS, ELIMINAR_FIRMAS, GET_PROGRAMAS,CAMBIAR_PAGINA,CAMBIAR_TAMANIO_PAGINA } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_FIRMAS:
            return {
                ...state,
                firmasList: action.payload._embedded.firmas,
                total: action.payload.page.totalElements
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