import React, { createContext, useReducer } from 'react';
import DocumentosReducer from 'reducers/Catalogos/DocumentosReducer';

import { GET_DOCUMENTOS_REQUISITOS, REGISTRAR_DOCUMENTOS_REQUISITOS, MODIFICAR_DOCUMENTOS_REQUISITOS, ELIMINAR_DOCUMENTOS_REQUISITOS, VIGENCIA_DOCUMENTOS_REQUISITOS, GET_VIGENCIAS } from "../../types/actionTypes";

import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas, axiosGetHetoas } from 'helpers/axios';

export const DocumentosContext = createContext();

export const DocumentosContextProvider = props => {
    const initialState = {
        documentosList: [],
        vigenciaList: '',
        todasVigencias: [],
        programasDocumento: [],
    }

    const [state, dispatch] = useReducer(DocumentosReducer, initialState);

    /**
     * obtenemos los documentos
     */
    const getDocumentos = async () => {
        try {
            const result = await axiosGet('documentosRequisitos');
            console.log(result._embedded);
            console.log(result._embedded.documentosRequisitos);
            dispatch({
                type: GET_DOCUMENTOS_REQUISITOS,
                payload: result._embedded.documentosRequisitos
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getVigenciaDocumentos = async documentosRequisitos => {

        const { _links: { vigencias: { href } } } = documentosRequisitos;
        console.log("id documento -->", documentosRequisitos.id);
        console.log("link para la vigencia -->", href);
        try {
            const result = await axiosGetHetoas(href);
            console.log("vigencia resultado -->", result);
            dispatch({
                type: VIGENCIA_DOCUMENTOS_REQUISITOS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * se obtiene la lista de las vigencias de la BD
     */
    const getVigencias = async () => {
        try {
            const result = await axiosGet('vigencias');
            console.log(result._embedded);
            console.log(result._embedded.vigencias);
            dispatch({
                type: GET_VIGENCIAS,
                payload: result._embedded.vigencias
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * se obtiene la lista de las vigencias de la BD
     */
    const getProgramaDocumentos = async idDocumento => {
        try {
            console.log("idDocumento ", idDocumento);
            const result = await axiosGet(`programasdocument/${idDocumento}`);
            console.log(result);
            dispatch({
                type: GET_VIGENCIAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarDocumento = async documentosRequisitos => {
        try {
            console.log(documentosRequisitos);
            const resultado = await axiosPost('documentosRequisitos', documentosRequisitos);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_DOCUMENTOS_REQUISITOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarDocumento = async documentosRequisitos => {
        const { id, dsdocumento, dsdescripcion, idVigencia, activo, _links: { documentosRequisitos: { href } } } = documentosRequisitos;
        let documentosRequisitosEnviar = {
            id,
            dsdocumento,
            dsdescripcion,
            vigencias: `${process.env.REACT_APP_API_URL}vigencias/${idVigencia}`,
            'apoyos':[],
            activo,
        };
        console.log("que llega aqui ---> ", documentosRequisitosEnviar);
        
        try {
            const result = await axiosPostHetoas(href, documentosRequisitosEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_DOCUMENTOS_REQUISITOS,
                payload: result,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DocumentosContext.Provider
            value={{
                documentosList: state.documentosList,
                vigenciaList: state.vigenciaList,
                todasVigencias: state.todasVigencias,
                programasDocumento: state.programasDocumento,
                getDocumentos,
                getVigenciaDocumentos,
                getVigencias,
                registrarDocumento,
                getProgramaDocumentos,
                actualizarDocumento
            }}
        >
            {props.children}
        </DocumentosContext.Provider>
    )
}
