import {
  GET_EMBOZO_TARJETAS,
  AGREGAR_SOLICITUD_FOLIO_ERROR,
  GUARDAR_EMBOZO_TARJETAS,
  GET_ETIQUETADO_TARJETAS,
  GUARDAR_ETIQUETADO_TARJETAS,
  GET_ETIQUETA_EVENTO,
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
    case GET_ETIQUETADO_TARJETAS:
      return {
        ...state,
        etiquetadoBeneficiarios: action.payload,
      };
    case GUARDAR_ETIQUETADO_TARJETAS:
      return {
        ...state,
      };
    case GET_ETIQUETA_EVENTO:
      return {
        ...state,
        eventoTarjetasEtiquetadas: action.payload,
      };
    default:
      return state;
  }
};
