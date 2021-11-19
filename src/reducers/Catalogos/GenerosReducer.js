import {
    GET_GENERO,
    REGISTRAR_GENERO,
    ELIMINAR_GENERO,
    MODIFICAR_GENERO,
    GENERO_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_GENERO:
            return {
                ...state,
                generosList: action.payload._embedded.generos,
                total: action.payload?.page?.totalElements
            };
        case GENERO_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_GENERO:
            return {
                ...state,
                generosList: [...state.generosList, action.payload]
            };
        case MODIFICAR_GENERO:
            return {
                ...state,
                generosList: state.generosList.map(
                    genero => genero.id === action.payload.id ? action.payload : genero
                )
            };
        case ELIMINAR_GENERO:
            return {
                ...state,
                generosList: state.generosList.filter(genero => genero.id !== action.payload)
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