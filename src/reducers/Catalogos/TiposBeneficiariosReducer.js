import { GET_TIPOS_BENEFICIARIOS, REGISTRAR_TIPOS_BENEFICIARIOS, ELIMINAR_TIPOS_BENEFICIARIOS, MODIFICAR_TIPOS_BENEFICIARIOS,
    CAMBIAR_PAGINA, CAMBIAR_TAMANIO_PAGINA } from '../../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_TIPOS_BENEFICIARIOS:
            console.log('en los beneficiarios');
            console.log("payload beneficiarios ---> ",action.payload);
            return {
                ...state,
                tiposBeneficiariosList: action.payload._embedded.tiposBeneficiarios,
                total: action.payload.page.totalElements
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
        case CAMBIAR_PAGINA:
            console.log("cambiar pagina --->> ",action.payload);
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