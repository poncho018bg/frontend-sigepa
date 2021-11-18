import {
    GET_ESTATUS_REGISTRO,
    REGISTRAR_ESTATUS_REGISTRO,
    ELIMINAR_ESTATUS_REGISTRO,
    MODIFICAR_ESTATUS_REGISTRO,
    ESTATUS_REGISTRO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_ESTATUS_REGISTRO:
            return {
                ...state,
                estatusRegistroList: action.payload._embedded.estatusRegistros,
                total: action.payload?.page?.totalElements
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