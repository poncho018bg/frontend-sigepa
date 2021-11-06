import { typesFormioComplemento } from "types/types";

const initialState = {
    formioComplemento: [],
    activeFormio: null
};


export const formioComplementoReducer = (state = initialState, action) => {

    switch (action.type) {

        case typesFormioComplemento.FORMIO_COMPLEMENTO_SETACTIVE:
            return {
                ...state,
                activeFormioComplemento: action.payload
            }

        case typesFormioComplemento.FORMIO_COMPLEMENTO_NEW:
            return {
                ...state,
                formioComplemento: [
                    ...state.formioComplemento,
                    action.payload
                ]
            }

        case typesFormioComplemento.FORMIO_COMPLEMENTO_UPDATED:
            return {
                ...state,
                formioComplemento: state.formioComplemento.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case typesFormioComplemento.FORMIO_COMPLEMENTO_LOADED:
            return {
                ...state,
                formioComplemento: [...action.payload]
            }

        case typesFormioComplemento.FORMIO_COMPLEMENTO_LOADED_REGISTRO:
            return {
                ...state,
                formioComplemento: [...action.payload]
            }

        default:
            return state;
    }


}
