
import { GET_LOCALIDADES,
    REGISTRAR_LOCALIDADES,
    ELIMINAR_LOCALIDADES,
    MODIFICAR_LOCALIDADES,
    CAMBIAR_PAGINA,
    AGREGAR_LOCALIDADES_ERROR,
    CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';

export default (state, action) => {

    switch (action.type) {
       
        case GET_LOCALIDADES:
            console.log('en las localidades');
            console.log(action.payload);
            return {
                ...state,
                localidadesList: action.payload._embedded.localidades,
                total: action.payload.page.totalElements
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