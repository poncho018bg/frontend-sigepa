import { GET_PERSONS,REGISTRAR_PERSONA,ELIMINAR_PERSONA,MODIFICAR_PERSONA} from '../types/actionTypes';

export default (state, action) => {

  switch (action.type) {
    case GET_PERSONS:
      return {
        ...state,
        personList: action.payload
      };
    case REGISTRAR_PERSONA:
        return {
          ...state,
          personList: [...state.personList, action.payload]
    };
    case MODIFICAR_PERSONA:
      return {
        ...state,
        personList: state.personList.map(
          persona =>persona.id === action.payload.id ? action.payload : persona
        )
      };
    case ELIMINAR_PERSONA:
      return {
        ...state,
        personList: state.personList.filter( persona => persona.id !== action.payload )
      };
    default:
      return state;
  }
}