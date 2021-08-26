/* import { axiosGet} from "helpers/axios";
import { typesSubmoduloByPerfil } from "../types/types";

// Función que descarga los sistemas de la base de datos
export function obtenerSubmoduloByPerfilAction(idperfil) {
    return async (dispatch) => {
        dispatch(descargarPerfilSubmodulo());
        try {
            const data = await axiosGet(`perfilessubmodulosOverride/${idperfil}`);
            console.log(data);
            dispatch(descargaPerfilSubmoduloExitosa(data));
        } catch (error) {
            console.log(error);
            dispatch(descargaPerfilSubmoduloError())
        }
    }
}



const descargarPerfilSubmodulo = () => ({
    type: typesSubmoduloByPerfil.COMENZAR_DESCARGA_PERFILSUBMODULO,
    payload: true
});

const descargaPerfilSubmoduloExitosa = perfilsubmodulo => ({
    type: typesSubmoduloByPerfil.DESCARGA_PERFILSUBMODULO_EXITO,
    payload: perfilsubmodulo
})
const descargaPerfilSubmoduloError = () => ({
    type: typesSubmoduloByPerfil.DESCARGA_PERFILSUBMODULO_ERROR,
    payload: true
});
 */