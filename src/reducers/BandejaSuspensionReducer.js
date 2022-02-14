import {
    GET_BANDEJA_SUSPENSION,
    REGISTRAR_BANDEJA_SUSPENSION,
    ELIMINAR_BANDEJA_SUSPENSION,
    MODIFICAR_BANDEJA_SUSPENSION,
    BANDEJA_SUSPENSION_ERROR,    
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA,
    
  } from "types/actionTypes";
  
  export default (state, action) => {
    switch (action.type) {
      case GET_BANDEJA_SUSPENSION:
        return {
          ...state,
          bandejaSuspensionList: action.payload._embedded.bandejaSuspesion,
          total: action.payload?.page?.totalElements,
        };
      case BANDEJA_SUSPENSION_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case REGISTRAR_BANDEJA_SUSPENSION:
        return {
          ...state,
          bandejaSuspensionList: [...state.bandejaSuspensionList, action.payload],
        };
      case MODIFICAR_BANDEJA_SUSPENSION:
        return {
          ...state,
          bandejaSuspensionList: state.bandejaSuspensionList.map((bandejaSuspesion) =>
            bandejaSuspesion.id === action.payload.id
              ? action.payload
              : bandejaSuspesion
          ),
        };
      case ELIMINAR_BANDEJA_SUSPENSION:
        return {
          ...state,
          bandejaSuspensionList: state.bandejaSuspensionList.filter(
            (bandejaSuspesion) => bandejaSuspesion.id !== action.payload
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
  