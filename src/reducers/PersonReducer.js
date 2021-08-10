import { GET_PERSONS,REGISTRAR_PERSONA} from '../types/actionTypes';

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
    default:
      return state;
  }
}