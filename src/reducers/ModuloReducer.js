import { GET_MODULOS, REGISTRAR_MODULO, ELIMINAR_MODULO, MODIFICAR_MODULO } from '../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_MODULOS:
            return {
                ...state,
                moduloList: action.payload
            };
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
        default:
            return state;
    }
}