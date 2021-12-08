import {
    GET_TIPO_REQUISITOS,
    REGISTRARc_TIPO_REQUISITOS,
    ELIMINAR_TIPO_REQUISITOS,
    MODIFICAR_TIPO_REQUISITOS,
    TIPO_REQUISITOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_TIPO_REQUISITOS:
            return {
                ...state,
                tipoRequisitosList: action.payload._embedded.tipoRequisitos,
                total: action.payload?.page?.totalElements
            };
        case TIPO_REQUISITOS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRARc_TIPO_REQUISITOS:
            return {
                ...state,
                tipoRequisitosList: [...state.tipoRequisitosList, action.payload]
            };
        case MODIFICAR_TIPO_REQUISITOS:
            return {
                ...state,
                tipoRequisitosList: state.tipoRequisitosList.map(
                    tipoRequisitos => tipoRequisitos.id === action.payload.id ? action.payload : tipoRequisitos
                )
            };
        case ELIMINAR_TIPO_REQUISITOS:
            return {
                ...state,
                tipoRequisitosList: state.tipoRequisitosList.filter(tipoRequisitos => tipoRequisitos.id !== action.payload)
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