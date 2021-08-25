import { typesPerfilSubmodulo } from "../types/types";

// cada reducer tiene su propio state
const initialState = {
    perfilSubmodulos: [],
    error: null,
    loading: false,
    perfilSubmodulosEliminar: null,
    perfilSubmodulosEditar: null
}

export const perfilSubmodulosReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesPerfilSubmodulo.COMENZAR_DESCARGA_PERFILSUBMODULO:
        case typesPerfilSubmodulo.COMENZAR_EDICION_PERFILSUBMODULO:
        case typesPerfilSubmodulo.AGREGAR_PERFILSUBMODULO:
            return {
                ...state,
                loading: action.payload
            }
        case typesPerfilSubmodulo.AGREGAR_PERFILSUBMODULO_EXITO:
            return {
                ...state,
                loading: false,
                perfilSubmodulos: [...state.perfilmodulo, action.payload]
            }
        case typesPerfilSubmodulo.AGREGAR_PERFILSUBMODULO_ERROR:
        case typesPerfilSubmodulo.DESCARGA_PERFILSUBMODULO_ERROR:
        case typesPerfilSubmodulo.PERFILSUBMODULO_DELETE_ERROR:
        case typesPerfilSubmodulo.PERFILSUBMODULO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case typesPerfilSubmodulo.DESCARGA_PERFILSUBMODULO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                perfilSubmodulos: action.payload
            }
        case typesPerfilSubmodulo.OBTENER_PERFILSUBMODULO_ELIMINAR:
            return {
                ...state,
                perfilSubmodulosEliminar: action.payload
            }
        case typesPerfilSubmodulo.PERFILSUBMODULO_ELIMINADO_EXITO:
            return {
                ...state,
                perfilSubmodulos: state.perfilmodulo.filter(perfilmodulo => perfilmodulo.id !== state.perfilSubmodulosEliminar),
                perfilSubmodulosEliminar: null
            }
        case typesPerfilSubmodulo.OBTENER_PERFILSUBMODULO_EDITAR:
            return {
                ...state,
                perfilSubmodulosEditar: action.payload
            }
        case typesPerfilSubmodulo.PERFILSUBMODULO_EDITADO_EXITO:
            return {
                ...state,
                loading: false,
                perfilSubmodulosEditar: null,
                perfilSubmodulos: state.perfilmodulo.map(perfilSubmodulos =>
                    perfilSubmodulos.id === action.payload.id ? action.payload : perfilSubmodulos
                )
            }
        default:
            return state;
    }
}