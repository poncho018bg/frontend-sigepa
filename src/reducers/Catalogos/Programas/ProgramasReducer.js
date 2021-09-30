
import { REGISTRAR_PROGRAMAS ,MODIFICAR_PROGRAMAS
    ,ELIMINAR_PROGRAMAS,GET_PROGRAMAS,AGREGAR_PROGRAMA_ERROR,GET_PROGRAMAS_BY_ID,
    CAMBIAR_PAGINA_PROGRAMAS,CAMBIAR_TAMANIO_PAGINA_PROGRAMAS} from 'types/actionTypes';


export default (state, action) => {

    switch (action.type) {
       
        case GET_PROGRAMAS:
            console.log('en programas');
            console.log(action.payload);
            return {
                ...state,
                programasList: action.payload._embedded.programas,
                totalP: action.payload.page.totalElements
            };
        case AGREGAR_PROGRAMA_ERROR:
            console.log(action.type);
                return {
                    ...state,
                    errorInsert: action.payload,
                    mensajeError:'Ocurrio un error'
        }
        case REGISTRAR_PROGRAMAS:
            return {
                ...state,
                errorInsert: false,
                mensajeError:null,
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
   
                    case CAMBIAR_PAGINA_PROGRAMAS:
                        console.log('en el reducer de cambio de pagina');
                        console.log(action.payload);
                        return {
                            ...state,
                       
                            pageP: action.payload,
                        };
        case CAMBIAR_TAMANIO_PAGINA_PROGRAMAS:
                    return {
                        ...state,
                        sizeP: action.payload
                    }
        default:
            return state;
    }
}