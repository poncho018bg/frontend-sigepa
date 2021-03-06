import {
    GET_EDADES_BENEFICIARIOS, REGISTRAR_EDADES_BENEFICIARIOS, MODIFICAR_EDADES_BENEFICIARIOS, ELIMINAR_EDADES_BENEFICIARIOS,
    CAMBIAR_PAGINA,
    AGREGAR_LOCALIDADES_ERROR,
    CAMBIAR_TAMANIO_PAGINA,
    GET_EDADES_BENEFICIARIOS_BY_ID
} from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_EDADES_BENEFICIARIOS:
            return {
                ...state,
                edadesBeneficiariosList: action.payload._embedded.edadesBeneficiarios,
                total: action.payload?.page?.totalElements
            };
        case AGREGAR_LOCALIDADES_ERROR:

            return {
                ...state,
                error: action.payload
            }
        case REGISTRAR_EDADES_BENEFICIARIOS:
            return {
                ...state,
                edadesBeneficiariosList: [...state.edadesBeneficiariosList, action.payload]
            };
        case MODIFICAR_EDADES_BENEFICIARIOS:
            return {
                ...state,
                edadesBeneficiariosList: state.edadesBeneficiariosList.map(
                    edadBeneficiario => edadBeneficiario.id === action.payload.id ? action.payload : edadBeneficiario
                )
            };
        case ELIMINAR_EDADES_BENEFICIARIOS:
            return {
                ...state,
                edadesBeneficiariosList: state.edadesBeneficiariosList.filter(edadBeneficiario => edadBeneficiario.id !== action.payload)
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
        case GET_EDADES_BENEFICIARIOS_BY_ID:
            return {
                ...state,
                edadesBeneficiario: action.payload
            };
        default:
            return state;
    }
}