import { GET_APOYOS, REGISTRAR_APOYOS, ELIMINAR_APOYOS, MODIFICAR_APOYOS } from 'types/actionTypes';



export default (state, action) => {

    switch (action.type) {
        case GET_APOYOS:
            return {
                ...state,
                apoyosList: action.payload
            };
        case REGISTRAR_APOYOS:
            return {
                ...state,
                apoyosList: [...state.apoyosList, action.payload]
            };
        case MODIFICAR_APOYOS:
            return {
                ...state,
                apoyosList: state.apoyosList.map(
                    apoyo => apoyo.id === action.payload.id ? action.payload : apoyo
                )
            };
        case ELIMINAR_APOYOS:
            return {
                ...state,
                apoyosList: state.apoyosList.filter(apoyo => apoyo.id !== action.payload)
            };
        default:
            return state;
    }
}