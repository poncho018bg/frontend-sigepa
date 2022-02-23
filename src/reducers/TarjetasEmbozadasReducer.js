import {
  REGISTRAR_TARJETAS_EMBOZADAS,
  GET_TARJETAS_EMBOZADAS,
  REGISTRAR_TARJETAS_EMBOZADAS_ERROR
} from "../types/actionTypes";

export default (state, action) => { 

  switch (action.type) {
    case GET_TARJETAS_EMBOZADAS:
      return {
        ...state,
        tarjetasList: action.payload,
        loading: action.payload
      };

      case REGISTRAR_TARJETAS_EMBOZADAS_ERROR:
        console.log(action.type);
        return {
            ...state,
            loading: false,
            error: action.payload
        }

    case REGISTRAR_TARJETAS_EMBOZADAS:
      return {
        ...state,
        loadingtx: false,
        tarjetasList: [...state.tarjetasList, action.payload],
      };

    default:
      return state;
  }
};
