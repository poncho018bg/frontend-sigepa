

import { axiosGet, axiosPost } from "helpers/axios";
import { typesPerfilSubmodulo } from "../types/types";

// Función que descarga los sistemas de la base de datos
export function obtenerPerfilSubmoduloAction() {
    return async (dispatch) => {
        dispatch(descargarPerfilSubmodulo());
        try {
            const data = await axiosGet(`perfilmodulo`);
            console.log(data);
            dispatch(descargaPerfilSubmoduloExitosa(data));
        } catch (error) {
            console.log(error);
            dispatch(descargaPerfilSubmoduloError())
        }
    }
}



const descargarPerfilSubmodulo = () => ({
    type: typesPerfilSubmodulo.COMENZAR_DESCARGA_PERFILSUBMODULO,
    payload: true
});

const descargaPerfilSubmoduloExitosa = perfilsubmodulo => ({
    type: typesPerfilSubmodulo.DESCARGA_PERFILSUBMODULO_EXITO,
    payload: perfilsubmodulo
})
const descargaPerfilSubmoduloError = () => ({
    type: typesPerfilSubmodulo.DESCARGA_PERFILSUBMODULO_ERROR,
    payload: true
});


export const PerfilSubmoduloStartAddNew = (perfilsubmodulo) => {
    return async (dispatch) => {
        console.log('SAVE=>',perfilsubmodulo)
        dispatch(descargarPerfilSubmodulo());
        try {
            const data = await axiosPost(`perfilessubmodulosOverride`, perfilsubmodulo, 'POST');
            dispatch(perfilSubmodulosAdded(data));
            
            
        } catch (error) {
            console.log(error);
            dispatch(perfilSubmodulosAddedError())
            throw error;
        }
    }
}

const perfilSubmodulosAdded = (perfilsubmodulo) => ({
    type: typesPerfilSubmodulo.AGREGAR_PERFILSUBMODULO_EXITO,
    payload: perfilsubmodulo
})

const perfilSubmodulosAddedError = () => ({
    type: typesPerfilSubmodulo.AGREGAR_PERFILSUBMODULO_ERROR,
    payload: true
});

export const sistemaEditar = (perfilsubmodulo) => ({
    type: typesPerfilSubmodulo.OBTENER_PERFILSUBMODULO_EDITAR,
    payload: perfilsubmodulo
})

export const perfilSistemaStartUpdate = (perfilsubmodulo) => {
    return async (dispatch) => {
        dispatch(iniciarEdicionPerfilSubmodulo());
        try {
            const data = await axiosPost(`/sistemas/${perfilsubmodulo.idSistema}`, perfilsubmodulo, 'PUT');
            dispatch(perfilSubmoduloUpdated(data));
        } catch (error) {
            console.log(error);
            dispatch(perfilSubmoduloUpdatedError())
        }
    }
}

const iniciarEdicionPerfilSubmodulo = () => ({
    type: typesPerfilSubmodulo.COMENZAR_EDICION_PERFILSUBMODULO,
    payload: true
});

const perfilSubmoduloUpdated = (perfilsubmodulo) => ({
    type: typesPerfilSubmodulo.PERFILSUBMODULO_EDITADO_EXITO,
    payload: perfilsubmodulo
})

const perfilSubmoduloUpdatedError = () => ({
    type: typesPerfilSubmodulo.PERFILSUBMODULO_EDITADO_ERROR,
    payload: true
});