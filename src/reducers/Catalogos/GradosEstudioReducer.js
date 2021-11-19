import {
    GET_GRADO_ESTUDIOS,
    REGISTRAR_GRADO_ESTUDIOS,
    ELIMINAR_GRADO_ESTUDIOS,
    MODIFICAR_GRADO_ESTUDIOS,
    GRADO_ESTUDIOS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_GRADO_ESTUDIOS:
            return {
                ...state,
                gradoEstudiosList: action.payload._embedded.gradoEstudios,
                total: action.payload?.page?.totalElements
            };
        case GRADO_ESTUDIOS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_GRADO_ESTUDIOS:
            return {
                ...state,
                gradoEstudiosList: [...state.gradoEstudiosList, action.payload]
            };
        case MODIFICAR_GRADO_ESTUDIOS:
            return {
                ...state,
                gradoEstudiosList: state.gradoEstudiosList.map(
                    gradoEstudios => gradoEstudios.id === action.payload.id ? action.payload : gradoEstudios
                )
            };
        case ELIMINAR_GRADO_ESTUDIOS:
            return {
                ...state,
                gradoEstudiosList: state.gradoEstudiosList.filter(gradoEstudios => gradoEstudios.id !== action.payload)
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