import {
  REGISTRAR_PROGRAMAS,
  MODIFICAR_PROGRAMAS,
  ELIMINAR_PROGRAMAS,
  GET_PROGRAMAS,
  AGREGAR_PROGRAMA_ERROR,
  GET_PROGRAMAS_BY_ID,
  CAMBIAR_PAGINA,
  CAMBIAR_TAMANIO_PAGINA,
  GET_PROGRAMASACTIVOS,
  GET_DOCUMENTOS_PROGRAMAS,
  GET_MUNICIPIOS_PROGRAMAS,
  GET_IMAGEN_PROGRAMAS,
  GET_PROGRAMAS_BY_URL,
  GET_PROGRAMAS_ACTIVOS
} from "types/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_PROGRAMAS:
      console.log("en programas");
      console.log(action.payload);
      return {
        ...state,
        programasList: action.payload._embedded.programas,
        total: action.payload?.page?.totalElements,
      };
    case GET_PROGRAMAS_ACTIVOS:
      console.log("en programas");
      console.log(action.payload);
      return {
        ...state,
        programasList: action.payload,
        total: action.payload?.page?.totalElements,
      };
    case GET_PROGRAMASACTIVOS:
      return {
        ...state,
        programasList: action.payload,
      };
    case AGREGAR_PROGRAMA_ERROR:
      console.log(action.type);
      return {
        ...state,
        errorInsert: action.payload,
        mensajeError: "Ocurrio un error",
      };
    case REGISTRAR_PROGRAMAS:
      return {
        ...state,
        errorInsert: false,
        mensajeError: null,
        programasList: [...state.programasList, action.payload],
      };
    case ELIMINAR_PROGRAMAS:
      return {
        ...state,
        //programasList: state.programasList.filter(programa => programa.id !== action.payload)
        programasList: state.programasList.map((programa) =>
          programa.id === action.payload.id ? action.payload : programa
        ),
      };
    case MODIFICAR_PROGRAMAS:
      return {
        ...state,
        programasList: state.programasList.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case GET_PROGRAMAS_BY_ID:
      return {
        ...state,
        programa: action.payload,
      };

    case CAMBIAR_PAGINA:
      return {
        ...state,
        page: action.payload,
      };
    case CAMBIAR_TAMANIO_PAGINA:
      return {
        ...state,
        size: action.payload,
      };
    case GET_MUNICIPIOS_PROGRAMAS:
      return {
        ...state,
        programasMunicipiosList:
          action.payload._embedded.coberturaApoyos === undefined
            ? action.payload._embedded.coberturaApoyoses
            : action.payload._embedded.coberturaApoyos,
      };
    case GET_DOCUMENTOS_PROGRAMAS:
      return {
        ...state,
        programasDocumentosList: action.payload._embedded.documentosRequisitos,
      };
    case GET_IMAGEN_PROGRAMAS:
      return {
        ...state,
        imagenprg: action.payload,
      };
    case GET_PROGRAMAS_BY_URL:
      return {
        ...state,
        idPrograma: action.payload,
      };
    default:
      return state;
  }
};
