import { GET_DOCUMENTOS_REQUISITOS, REGISTRAR_DOCUMENTOS_REQUISITOS, MODIFICAR_DOCUMENTOS_REQUISITOS, ELIMINAR_DOCUMENTOS_REQUISITOS, VIGENCIA_DOCUMENTOS_REQUISITOS, GET_VIGENCIAS, GET_PROGRAMAS_DOCUMENTO } from "../../types/actionTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_DOCUMENTOS_REQUISITOS:
            return {
                ...state,
                documentosList: action.payload
            };
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
        default:
            return state;
    }
}