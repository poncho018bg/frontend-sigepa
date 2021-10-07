import { GET_COMITE_SECRETARIAS, REGISTRAR_COMITE_SECRETARIAS, ELIMINAR_COMITE_SECRETARIAS, MODIFICAR_COMITE_SECRETARIAS} from '../../types/actionTypes';

export default (state, action) => {

    switch (action.type) {
        case GET_COMITE_SECRETARIAS:
            return {
                ...state,
                comiteSecretariasList: action.payload
            };
        case REGISTRAR_COMITE_SECRETARIAS:
            return {
                ...state,
                comiteSecretariasList: [...state.comiteSecretariasList, action.payload]
            };
        case MODIFICAR_COMITE_SECRETARIAS:
            return {
                ...state,
                comiteSecretariasList: state.comiteSecretariasList.map(
                    comiteSecretarias => comiteSecretarias.id === action.payload.id ? action.payload : comiteSecretarias
                )
            };
        case ELIMINAR_COMITE_SECRETARIAS:
            return {
                ...state,
                comiteSecretariasList: state.comiteSecretariasList.filter(comiteSecretarias => comiteSecretarias.id !== action.payload)
            };
        default:
            return state;
    }
}