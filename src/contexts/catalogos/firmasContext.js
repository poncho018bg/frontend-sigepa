import React, { createContext, useReducer } from 'react';
import FirmasReducer from 'reducers/Catalogos/FirmasReducer';
import {
    GET_FIRMAS, REGISTRAR_FIRMAS, MODIFICAR_FIRMAS, ELIMINAR_FIRMAS, GET_PROGRAMAS,
    AGREGAR_FIRMAS_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA
} from "../../types/actionTypes";
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const FirmasContext = createContext();

export const FirmasContextProvider = props => {
    const initialState = {
        firmasList: [],
        programaList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(FirmasReducer, initialState);

    const getFirmas = async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`firmas?page=${page}&size=${size}`);
            console.log(result._embedded);
            console.log(result._embedded.firmas);
            dispatch({
                type: GET_FIRMAS,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getProgramas = async () => {
        try {
            const result = await axiosGet('programas');
            console.log(result._embedded);
            console.log(result._embedded.programas);
            dispatch({
                type: GET_PROGRAMAS,
                payload: result._embedded.programas
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Se registran las firmas para los programas
     * @param {firmas} firmas 
     */
    const registrarFirmas = async firmas => {
        try {
            console.log("registro de firmas --->", firmas);
            const resultado = await axiosPost('firmas', firmas);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_FIRMAS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_MUNICIPIOS_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {firmas} firmas 
     */
    const actualizarFirmas = async firmas => {
        const { id, dsautoriza, dspuesto, dscomentario, idPrograma, activo, _links: { firmas: { href } } } = firmas;

        let FirmasEnviar = {
            id: id,
            dsautoriza: dsautoriza,
            dspuesto: dspuesto,
            dscomentario: dscomentario,
            programas: `${process.env.REACT_APP_API_URL}programas/${idPrograma}`,
            activo: activo
        };
        console.log("que llega aqui ---> ", FirmasEnviar);
        let actualizarPrograma = {
            "_links": { "1": { "href": `/${idPrograma}` } },
        }
        console.log("nuevo programa ---> ", actualizarPrograma);
        const urPrograma = `${baseUrl}firmas/${id}/programas`;
        try {
            await axiosPostHetoas(urPrograma, actualizarPrograma, 'PUT');
            const result = await axiosPostHetoas(href, FirmasEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_FIRMAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarFirmas = async idfirmas => {
        try {
            await axiosDeleteTipo(`firmas/${idfirmas}`);
            dispatch({
                type: ELIMINAR_FIRMAS,
                payload: idfirmas,
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
            getFirmas();
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



    return (
        <FirmasContext.Provider
            value={{
                firmasList: state.firmasList,
                programaList: state.programaList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
                getFirmas,
                getProgramas,
                registrarFirmas,
                actualizarFirmas,
                eliminarFirmas,
                changePageNumber,
                changePageSize,
                changePage
            }}
        >
            {props.children}
        </FirmasContext.Provider>
    )
}