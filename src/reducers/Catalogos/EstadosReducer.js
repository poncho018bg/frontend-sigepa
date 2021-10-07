import {
  GET_ESTADOS, REGISTRAR_ESTADOS, ELIMINAR_ESTADOS, MODIFICAR_ESTADOS, GET_ESTADO,
  AGREGAR_ESTADOS_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';


export default (state, action) => {

  switch (action.type) {
    case GET_ESTADOS:
      return {
        ...state,
        estadosList: action.payload._embedded.estados,
        total: action.payload.page.totalElements
      };
    case AGREGAR_ESTADOS_ERROR:
      console.log(action.type);
      return {
        ...state,
        error: action.payload
      }
    case GET_ESTADO:
      return {
        ...state,
        estado: action.payload
      };
    case REGISTRAR_ESTADOS:
      return {
        ...state,
        estadosList: [...state.estadosList, action.payload]
      };
    case MODIFICAR_ESTADOS:
      return {
        ...state,
        estadosList: state.estadosList.map(
          estado => estado.id === action.payload.id ? action.payload : estado
        )
      };
    case ELIMINAR_ESTADOS:
      return {
        ...state,
        estadosList: state.estadosList.filter(estado => estado.id !== action.payload)
      };
    case CAMBIAR_PAGINA:
      return {
        ...state,
        page: action.payload
      }
    case CAMBIAR_TAMANIO_PAGINA:
      return {
        ...state,
        size: action.payload
      }
    default:
      return state;
  }
}