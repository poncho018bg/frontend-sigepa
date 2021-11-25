import {
    GET_PADRON_BENEFICIARIOS,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
    GET_DETALLE_PADRON_BENEFICIARIOS

} from 'types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_PADRON_BENEFICIARIOS:
            return {
                ...state,
                padronList: action.payload

            };
            case GET_DETALLE_PADRON_BENEFICIARIOS:
            return {
                ...state,
                beneficiariaList: action.payload

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