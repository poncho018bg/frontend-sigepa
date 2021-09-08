import { GET_REGIONMUNICIPIOS,REGISTRAR_REGIONMUNICIPIOS,ELIMINAR_REGIONMUNICIPIOS,MODIFICAR_REGIONMUNICIPIOS} from 'types/actionTypes';


export default (state, action) => {

  switch (action.type) {
    case GET_REGIONMUNICIPIOS:
      return {
        ...state,
        regionList: action.payload
      };
    case REGISTRAR_REGIONMUNICIPIOS:
        return {
          ...state,
          regionList: [...state.regionList, action.payload]
    };
    case MODIFICAR_REGIONMUNICIPIOS:
      return {
        ...state,
        regionList: state.regionList.map(
          region =>region.idRegion === action.payload.idRegion ? action.payload : region
        )
      };
    case ELIMINAR_REGIONMUNICIPIOS:
      return {
        ...state,
        regionList: state.regionList.filter( region => region.idRegion !== action.payload )
      };
    default:
      return state;
  }
}