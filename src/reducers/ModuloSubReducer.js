import { GET_MODULO_SUBMODULOS } from '../types/actionTypes';


export default (state, action) => {

    switch (action.type) {

        case GET_MODULO_SUBMODULOS:
            return {
                ...state,
                submoduloList: action.payload
            };

        default:
            return state;
    }
}