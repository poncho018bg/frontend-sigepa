import { GET_SUBMODULOS, REGISTRAR_SUBMODULO, ELIMINAR_SUBMODULO, MODIFICAR_SUBMODULO, GET_MODULO_SUBMODULOS } from '../types/actionTypes';

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
                submoduloList: action.payload
            };
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
        default:
            return state;
    }
}