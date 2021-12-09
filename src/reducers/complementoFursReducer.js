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
                complementoList: action.payload.complemento
            };

        case REGISTRAR_COMPLEMENTO_FURS:
            return {
                ...state,
                complemento: [...state.complemento, action.payload]
            };
        default:
            return state;
    }
}