import { GET_ACTIVIDADESCONTINUAR,REGISTRAR_ACTIVIDADESCONTINUAR,ELIMINAR_ACTIVIDADESCONTINUAR,MODIFICAR_ACTIVIDADESCONTINUAR} from 'types/actionTypes';

export default (state, action) => {

    switch (action.type) {
      case GET_ACTIVIDADESCONTINUAR:
        return {
          ...state,
          actividadescontinuarList: action.payload
        };
      case REGISTRAR_ACTIVIDADESCONTINUAR:
          return {
            ...state,
            actividadescontinuarList: [...state.actividadescontinuarList, action.payload]
      };
      case MODIFICAR_ACTIVIDADESCONTINUAR:
        return {
          ...state,
          actividadescontinuarList: state.actividadescontinuarList.map(
            actividadescontinuar =>actividadescontinuar.id === action.payload.id ? action.payload : actividadescontinuar
          )
        };
      case ELIMINAR_ACTIVIDADESCONTINUAR:
        return {
          ...state,
          actividadescontinuarList: state.actividadescontinuarList.filter( actividadescontinuar => actividadescontinuar.id !== action.payload )
        };
      default:
        return state;
    }
  }