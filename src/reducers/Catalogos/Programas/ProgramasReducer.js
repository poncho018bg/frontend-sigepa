
import { REGISTRAR_PROGRAMAS ,MODIFICAR_CURSOS_CAPACITACIONES
    ,ELIMINAR_PROGRAMAS,GET_PROGRAMAS,AGREGAR_PROGRAMA_ERROR} from 'types/actionTypes';


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
        case MODIFICAR_CURSOS_CAPACITACIONES:
            return {
                ...state,
                cursosCapacitacionesList: state.cursosCapacitacionesList.map(
                    cursosCapacitaciones =>cursosCapacitaciones.id === action.payload.id ? action.payload : cursosCapacitaciones
                )
              };
        default:
            return state;
    }
}