import { axiosGet } from "helpers/axios";
import UserService from "servicios/UserService";
import { typesSesion } from "types/types";


export function cerrarSesion() {
    return (dispatch) => {
        UserService.doLogout;
        dispatch( cerrandoSesion() )
    }
}


const cerrandoSesion = () => ({
    type: typesSesion.COMENZAR_CIERRE_SESION,
    payload: true
});
const cierreSesionExito = () => ({
    type: typesSesion.CIERRE_SESION_EXITOSO
})
const cierreSesionError = () => ({
    type: typesSesion.CIERRE_SESION_ERROR,
    payload: true
});