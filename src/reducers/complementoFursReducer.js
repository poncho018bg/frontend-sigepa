import {
    GET_COMPLEMENTO_FURS,
    REGISTRAR_COMPLEMENTO_FURS
} from "../types/actionTypes";

export default (state, action) => {
    console.log("action --->", action.payload);
    switch (action.type) {
        case GET_COMPLEMENTO_FURS:
            return {
                ...state,
                complementoList: action.payload._embedded.compelmento,
                total: action.payload.page.totalElements
            };

        case REGISTRAR_COMPLEMENTO_FURS:
            return {
                ...state,
                direccion: [...state.direccion, action.payload]
            };
        default:
            return state;
    }
}