import React, { createContext, useReducer } from 'react';
import DocumentosReducer from 'reducers/Catalogos/DocumentosReducer';
import axios from "axios";
import { GET_DOCUMENTOS_REQUISITOS, REGISTRAR_DOCUMENTOS_REQUISITOS, MODIFICAR_DOCUMENTOS_REQUISITOS, VIGENCIA_DOCUMENTOS_REQUISITOS, GET_VIGENCIAS, 
    AGREGAR_DOCUMENTOS_ERROR,GET_PROGRAMAS_DOCUMENTO } from "../../types/actionTypes";

import { axiosGet,  axiosPostHetoas, axiosGetHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;

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
            console.log("programas documentos ---> ",result);
            dispatch({
                type: GET_PROGRAMAS_DOCUMENTO,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const registrarDocumento = async documentosRequisitos => {

        try {
            const url = `${baseUrl}documentosRequisitos`;
            return new Promise((resolve, reject) => {
                axios.post(url, documentosRequisitos, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    console.log('RESPONSE DOCS =>', response.data)
                    resolve(response);
                    dispatch({
                        type: REGISTRAR_DOCUMENTOS_REQUISITOS,
                        payload: response.data
                    })
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_DOCUMENTOS_ERROR,
                payload: true
            })
        }
    }

    const actualizarDocumento = async documentosRequisitos => {
        const { id, dsdocumento, dsdescripcion, idVigencia, activo, _links: { documentosRequisitos: { href } } } = documentosRequisitos;
        let documentosRequisitosEnviar = {
            id,
            dsdocumento,
            dsdescripcion,
            vigencias: `${process.env.REACT_APP_API_URL}vigencias/${idVigencia}`,
            'apoyos': [],
            programas: [],
            activo,
        };
        console.log("documento a enviar ---> ", documentosRequisitosEnviar);
        let actualizarVigencia = {
            "_links": { "1": { "href": `/${idVigencia}` } },
        };
        console.log("nueva vigencia ---> ", actualizarVigencia);
        const urVigencia = `${baseUrl}documentosRequisitos/${id}/vigencias`;
        try {
            axiosPostHetoas(urVigencia, actualizarVigencia, 'PUT');
        } catch (error) {
            console.log(error);
        }

        return new Promise((resolve, reject) => {
            axios.put(href, documentosRequisitosEnviar, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_DOCUMENTOS_REQUISITOS,
                    payload: response.data
                })
            }).catch(error => {
                reject(error);
            });
        });


    }



    const eliminarDocumentos = async documentos => {
        const { dsdocumento,
            dsdescripcion,
            idVigencia,
            id,
            fechaRegistro,
            activo, _links: { documentosRequisitos: { href } } } = documentos;
        const act = activo === true ? false : true;
        let documentosEnviar = {
            dsdocumento,
            dsdescripcion,
            idVigencia,
            id,
            fechaRegistro,
            activo:act,
            vigencias:[]
        }
        documentos.activo = act

        try {
            const result = await axiosPostHetoas(href, documentosEnviar, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_DOCUMENTOS_REQUISITOS,
                payload: result.data,
            })
        } catch (error) {
            console.log(error);
        }

    }

    const getDocumentosByParametros = async (search) => {
        try {
            const result = await axiosGet(`documentosRequisitos/search/findByDsdocumentoContaining?dsdocumento=${search}`);
           
            dispatch({
                type: GET_DOCUMENTOS_REQUISITOS,
                payload: result._embedded.documentosRequisitos
            })
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
                actualizarDocumento,
                eliminarDocumentos,
                getDocumentosByParametros
            }}
        >
            {props.children}
        </DocumentosContext.Provider>
    )
}
