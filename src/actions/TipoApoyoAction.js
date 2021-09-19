import { typesTipoApoyo } from "types/types";
import { axiosGet, axiosPost,axiosPostHetoas } from "helpers/axios";
const baseUrl = process.env.REACT_APP_API_URL;

export const obtenerTipoApoyoAction = ( idTipoApoyo, idPeriodicidad) => {
    return async (dispatch) => {
        dispatch( descargarTipoApoyo() );
        try {
            console.log('consultar apoyos')
            const data = await axiosGet(`tipoApoyoOverride/${idTipoApoyo}/${idPeriodicidad}` );
            console.log(data);
            dispatch( descargaTipoApoyoExitosa( data ) );
        } catch (error) {
            console.log(error);
            dispatch( descargaTipoApoyoError() )
        }
    }
}

const descargarTipoApoyo = () => ({
    type: typesTipoApoyo.COMENZAR_DESCARGA_TIPOAPOYO,
    payload: true
});

const descargaTipoApoyoExitosa = tipoApoyo => ({
    type: typesTipoApoyo.DESCARGA_TIPOAPOYO_EXITO,
    payload: tipoApoyo
})

const descargaTipoApoyoError = () => ({
    type: typesTipoApoyo.DESCARGA_TIPOAPOYO_ERROR, 
    payload: true
});



export const tipoApoyoStartAddNew = (tipoApoyo) => {
    return async (dispatch) => {
        dispatch( descargarTipoApoyo() );
        try {
            const data = await axiosPost(`/idiomas`,idioma,'POST' );
            dispatch( tipoApoyoAdded( data ) );
        } catch (error) {
            console.log(error);
            dispatch( tipoApoyoAddedError() )
            throw error;
        }
    }
}

const tipoApoyoAdded = (tipoApoyo) => ({
    type: typesTipoApoyo.AGREGAR_TIPOAPOYO_EXITO,
    payload: tipoApoyo
})

const tipoApoyoAddedError = () => ({
    type: typesTipoApoyo.AGREGAR_TIPOAPOYO_ERROR, 
    payload: true
});

export const tipoApoyoEditar = (tipoApoyo) =>({
    type: typesTipoApoyo.OBTENER_TIPOAPOYO_EDITAR,
    payload: tipoApoyo
})


export const tipoApoyoStartUpdate = (tipoApoyo) => {
    return async (dispatch) => {
        dispatch( iniciarEdicionTipoApoyo() );
        try {
            const data = await axiosPost(`/idiomas/${idioma.idIdioma}`,tipoApoyo,'PUT' );
            dispatch( tipoApoyoUpdated( data ) );
        } catch (error) {
            console.log(error);
            dispatch( tipoApoyoUpdatedError() )
        }
    }
}

const iniciarEdicionTipoApoyo = () => ({
    type: typesTipoApoyo.COMENZAR_EDICION_TIPOAPOYO,
    payload: true
});

const tipoApoyoUpdated = (tipoApoyo) => ({
    type: typesTipoApoyo.TIPOAPOYO_EDITADO_EXITO,
    payload: tipoApoyo
})

const tipoApoyoUpdatedError = () => ({
    type: typesTipoApoyo.TIPOAPOYO_EDITADO_ERROR, 
    payload: true
});

export const tipoApoyoEliminar = (tipoApoyo) =>({
    type: typesTipoApoyo.OBTENER_TIPOAPOYO_ELIMINAR,
    payload: tipoApoyo
})


export const borrarModuloAction = (tipoApoyo) => {
    console.log('borrarModuloAction',tipoApoyo)
    return async (dispatch) => {
        try {
            const data = await axiosPostHetoas(`${baseUrl}tipoApoyoOverride`,tipoApoyo,'DELETE' );
            dispatch( tipoApoyoEliminado( data ) );
        } catch (error) {
            console.log(error);
            dispatch( tipoApoyoEliminadoError() )
        }
    }
}

const tipoApoyoEliminado = (tipoApoyo) => ({
    type: typesTipoApoyo.TIPOAPOYO_ELIMINADO_EXITO,
    payload: tipoApoyo
})

const tipoApoyoEliminadoError = () => ({
    type: typesTipoApoyo.TIPOAPOYO_ELIMINADO_ERROR, 
    payload: true
});
