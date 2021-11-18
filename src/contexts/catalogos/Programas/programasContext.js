import React, { createContext, useReducer } from 'react';

const baseUrl = process.env.REACT_APP_API_URL;
import axios from "axios";
import { axiosGet,  axiosDeleteTipo } from 'helpers/axios';
import { axiosGetSinTokenAdmin } from 'helpers/axiosPublico';
import {
    REGISTRAR_PROGRAMAS,
    MODIFICAR_PROGRAMAS,
    ELIMINAR_PROGRAMAS,
    GET_PROGRAMAS, CAMBIAR_PAGINA, CAMBIAR_TAMANIO_PAGINA, GET_PROGRAMASACTIVOS,
    GET_DOCUMENTOS_PROGRAMAS,GET_MUNICIPIOS_PROGRAMAS,GET_IMAGEN_PROGRAMAS,GET_PROGRAMAS_BY_ID
}
    from 'types/actionTypes';
import ProgramasReducer from 'reducers/Catalogos/Programas/ProgramasReducer';




export const ProgramasContext = createContext();

export const ProgramasContextProvider = props => {
    const initialState = {
        programasList: [],
        programa: null,
        imagenprg:null,
        programasMunicipiosList:[],
        programasDocumentosList:[],
        page: 0,
        size: 10,
        total: 0,
       
    }

    const [state, dispatch] = useReducer(ProgramasReducer, initialState);


    const get = async () => {
        try {
            
            const { page, size } = state;
            const result = await axiosGet(`programas?page=${page}&size=${size}`);
            dispatch({
                type: GET_PROGRAMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getCien = async () => {
        try {
            
            const { page, size } = state;
            const result = await axiosGetSinTokenAdmin(`programas?page=0&size=1000`);
            console.log("resultado programas cien",result);
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
                dispatch(get())
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
    const actualizar = async (id,objetoActualizar,file) => {

        objetoActualizar.id=id   
        console.log("objeto actualizar --->", objetoActualizar);                    

        const formData = new FormData();
        const programaDTO = new Blob([JSON.stringify(objetoActualizar)], {
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
            console.log("entra a consultar programa por id");
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

    const changePage = async (pages) => {  
        try {
            dispatch(changePageNumber(pages))
        } catch (error) {            
            throw error;
        }
    }

    const changePageSizes = async (sizes) => {
        try {
            dispatch(changePageSize(sizes))        
        } catch (error) {            
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
            console.log('1result=>',result)
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

    const getImgDocumentosProg = async (idPrograma) => {
        try {          
           
            const result = await axiosGet(`programasOverride/imgPrograma/${idPrograma}`);
            dispatch({
                type: GET_IMAGEN_PROGRAMAS,
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
                page: state.page,
                size: state.size,
                total: state.total,
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
                changePageSizes,
                getProgramasActivos,
                getByParametros,
                getMunicipiosProg,
                getDocumentosProg,
                getImgDocumentosProg,
                imagenprg:state.imagenprg,
                getCien
            }}
        >
            {props.children}
        </ProgramasContext.Provider>
    )
}