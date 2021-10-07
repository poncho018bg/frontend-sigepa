import { GET_SUBMODULOSBYPERFIL ,REGISTRAR_SUBMODULOSBYPERFIL,ELIMINAR_SUBMODULOSBYPERFIL,MODIFICAR_SUBMODULOSBYPERFIL} from '../types/actionTypes';

export default (state, action) => {

  switch (action.type) {
    case GET_SUBMODULOSBYPERFIL:
      return {
        ...state,
        submodulosPerfilList: action.payload
      };
    case REGISTRAR_SUBMODULOSBYPERFIL:
        return {
          ...state,
          submodulosPerfilList: [...state.submodulosPerfilList, action.payload]
    };
    case MODIFICAR_SUBMODULOSBYPERFIL:
      return {
        ...state,
        submodulosPerfilList: state.submodulosPerfilList.map(
            submodulosPerfil =>submodulosPerfil.id === action.payload.id ? action.payload : submodulosPerfil
        )
      };
    case ELIMINAR_SUBMODULOSBYPERFIL:
      return {
        ...state,
        submodulosPerfilList: state.submodulosPerfilList.filter( submodulosPerfil => submodulosPerfil.id !== action.payload )
      };
    default:
      return state;
  }
}