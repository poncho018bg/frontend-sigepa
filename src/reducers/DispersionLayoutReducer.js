import {
    GET_DISPERSION_LAYOUT,
    REGISTRAR_DISPERSION_LAYOUT,
    DISPERSION_LAYOUT_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_DISPERSION_LAYOUT:
            return {
                ...state,
                dispersionLayouList: action.payload
            };
        case DISPERSION_LAYOUT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_DISPERSION_LAYOUT:
            return {
                ...state,
                dispersionLayouList: [...state.dispersionLayouList, action.payload]
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