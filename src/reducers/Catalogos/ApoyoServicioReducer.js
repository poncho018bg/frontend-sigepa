import {
  GET_APOYOSERVICIO, REGISTRAR_APOYOSERVICIO, ELIMINAR_APOYOSERVICIO, MODIFICAR_APOYOSERVICIO,
  AGREGAR_APOYOSERVICIO_ERROR,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';



export default (state, action) => {

  switch (action.type) {
    case GET_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: action.payload._embedded.apoyosServicios,
        total: action.payload?.page?.totalElements
      };
    case AGREGAR_APOYOSERVICIO_ERROR:
      console.log(action.type);
      return {
        ...state,
        error: action.payload
      }
    case REGISTRAR_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: [...state.apoyoservicioList, action.payload]
      };
    case MODIFICAR_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: state.apoyoservicioList.map(
          apoyoservicio => apoyoservicio.id === action.payload.id ? action.payload : apoyoservicio
        )
      };
    case ELIMINAR_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: state.apoyoservicioList.map(
          apoyoservicio => apoyoservicio.id === action.payload.id ? action.payload : apoyoservicio
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