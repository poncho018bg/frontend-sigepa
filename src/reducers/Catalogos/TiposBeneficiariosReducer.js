import { GET_TIPOS_BENEFICIARIOS, REGISTRAR_TIPOS_BENEFICIARIOS, ELIMINAR_TIPOS_BENEFICIARIOS, MODIFICAR_TIPOS_BENEFICIARIOS } from '../../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_TIPOS_BENEFICIARIOS:
            return {
                ...state,
                tiposBeneficiariosList: action.payload
            };
        case REGISTRAR_TIPOS_BENEFICIARIOS:
            return {
                ...state,
                tiposBeneficiariosList: [...state.tiposBeneficiariosList, action.payload]
            };
        case MODIFICAR_TIPOS_BENEFICIARIOS:
            return {
                ...state,
                tiposBeneficiariosList: state.tiposBeneficiariosList.map(
                    tipoBeneficiario => tipoBeneficiario.id === action.payload.id ? action.payload : tipoBeneficiario
                )
            };
        case ELIMINAR_TIPOS_BENEFICIARIOS:
            return {
                ...state,
                tiposBeneficiariosList: state.tiposBeneficiariosList.filter(tipoBeneficiario => tipoBeneficiario.id !== action.payload)
            };
        default:
            return state;
    }
}