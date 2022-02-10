import {
  GET_EMBOZO_TARJETAS,
  AGREGAR_SOLICITUD_FOLIO_ERROR,
  GUARDAR_EMBOZO_TARJETAS,
} from "../types/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_EMBOZO_TARJETAS:
      return {
        ...state,
        embozoBeneficiarios: action.payload,
      };
    case AGREGAR_SOLICITUD_FOLIO_ERROR:
      console.log("err", action.type);
      return {
        ...state,
        error: action.payload,
      };
    case GUARDAR_EMBOZO_TARJETAS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
