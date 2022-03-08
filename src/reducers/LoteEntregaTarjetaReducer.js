import {
    GET_LOTE_ENTREGA_TARJETAS,
    REGISTRAR_LOTE_ENTREGA_TARJETAS,
    ELIMINAR_LOTE_ENTREGA_TARJETAS,
    MODIFICAR_LOTE_ENTREGA_TARJETAS,
    LOTE_ENTREGA_TARJETAS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_LOTE_ENTREGA_TARJETAS:
            return {
                ...state,
                lotesEntregaTarjetaList: action.payload._embedded.loteEntregaEarjetas,
                total: action.payload?.page?.totalElements
            };
        case LOTE_ENTREGA_TARJETAS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_LOTE_ENTREGA_TARJETAS:
            return {
                ...state,
                lotesEntregaTarjetaList: [...state.lotesEntregaTarjetaList, action.payload]
            };
        case MODIFICAR_LOTE_ENTREGA_TARJETAS:
            return {
                ...state,
                lotesEntregaTarjetaList: state.lotesEntregaTarjetaList.map(
                    loteEntregaEarjetas => loteEntregaEarjetas.id === action.payload.id ? action.payload : loteEntregaEarjetas
                )
            };
        case ELIMINAR_LOTE_ENTREGA_TARJETAS:
            return {
                ...state,
                lotesEntregaTarjetaList: state.lotesEntregaTarjetaList.filter(loteEntregaEarjetas => loteEntregaEarjetas.id !== action.payload)
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