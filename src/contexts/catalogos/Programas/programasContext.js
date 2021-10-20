import React, { createContext, useReducer } from 'react';

const baseUrl = process.env.REACT_APP_API_URL;
import axios from "axios";
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import {
    REGISTRAR_PROGRAMAS,
    MODIFICAR_PROGRAMAS,
    ELIMINAR_PROGRAMAS,
    GET_PROGRAMAS, CAMBIAR_TAMANIO_PAGINA_PROGRAMAS, CAMBIAR_PAGINA_PROGRAMAS, GET_PROGRAMASACTIVOS,
    GET_DOCUMENTOS_PROGRAMAS,GET_MUNICIPIOS_PROGRAMAS
}
    from 'types/actionTypes';
import ProgramasReducer from 'reducers/Catalogos/Programas/ProgramasReducer';
import { GET_PROGRAMAS_BY_ID } from 'types/actionTypes';
import { axiosGetHetoas } from 'helpers/axios';



export const ProgramasContext = createContext();

export const ProgramasContextProvider = props => {
    const initialState = {
        programasList: [],
        programa: null,
        programasMunicipiosList:[],
        programasDocumentosList:[],
        pageP: 0,
        sizeP: 10,
        totalP: 0
    }

    const [state, dispatch] = useReducer(ProgramasReducer, initialState);


    const get = async () => {
        try {
            const { pageP, sizeP } = state;
            console.log(state);
            const result = await axiosGet(`programas?page=${state.pageP}&size=${state.sizeP}`);
            dispatch({
                type: GET_PROGRAMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getProgramasActivos = async vigencia => {
        try {

            const result = await axiosGet(`programasOverride/consultarProgramasVigentes/${vigencia}`);
            dispatch({
                type: GET_PROGRAMASACTIVOS,
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
    const registrar = async (programas, file) => {
        const formData = new FormData();
        const programaDTO = new Blob([JSON.stringify(programas)], {
            type: 'application/json',
        });
        console.log('programas', programaDTO)
        console.log('file', file)
        formData.append('programaDTO', programaDTO)
        formData.append('file', file)
        console.log('formData', formData)
        //
        const url = `${baseUrl}programasOverride`;
        return new Promise((resolve, reject) => {
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*'
                }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: REGISTRAR_PROGRAMAS,
                    payload: response
                })
            }).catch(error => {
                reject(error);
            });
        });



    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar = async (id,objetoActualizar,file,documentos) => {

        //const { _links: { programas: { href } } } = objetoActualizar;

        console.log("objeto actualizar --->", objetoActualizar);
        console.log("documentos ----->", documentos);

        let { dsprograma,
            dsclaveprograma,
            fcvigenciainicio,
            fcvigenciafin,
            fcregistrowebinicio,
            fcregistrowebfin,
            fcregistropresencialinicio,
            fcregistropresencialfin,
            dsdescripcion,
            dscriterioelegibilidad,
            dscontinuidad,
            dsobservaciones,
            idBeneficiario,
            idRangoEdadBeneficiario } = objetoActualizar


        let objetoEnviar = {
            id:id,
            dsprograma,
            dsclaveprograma,
            fcvigenciainicio,
            fcvigenciafin,
            fcregistrowebinicio,
            fcregistrowebfin,
            fcregistropresencialinicio,
            fcregistropresencialfin,
            dsdescripcion,
            dscriterioelegibilidad,
            dscontinuidad,
            dsobservaciones,
            idBeneficiario,
            idRangoEdadBeneficiario,
            documentosRequisitos:documentos
        }

        const formData = new FormData();
        const programaDTO = new Blob([JSON.stringify(objetoEnviar)], {
            type: 'application/json',
        });

        formData.append('programaDTO', programaDTO)
        formData.append('file', file)

        const url = `${baseUrl}programasOverride/editar`;
        return new Promise((resolve, reject) => {
            axios.put(url, formData, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_PROGRAMAS,
                    payload: response
                })
            }).catch(error => {
                reject(error);
            });
        });
    }

    const eliminar = async id => {
        try {
            console.log("ELIMINAR context ", id);
            const result = await axiosDeleteTipo(`programasOverride/${id.id}`);
            console.log("ELIMINAR result ", result);
            dispatch({
                type: ELIMINAR_PROGRAMAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
    * obtener tipos de apoyo
    */
    const getByID = async id => {
        try {
            const result = await axiosGet(`programasOverride/consultaId/${id}`);
            dispatch({
                type: GET_PROGRAMAS_BY_ID,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Paginacion

    const changePage = (page) => {
        dispatch({
            type: CAMBIAR_PAGINA_PROGRAMAS,
            payload: page
        })
        try {

         get();

        } catch (error) {
            throw error;
        }

    }

    const changePageNumber = (page) => ({
        type: CAMBIAR_PAGINA_PROGRAMAS,
        payload: page
    })

    const changePageSize = (size) => ({
        type: CAMBIAR_TAMANIO_PAGINA_PROGRAMAS,
        payload: size
    })

    const getByParametros = async (search) => {
        try {
            
            const result = await axiosGet(`programas/search/findByDsprogramaContaining?dsprograma=${search}`);
            dispatch({
                type: GET_PROGRAMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getMunicipiosProg = async (idPrograma) => {
        try {
           
            const result = await axiosGet(`programas/${idPrograma}/crcCoberturaapoyos`);
            dispatch({
                type: GET_MUNICIPIOS_PROGRAMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getDocumentosProg = async (idPrograma) => {
        try {
           
           
            const result = await axiosGet(`programas/${idPrograma}/crcDocumentosRequisitosCollection`);
            dispatch({
                type: GET_DOCUMENTOS_PROGRAMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ProgramasContext.Provider
            value={{
                programasList: state.programasList,
                programa: state.programa,
                errorInsert: state.errorInsert,
                mensajeError: state.mensajeError,
                pageP: state.pageP,
                sizeP: state.sizeP,
                totalP: state.totalP,
                programasMunicipiosList:state.programasMunicipiosList,
                programasDocumentosList:state.programasDocumentosList,
                get,
                registrar,
                actualizar,
                eliminar,
                getByID,
                changePageNumber,
                changePageSize,
                changePage,
                getProgramasActivos,
                getByParametros,
                getMunicipiosProg,
                getDocumentosProg
            }}
        >
            {props.children}
        </ProgramasContext.Provider>
    )
}