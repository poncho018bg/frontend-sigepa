
import { REGISTRAR_CURSOS_CAPACITACIONES ,MODIFICAR_CURSOS_CAPACITACIONES,ELIMINAR_CURSOS_CAPACITACIONES,GET_CURSOS_CAPACITACIONES} from 'types/actionTypes';


export default (state, action) => {
    console.log('context');
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case GET_CURSOS_CAPACITACIONES:
            return {
                ...state,
                cursosCapacitacionesList: action.payload
            };
        case REGISTRAR_CURSOS_CAPACITACIONES:
            return {
                ...state,
                cursosCapacitacionesList: [...state.cursosCapacitacionesList, action.payload]
            };
        case ELIMINAR_CURSOS_CAPACITACIONES:
                return {
                  ...state,
                  cursosCapacitacionesList: state.cursosCapacitacionesList.filter( cursosCapacitaciones => cursosCapacitaciones.id !== action.payload )
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