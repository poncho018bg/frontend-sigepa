import { GET_DOCUMENTOS_APOYO } from "../types/actionTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_DOCUMENTOS_APOYO:
            return {
                ...state,
                documentosApoyoList: action.payload
            }
        default:
            return state;
    }
}