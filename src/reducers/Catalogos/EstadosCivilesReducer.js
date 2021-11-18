import {
    GET_ESTADOS_CIVIL,
    REGISTRAR_ESTADOS_CIVIL,
    ELIMINAR_ESTADOS_CIVIL,
    MODIFICAR_ESTADOS_CIVIL,
    ESTADOS_CIVIL_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_ESTADOS_CIVIL:
            return {
                ...state,
                estadoCivilList: action.payload._embedded.estadosCiviles,
                total: action.payload?.page?.totalElements
            };
        case ESTADOS_CIVIL_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_ESTADOS_CIVIL:
            return {
                ...state,
                estadoCivilList: [...state.estadoCivilList, action.payload]
            };
        case MODIFICAR_ESTADOS_CIVIL:
            return {
                ...state,
                estadoCivilList: state.estadoCivilList.map(
                    estadoCivil => estadoCivil.id === action.payload.id ? action.payload : estadoCivil
                )
            };
        case ELIMINAR_ESTADOS_CIVIL:
            return {
                ...state,
                estadoCivilList: state.estadoCivilList.filter(estadoCivil => estadoCivil.id !== action.payload)
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