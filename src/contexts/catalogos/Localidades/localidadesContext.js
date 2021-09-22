import React, { createContext, useReducer } from 'react';

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { GET_LOCALIDADES,
        REGISTRAR_LOCALIDADES,
        ELIMINAR_LOCALIDADES,
        MODIFICAR_LOCALIDADES,
        AGREGAR_PROGRAMA_ERROR,
        CAMBIAR_PAGINA,
        CAMBIAR_TAMANIO_PAGINA
} from 'types/actionTypes';

import LocalidadesReducer from 'reducers/Catalogos/Localidades/LocalidadesReducer';




export const LocalidadesContext = createContext();

export const LocalidadesContextProvider = props => {
    const initialState = {
        localidadesList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(LocalidadesReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get= async () => {
        try {
            const {page, size}= state;
            const result = await axiosGet(`localidades?page=${page}&size=${size}`);
            dispatch({
                type: GET_LOCALIDADES,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrar = async localidades => {

        try {
            const resultado = await axiosPost('localidades', localidades);
            dispatch({
                type: REGISTRAR_LOCALIDADES,
                payload: resultado
            })
        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_PROGRAMA_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar= async objetoActualizar => {
        console.log('actualizando objeto');
        console.log(objetoActualizar);
        const { 
            dsidlocalidad, dsclavelocalidad,
             idMunicipio, dscodigopostal, 
             dslocalidad,id , _links: { localidades: { href } }
        } = objetoActualizar;


        let localidad = {
            dsidlocalidad,
            dsclavelocalidad,
            id ,
            dslocalidad,
            dscodigopostal,
            dsestado: true,
            municipios: `/d5978fec-24d2-4527-b1d3-1aa1b641b471`
        }

  
        try {
            const result = await axiosPostHetoas(href, localidad, 'PUT');
            dispatch({
                type: MODIFICAR_LOCALIDADES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar= async id => {
     
        try {
            await axiosDeleteTipo(`localidades/${id}`);
            dispatch({
                type: ELIMINAR_LOCALIDADES,
                payload: id,
            })
        } catch (error) {
            console.log(error);
        }
    }


    //Paginacion

 const changePage = async (page) => {
     console.log(page);

        dispatch(changePageNumber(page))
        try {
            get();
        } catch (error) {
           // console.log(error);
            //dispatch( idiomaAddedError() )
            throw error;
        }
    
}

    const changePageNumber = (page) => ({
        type: CAMBIAR_PAGINA, 
        payload: page
    })
    
     const changePageSize = (size) => ({
        type: CAMBIAR_TAMANIO_PAGINA, 
        payload: size
    })      


    return (
        <LocalidadesContext.Provider
            value={{
                localidadesList: state.localidadesList,
                error:state.error,
                page:state.page,
                size:state.size,
                total:state.total,
                get,
                registrar,
                actualizar,
                eliminar,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </LocalidadesContext.Provider>
    )
}