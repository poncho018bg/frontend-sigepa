import {
    GET_SUBMODULOS, REGISTRAR_SUBMODULO, ELIMINAR_SUBMODULO, MODIFICAR_SUBMODULO, GET_MODULO_SUBMODULOS,
    AGREGAR_SUBMODULOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from '../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_SUBMODULOS:
            return {
                ...state,
                submoduloList: action.payload

            };
        case GET_MODULO_SUBMODULOS:
            return {
                ...state,
                submoduloList: action.payload._embedded.modulos,
                total: action.payload.page.totalElements
            };
        case AGREGAR_SUBMODULOS_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_SUBMODULO:
            return {
                ...state,
                submoduloList: [...state.submoduloList, action.payload]
            };
        case MODIFICAR_SUBMODULO:
            return {
                ...state,
                submoduloList: state.submoduloList.map(
                    submodulo => submodulo.id === action.payload.id ? action.payload : submodulo
                )
            };
        case ELIMINAR_SUBMODULO:
            return {
                ...state,
                submoduloList: state.submoduloList.filter(submodulo => submodulo.id !== action.payload)
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