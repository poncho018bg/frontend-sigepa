import { GET_BTACTIVIDADES, REGISTRAR_BTACTIVIDADES, ELIMINAR_BTACTIVIDADES, MODIFICAR_BTACTIVIDADES } from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
        case GET_BTACTIVIDADES:
            return {
                ...state,
                btActividadesList: action.payload
            };
        case REGISTRAR_BTACTIVIDADES:
            return {
                ...state,
                btActividadesList: [...state.btActividadesList, action.payload]
            };
        case MODIFICAR_BTACTIVIDADES:
            return {
                ...state,
                btActividadesList: state.btActividadesList.map(
                    btActividades => btActividades.id === action.payload.id ? action.payload : btActividades
                )
            };
        case ELIMINAR_BTACTIVIDADES:
            return {
                ...state,
                btActividadesList: state.btActividadesList.filter(btActividades => btActividades.id !== action.payload)
            };
        default:
            return state;
    }
}