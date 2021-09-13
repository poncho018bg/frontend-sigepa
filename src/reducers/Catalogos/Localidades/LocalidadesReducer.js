
import { GET_LOCALIDADES,
    REGISTRAR_LOCALIDADES,
    ELIMINAR_LOCALIDADES,
    MODIFICAR_LOCALIDADES,
    AGREGAR_LOCALIDADES_ERROR
} from 'types/actionTypes';

export default (state, action) => {

    switch (action.type) {
       
        case GET_LOCALIDADES:
            return {
                ...state,
                localidadesList: action.payload
            };
        case AGREGAR_LOCALIDADES_ERROR:
            console.log(action.type);
                return {
                    ...state,
                    error: action.payload
        }
        case REGISTRAR_LOCALIDADES:
            return {
                ...state,
                localidadesList: [...state.localidadesList, action.payload]
            };
        case ELIMINAR_LOCALIDADES:
                return {
                  ...state,
                  localidadesList: state.localidadesList.filter( cursosCapacitaciones => cursosCapacitaciones.id !== action.payload )
                };
        case MODIFICAR_LOCALIDADES:
            return {
                ...state,
                localidadesList: state.localidadesList.map(
                    cursosCapacitaciones =>cursosCapacitaciones.id === action.payload.id ? action.payload : cursosCapacitaciones
                )
              };
        default:
            return state;
    }
}