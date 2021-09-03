import { GET_APOYOSERVICIO,REGISTRAR_APOYOSERVICIO,ELIMINAR_APOYOSERVICIO,MODIFICAR_APOYOSERVICIO} from 'types/actionTypes';



export default (state, action) => {

  switch (action.type) {
    case GET_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: action.payload
      };
    case REGISTRAR_APOYOSERVICIO:
        return {
          ...state,
          apoyoservicioList: [...state.apoyoservicioList, action.payload]
    };
    case MODIFICAR_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: state.apoyoservicioList.map(
          apoyoservicio =>apoyoservicio.id === action.payload.id ? action.payload : apoyoservicio
        )
      };
    case ELIMINAR_APOYOSERVICIO:
      return {
        ...state,
        apoyoservicioList: state.apoyoservicioList.filter( apoyoservicio => apoyoservicio.id !== action.payload )
      };
    default:
      return state;
  }
}