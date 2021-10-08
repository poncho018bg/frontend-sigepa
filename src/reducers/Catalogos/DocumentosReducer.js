import { GET_DOCUMENTOS_REQUISITOS, REGISTRAR_DOCUMENTOS_REQUISITOS, MODIFICAR_DOCUMENTOS_REQUISITOS, VIGENCIA_DOCUMENTOS_REQUISITOS, GET_VIGENCIAS, GET_PROGRAMAS_DOCUMENTO, AGREGAR_DOCUMENTOS_ERROR,ELIMINAR_DOCUMENTOS_REQUISITOS } from "../../types/actionTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_DOCUMENTOS_REQUISITOS:
            return {
                ...state,
                documentosList: action.payload
            };
        case AGREGAR_DOCUMENTOS_ERROR:
            console.log(action.type);
            return {
                ...state,
                error: action.payload
            }
        case VIGENCIA_DOCUMENTOS_REQUISITOS:
            return {
                ...state,
                vigenciaList: action.payload
            }
        case GET_VIGENCIAS:
            return {
                ...state,
                todasVigencias: action.payload
            }
        case GET_PROGRAMAS_DOCUMENTO:
            return {
                ...state,
                programasDocumento: action.payload
            }
        case REGISTRAR_DOCUMENTOS_REQUISITOS:
            return {
                ...state,
                documentosList: [...state.documentosList, action.payload]
            };
        case MODIFICAR_DOCUMENTOS_REQUISITOS:
            return {
                ...state,
                documentosList: state.documentosList.map(
                    documentos => documentos.id === action.payload.id ? action.payload : documentos
                )
            };
        case ELIMINAR_DOCUMENTOS_REQUISITOS:
            return {
                ...state,
                documentosList: state.documentosList.filter(documentos => documentos.id !== action.payload)
            };
        default:
            return state;
    }
}