import { typesKeycloak } from "../types/types";

const initialState = {
    roles: [],
    error: null,
    loading: false
}


export const rolReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesKeycloak.COMENZAR_DESCARGA_KEYCLOAK:
            return {
                ...state,
                loading: action.payload
            }

        case typesKeycloak.DESCARGA_KEYCLOAK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case typesKeycloak.DESCARGA_KEYCLOAK_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                roles: action.payload
            }

        default:
            return state;
    }
}