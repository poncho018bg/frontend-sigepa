import {
  GET_BANDEJA_RECHAZOS,
  REGISTRAR_BANDEJA_RECHAZOS,
  ELIMINAR_BANDEJA_RECHAZOS,
  MODIFICAR_BANDEJA_RECHAZOS,
  BANDEJA_RECHAZOS_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA,
  REGISTRAR_BANDEJA_SUSPENSION
} from "types/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_BANDEJA_RECHAZOS:
      return {
        ...state,
        bandejaRechazosList: action.payload._embedded.bandejaRechazos,
        total: action.payload?.page?.totalElements,
      };
    case BANDEJA_RECHAZOS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case REGISTRAR_BANDEJA_RECHAZOS:
      return {
        ...state,
        bandejaRechazosList: [...state.bandejaRechazosList, action.payload],
      };
    case REGISTRAR_BANDEJA_SUSPENSION:
      return {
        ...state,
        bandejaSuspensionList: [...state.bandejaSuspensionList, action.payload],
      };
    case MODIFICAR_BANDEJA_RECHAZOS:
      return {
        ...state,
        bandejaRechazosList: state.bandejaRechazosList.map((bandejaRechazos) =>
          bandejaRechazos.id === action.payload.id
            ? action.payload
            : bandejaRechazos
        ),
      };
    case ELIMINAR_BANDEJA_RECHAZOS:
      return {
        ...state,
        bandejaRechazosList: state.bandejaRechazosList.filter(
          (bandejaRechazos) => bandejaRechazos.id !== action.payload
        ),
      };
    case CAMBIAR_PAGINA:
      return {
        ...state,
        page: action.payload,
      };
    case CAMBIAR_TAMANIO_PAGINA:
      return {
        ...state,
        size: action.payload,
      };
    default:
      return state;
  }
};
