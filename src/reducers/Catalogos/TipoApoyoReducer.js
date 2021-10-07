import { typesTipoApoyo } from "types/types"


const initialState = {
    tipoApoyo: [],
    error: null,
    loading: false,
    tipoApoyoEliminar: null,
    tipoApoyoEditar: null
}


export const TipoApoyoReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesTipoApoyo.COMENZAR_DESCARGA_TIPOAPOYO:
        case typesTipoApoyo.COMENZAR_EDICION_TIPOAPOYO:
        case typesTipoApoyo.AGREGAR_TIPOAPOYO:
            return {
                ...state,
                loading: action.payload
            }
        case typesTipoApoyo.AGREGAR_TIPOAPOYO_EXITO:
            return {
                ...state,
                loading: false,
                tipoApoyo: [...state.tipoApoyo, action.payload]
            }
        case typesTipoApoyo.AGREGAR_TIPOAPOYO_ERROR:
        case typesTipoApoyo.DESCARGA_TIPOAPOYO_ERROR:
        case typesTipoApoyo.TIPOAPOYO_ELIMINADO_ERROR:
        case typesTipoApoyo.TIPOAPOYO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case typesTipoApoyo.DESCARGA_TIPOAPOYO_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                tipoApoyo: action.payload
            }
        case typesTipoApoyo.OBTENER_TIPOAPOYO_ELIMINAR:
            return {
                ...state,
                tipoApoyoEliminar: action.payload
            }
        case typesTipoApoyo.TIPOAPOYO_ELIMINADO_EXITO:
            return {
                ...state,
                tipoApoyo: state.tipoApoyo.filter(tipoApoyo => tipoApoyo.id !== state.tipoApoyoEliminar.id),
                tipoApoyoEliminar: null
            }
        case typesTipoApoyo.OBTENER_TIPOAPOYO_EDITAR:
            return {
                ...state,
                tipoApoyoEditar: action.payload
            }
        case typesTipoApoyo.TIPOAPOYO_EDITADO_EXITO:
            return {
                ...state,
                loading: false,
                tipoApoyoEditar: null,
                tipoApoyo: state.tipoApoyo.map(tipoApoyo =>
                    tipoApoyo.id === action.payload.id ? action.payload : id
                )
            }
        default:
            return state;
    }
}