import { axiosGet } from "helpers/axiosKeycloak";
import { typesKeycloak } from "../types/types";


export function obtenerRolesAction() {
    return async (dispatch) => {
        console.log('ENTRO A OBENER ROLES CON EL NUEVO TOKEN')
        dispatch(descargarRoles());
        try {
            const data = await axiosGet(`groups`,sessionStorage.getItem('token'));
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