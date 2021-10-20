import {
    GET_MODULOS, REGISTRAR_MODULO, ELIMINAR_MODULO, MODIFICAR_MODULO,
    AGREGAR_MODULO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from '../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_MODULOS:
            return {
                ...state,
                moduloList: action.payload._embedded.modulos,
                total: action.payload?.page?.totalElements
            };
        case AGREGAR_MODULO_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_MODULO:
            return {
                ...state,
                moduloList: [...state.moduloList, action.payload]
            };
        case MODIFICAR_MODULO:
            return {
                ...state,
                moduloList: state.moduloList.map(
                    modulo => modulo.id === action.payload.id ? action.payload : modulo
                )
            };
        case ELIMINAR_MODULO:
            return {
                ...state,
                moduloList: state.moduloList.filter(modulo => modulo.id !== action.payload)
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