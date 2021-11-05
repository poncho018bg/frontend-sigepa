import { axiosGet } from "helpers/axiosKeycloak";
import { typesKeycloak } from "../types/types";

export function obtenerRolesAction(token) {
    return async (dispatch) => {
        dispatch(descargarRoles());
        try {
            const data = await axiosGet(`groups`,token);
            console.log('R.->',data);
            dispatch(descargaRolesExitosa(data));
        } catch (error) {
            console.log(error);
            dispatch(descargaRolesError())
        }
    }
}

const descargarRoles = () => ({
    type: typesKeycloak.COMENZAR_DESCARGA_KEYCLOAK,
    payload: true
});

const descargaRolesExitosa = roles => ({
    type: typesKeycloak.DESCARGA_KEYCLOAK_EXITO,
    payload: roles
})
const descargaRolesError = () => ({
    type: typesKeycloak.DESCARGA_KEYCLOAK_ERROR,
    payload: true
});