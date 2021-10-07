import {
    GET_GENEROS,
    GET_GRADO_ESTUDIOS,
    GET_ESTADO_CIVIL,
    GET_IDENTIFICACIONES_OFICIALES
} from "../types/actionTypes";

export default (state, action) => {
    console.log("action --->", action.payload);
    switch (action.type) {
        case GET_GENEROS:
            return {
                ...state,
                generosList: action.payload._embedded.generos,
                total: action.payload.page.totalElements
            };
        case GET_GRADO_ESTUDIOS:
            return {
                ...state,
                estudiosList: action.payload._embedded.gradoEstudios,
                total: action.payload.page.totalElements
            };
        case GET_ESTADO_CIVIL:
            return {
                ...state,
                estadoCivilList: action.payload._embedded.estadosCiviles,
                total: action.payload.page.totalElements
            };
        case GET_IDENTIFICACIONES_OFICIALES:
            return {
                ...state,
                identificacionesList: action.payload._embedded.identificacionesOficiales,
                total: action.payload.page.totalElements
            };
        default:
            return state;
    }
}