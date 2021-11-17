import { GET_ESTATUS_REGISTRO, REGISTRAR_ESTATUS_REGISTRO, ELIMINAR_ESTATUS_REGISTRO, MODIFICAR_ESTATUS_REGISTRO, ESTATUS_REGISTRO_ERROR } from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_ESTATUS_REGISTRO:
            return {
                ...state,
                estatusRegistroList: action.payload
            };
        case ESTATUS_REGISTRO_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_ESTATUS_REGISTRO:
            return {
                ...state,
                estatusRegistroList: [...state.estatusRegistroList, action.payload]
            };
        case MODIFICAR_ESTATUS_REGISTRO:
            return {
                ...state,
                estatusRegistroList: state.estatusRegistroList.map(
                    estatusRegistro => estatusRegistro.id === action.payload.id ? action.payload : estatusRegistro
                )
            };
        case ELIMINAR_ESTATUS_REGISTRO:
            return {
                ...state,
                estatusRegistroList: state.estatusRegistroList.filter(estatusRegistro => estatusRegistro.id !== action.payload)
            };
        default:
            return state;
    }
}