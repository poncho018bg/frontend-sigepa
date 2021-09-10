import React, { createContext, useReducer } from 'react';
import FirmasReducer from 'reducers/Catalogos/FirmasReducer';
import { GET_FIRMAS, REGISTRAR_FIRMAS, MODIFICAR_FIRMAS, ELIMINAR_FIRMAS, GET_PROGRAMAS } from "../../types/actionTypes";
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const FirmasContext = createContext();

export const FirmasContextProvider = props => {
    const initialState = {
        firmasList: [],
        programaList: []
    }

    const [state, dispatch] = useReducer(FirmasReducer, initialState);

    const getFirmas = async () => {
        try {
            const result = await axiosGet('firmas');
            console.log(result._embedded);
            console.log(result._embedded.firmas);
            dispatch({
                type: GET_FIRMAS,
                payload: result._embedded.firmas
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
            await axiosDeleteTipo(`/firmas/${idfirmas}`);
            dispatch({
                type: ELIMINAR_FIRMAS,
                payload: idfirmas,
            })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <FirmasContext.Provider
            value={{
                firmasList: state.firmasList,
                programaList: state.programaList,
                getFirmas,
                getProgramas,
                registrarFirmas,
                actualizarFirmas,
                eliminarFirmas
            }}
        >
            {props.children}
        </FirmasContext.Provider>
    )
}