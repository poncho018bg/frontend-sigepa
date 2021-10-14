import {
  GET_ACTIVIDADESCONTINUAR, REGISTRAR_ACTIVIDADESCONTINUAR, ELIMINAR_ACTIVIDADESCONTINUAR, MODIFICAR_ACTIVIDADESCONTINUAR,
  AGREGAR_ACTIVIDADESCONTINUAR_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';

export default (state, action) => {

  switch (action.type) {
    case GET_ACTIVIDADESCONTINUAR:
      return {
        ...state,
        actividadescontinuarList: action.payload._embedded.continuidadActividades,
        total: action.payload.page.totalElements
      };
    case AGREGAR_ACTIVIDADESCONTINUAR_ERROR:
      console.log(action.type);
      return {
        ...state,
        error: action.payload
      }
    case REGISTRAR_ACTIVIDADESCONTINUAR:
      return {
        ...state,
        actividadescontinuarList: [...state.actividadescontinuarList, action.payload]
      };
    case MODIFICAR_ACTIVIDADESCONTINUAR:
      return {
        ...state,
        actividadescontinuarList: state.actividadescontinuarList.map(
          actividadescontinuar => actividadescontinuar.id === action.payload.id ? action.payload : actividadescontinuar
        )
      };
    case ELIMINAR_ACTIVIDADESCONTINUAR:
      return {
        ...state,
        //actividadescontinuarList: state.actividadescontinuarList.filter(actividadescontinuar => actividadescontinuar.id !== action.payload)
        actividadescontinuarList: state.actividadescontinuarList.map(
          actividadescontinuar => actividadescontinuar.id === action.payload.id ? action.payload : actividadescontinuar
      )
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