


import {
  GET_MUNICIPIOS, REGISTRAR_MUNICIPIOS, ELIMINAR_MUNICIPIOS, MODIFICAR_MUNICIPIOS, GET_MUNICIPIO,
  CAMBIAR_PAGINA,
  AGREGAR_MUNICIPIOS_ERROR,
  CAMBIAR_TAMANIO_PAGINA,GET_MUNICIPIOS_ID
} from 'types/actionTypes';


export default (state, action) => {

  switch (action.type) {
    case GET_MUNICIPIOS:
      return {
        ...state,
        municipiosList: action.payload._embedded.municipios,
        total: action.payload.page.totalElements
      };
    case AGREGAR_MUNICIPIOS_ERROR:
      console.log(action.type);
      return {
        ...state,
        error: action.payload
      }
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
    case GET_MUNICIPIOS_ID:
        return {
          ...state,
          municipiosListId: action.payload
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