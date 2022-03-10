import {
    GET_REGIONES,
    REGISTRAR_REGIONES,
    ELIMINAR_REGIONES,
    MODIFICAR_REGIONES,
    REGIONES_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_REGIONES:
            return {
                ...state,
                regionesList: action.payload._embedded.regiones,
                total: action.payload?.page?.totalElements
            };
        case REGIONES_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_REGIONES:
            return {
                ...state,
                regionesList: [...state.regionesList, action.payload]
            };
        case MODIFICAR_REGIONES:
            return {
                ...state,
                regionesList: state.regionesList.map(
                    regiones => regiones.id === action.payload.id ? action.payload : regiones
                )
            };
        case ELIMINAR_REGIONES:
            return {
                ...state,
                regionesList: state.regionesList.filter(regiones => regiones.id !== action.payload)
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