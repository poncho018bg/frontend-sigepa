import React, { createContext, useReducer } from 'react';
import TiposBeneficiariosReducer from 'reducers/Catalogos/TiposBeneficiariosReducer';

import { GET_TIPOS_BENEFICIARIOS, REGISTRAR_TIPOS_BENEFICIARIOS, ELIMINAR_TIPOS_BENEFICIARIOS, MODIFICAR_TIPOS_BENEFICIARIOS,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

export const TiposBeneficiariosContext = createContext();

export const TiposBeneficiariosContextProvider = props => {
    const initialState = {
        tiposBeneficiariosList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(TiposBeneficiariosReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const getTipoBeneficiarios = async () => {
        try {
            console.log("page size ---> ",page,size);
            const {page, size}= state;
            const result = await axiosGet(`tiposBeneficiarios?page=${page}&size=${size}`);
            console.log(result);
            console.log("tipoBeneficiarios --->",result._embedded.tiposBeneficiarios);
            dispatch({
                type: GET_TIPOS_BENEFICIARIOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran los tipos de apoyos
     * @param {tiposBeneficiarios} tiposBeneficiarios 
     */
    const registrarTiposBeneficiarios = async tiposBeneficiarios => {
        try {
            console.log(tiposBeneficiarios);
            const resultado = await axiosPost('tiposBeneficiarios', tiposBeneficiarios);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_TIPOS_BENEFICIARIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {tiposBeneficiarios} tiposBeneficiarios 
     */
    const actualizarTiposBeneficiarios = async tiposBeneficiarios => {
        const { dstipobeneficiario, boactivo, _links: { ct_TiposBeneficiarios: { href } } } = tiposBeneficiarios;

        let tiposBeneficiariosEnviar = {
            dstipobeneficiario,
            boactivo
        };

        console.log(tiposBeneficiariosEnviar);
        try {
            const result = await axiosPostHetoas(href, tiposBeneficiarios, 'PUT');
            dispatch({
                type: MODIFICAR_TIPOS_BENEFICIARIOS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTiposBeneficiarios = async idTiposBeneficiarios => {
        try {
            await axiosDeleteTipo(`/tiposBeneficiarios/${idTiposBeneficiarios}`);
            dispatch({
                type: ELIMINAR_TIPOS_BENEFICIARIOS,
                payload: idTiposBeneficiarios,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const changePage = async (page) => {
        console.log("llego al page --->",page);
   
           dispatch(changePageNumber(page))
           try {
            getTipoBeneficiarios();
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
        <TiposBeneficiariosContext.Provider
            value={{
                tiposBeneficiariosList: state.tiposBeneficiariosList,
                error:state.error,
                page:state.page,
                size:state.size,
                total:state.total,
                getTipoBeneficiarios,
                registrarTiposBeneficiarios,
                actualizarTiposBeneficiarios,
                eliminarTiposBeneficiarios,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </TiposBeneficiariosContext.Provider>
    )
}