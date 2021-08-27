import { GET_EDADES_BENEFICIARIOS, REGISTRAR_EDADES_BENEFICIARIOS, MODIFICAR_EDADES_BENEFICIARIOS, ELIMINAR_EDADES_BENEFICIARIOS } from "../../types/actionTypes";

export default (state, action) => {

    switch (action.type) {
        case GET_EDADES_BENEFICIARIOS:
            return {
                ...state,
                edadesBeneficiariosList: action.payload
            };
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
        default:
            return state;
    }
}