
import { REGISTRAR_PROGRAMAS ,MODIFICAR_PROGRAMAS
    ,ELIMINAR_PROGRAMAS,GET_PROGRAMAS,AGREGAR_PROGRAMA_ERROR,GET_PROGRAMAS_BY_ID} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
       
        case GET_PROGRAMAS:
            return {
                ...state,
                programasList: action.payload
            };
        case AGREGAR_PROGRAMA_ERROR:
            console.log(action.type);
                return {
                    ...state,
                    error: action.payload
        }
        case REGISTRAR_PROGRAMAS:
            return {
                ...state,
                programasList: [...state.programasList, action.payload]
            };
        case ELIMINAR_PROGRAMAS:
                return {
                  ...state,
                  programasList: state.programasList.filter( 
                      programa => programa.id !== action.payload )
                };
        case MODIFICAR_PROGRAMAS:
            return {
                ...state,
                programasList: state.programasList.map(
                    p =>p.id === action.payload.id ? action.payload : p
                )
              };
        case GET_PROGRAMAS_BY_ID:
                return {
                    ...state,
                    programa: action.payload
                };
        default:
            return state;
    }
}