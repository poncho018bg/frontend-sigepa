import React, { createContext, useReducer } from 'react';


import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import CursosCapacitacionesReducer from 'reducers/Catalogos/CursosCapacitacionesReducer';
import { REGISTRAR_CURSOS_CAPACITACIONES,GET_CURSOS_CAPACITACIONES ,ELIMINAR_CURSOS_CAPACITACIONES,MODIFICAR_CURSOS_CAPACITACIONES,
    AGREGAR_CURSOS_CAPACITACIONES_ERROR,
    CAMBIAR_PAGINA,
    CAMBIAR_TAMANIO_PAGINA} from 'types/actionTypes';



export const CursosCapacitacionesContext = createContext();

export const CursosCapacitacionesContextProvider = props => {
    const initialState = {
        cursosCapacitacionesList: [],
        clienteActual: null,
        error: false,
        page: 0,
        size: 10,
        total: 0
    }

    const [state, dispatch] = useReducer(CursosCapacitacionesReducer, initialState);

    /**
     * obtener tipos de apoyo
     */
    const get= async () => {
        try {
            const { page, size } = state;
            const result = await axiosGet(`cursosCapacitaciones`);
            console.log(result._embedded);
            console.log(result._embedded.cursosCapacitaciones);
            dispatch({
                type: GET_CURSOS_CAPACITACIONES,
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
    const registrar = async cursosCapacitaciones => {
        try {
            console.log(cursosCapacitaciones);
            const resultado = await axiosPost('cursosCapacitaciones', cursosCapacitaciones);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_CURSOS_CAPACITACIONES,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AGREGAR_CURSOS_CAPACITACIONES_ERROR,
                payload: true
            })
        }
    }

    /**
     * Se actualizan los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const actualizar= async objetoActualizar => {
        console.log(objetoActualizar);
        const { dsestado, boactivo, _links: { cursosCapacitaciones: { href } } } = objetoActualizar;

        let objetoEnviar = {
            dsestado,
            boactivo
        };

        try {
            const result = await axiosPostHetoas(href, objetoEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_CURSOS_CAPACITACIONES,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const eliminar= async id => {
     
        try {
            await axiosDeleteTipo(`cursosCapacitaciones/${id}`);
            dispatch({
                type: ELIMINAR_CURSOS_CAPACITACIONES,
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
        <CursosCapacitacionesContext.Provider
            value={{
                cursosCapacitacionesList: state.cursosCapacitacionesList,
                error: state.error,
                page: state.page,
                size: state.size,
                total: state.total,
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
        </CursosCapacitacionesContext.Provider>
    )
}