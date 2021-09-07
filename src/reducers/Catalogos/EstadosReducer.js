import { GET_ESTADOS, REGISTRAR_ESTADOS, ELIMINAR_ESTADOS, MODIFICAR_ESTADOS } from 'types/actionTypes';


export default (state, action) => {

  switch (action.type) {
    case GET_ESTADOS:
      return {
        ...state,
        estadosList: action.payload
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
    default:
      return state;
  }
}