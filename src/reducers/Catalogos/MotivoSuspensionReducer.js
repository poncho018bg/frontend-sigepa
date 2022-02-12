import {
  GET_MOTIVO_SUSPENSION,
  REGISTRAR_MOTIVO_SUSPENSION,
  MODIFICAR_MOTIVO_SUSPENSION,
  ELIMINAR_MOTIVO_SUSPENSION,
  AGREGAR_MOTIVO_SUSPENSION_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA,
  GET_BANDEJA_SUSPENSION,
  REGISTRAR_BANDEJA_MOTIVO_RECHAZO,
  ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO,
} from "../../types/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_MOTIVO_SUSPENSION:
      return {
        ...state,
        motivoSuspensionList: action.payload._embedded.motivoSuspension,
        total: action.payload?.page?.totalElements,
      };
    case AGREGAR_MOTIVO_SUSPENSION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case REGISTRAR_MOTIVO_SUSPENSION:
      return {
        ...state,
        motivoSuspensionList: [...state.motivoSuspensionList, action.payload],
      };
    case ELIMINAR_MOTIVO_SUSPENSION:
    case MODIFICAR_MOTIVO_SUSPENSION:
      return {
        ...state,
        motivoSuspensionList: state.motivoSuspensionList.map(
          (motivosSuspension) =>
            motivosSuspension.id === action.payload.id
              ? action.payload
              : motivosSuspension
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
    case GET_BANDEJA_SUSPENSION:
      return {
        ...state,
        bandejaSuspensionList: action.payload,
      };
    case REGISTRAR_BANDEJA_MOTIVO_RECHAZO:
      return {
        ...state,
        bandejaMotivoSuspension: action.payload,
      };
    case ACTUALIZAR_BANDEJA_MOTIVO_RECHAZO:
    default:
      return state;
  }
};
