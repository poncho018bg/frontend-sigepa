

import { GET_MUNICIPIOS, REGISTRAR_MUNICIPIOS, ELIMINAR_MUNICIPIOS, MODIFICAR_MUNICIPIOS,GET_MUNICIPIO } from 'types/actionTypes';


export default (state, action) => {

  switch (action.type) {
    case GET_MUNICIPIOS:
      return {
        ...state,
        municipiosList: action.payload
      };
      case GET_MUNICIPIO:
        return {
          ...state,
          municipio: action.payload
        };
    case REGISTRAR_MUNICIPIOS:
      return {
        ...state,
        municipiosList: [...state.municipiosList, action.payload]
      };
    case MODIFICAR_MUNICIPIOS:
      return {
        ...state,
        municipiosList: state.municipiosList.map(
          municipio => municipio.id === action.payload.id ? action.payload : municipio
        )
      };
    case ELIMINAR_MUNICIPIOS:
      return {
        ...state,
        municipiosList: state.municipiosList.filter(municipio => municipio.id !== action.payload)
      };
    default:
      return state;
  }
}