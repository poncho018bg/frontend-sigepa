import { GET_EXPEDIENTE_PARAMETROS, ACTUALIZAR_EXPEDIENTE, GET_ULTIMO_PROGRAMA_BENEFICIARIO, GET_ETAPAS_BY_PLANTILLA } from '../types/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case GET_EXPEDIENTE_PARAMETROS:
            console.log('action.payload', action.payload)
            return {
                ...state,
                beneficiariosList: action.payload
            };
        case ACTUALIZAR_EXPEDIENTE:
            return {
                ...state,
                expediente: action.payload
            };
        case GET_ULTIMO_PROGRAMA_BENEFICIARIO:
            return {
                ...state,
                programaList: action.payload
            };

        case GET_ETAPAS_BY_PLANTILLA:
            return {
                ...state,
                etapasPlantilla: action.payload
            };
    }
}