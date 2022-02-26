import {
    GET_PUNTOS_ENTREGA,
    REGISTRAR_PUNTOS_ENTREGA,
    ELIMINAR_PUNTOS_ENTREGA,
    MODIFICAR_PUNTOS_ENTREGA,
    PUNTOS_ENTREGA_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
    GET_TARJETAS_PARA_ENTREGA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_PUNTOS_ENTREGA:
            return {
                ...state,
                puntosEntregaList: action.payload._embedded.puntoEntregas,
                total: action.payload?.page?.totalElements
            };
        case PUNTOS_ENTREGA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_PUNTOS_ENTREGA:
            return {
                ...state,
                puntosEntregaList: [...state.puntosEntregaList, action.payload]
            };
        case MODIFICAR_PUNTOS_ENTREGA:
            return {
                ...state,
                puntosEntregaList: state.puntosEntregaList.map(
                    puntoEntregas => puntoEntregas.id === action.payload.id ? action.payload : puntoEntregas
                )
            };
        case ELIMINAR_PUNTOS_ENTREGA:
            return {
                ...state,
                puntosEntregaList: state.puntosEntregaList.filter(puntoEntregas => puntoEntregas.id !== action.payload)
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
            case GET_TARJETAS_PARA_ENTREGA:
            return {
                ...state,
                terjetasEntregaList: [...state.terjetasEntregaList, action.payload]
            };
        default:
            return state;
    }
}