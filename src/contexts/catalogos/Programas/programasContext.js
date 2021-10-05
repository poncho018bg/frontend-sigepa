import React, { createContext, useReducer } from 'react';

const baseUrl = process.env.REACT_APP_API_URL;
import axios from "axios";
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import { 
        REGISTRAR_PROGRAMAS,
        MODIFICAR_PROGRAMAS,
        ELIMINAR_PROGRAMAS,
        GET_PROGRAMAS ,  CAMBIAR_TAMANIO_PAGINA_PROGRAMAS,CAMBIAR_PAGINA_PROGRAMAS} 
from 'types/actionTypes';
import ProgramasReducer from 'reducers/Catalogos/Programas/ProgramasReducer';
import { GET_PROGRAMAS_BY_ID } from 'types/actionTypes';



export const ProgramasContext = createContext();

export const ProgramasContextProvider = props => {
    const initialState = {
        programasList: [],
        programa:null,
        pageP: 0,
        sizeP: 5,
        totalP: 0
    }

    const [state, dispatch] = useReducer(ProgramasReducer, initialState);


    const get= async () => {
        try {
            const {pageP, sizeP}= state;
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

    /**
     * obtener tipos de apoyo
     */
  /*  const get=  () => {
        try {
            //const result = await axiosGet('programas');
            const {pageP, sizeP}= state;
            console.log(state);
            console.log('page ', pageP, ' size ', sizeP);
           // const result = await axiosGet(`programas?page=${pageP}&size=${sizeP}`);

           const url = `${ baseUrl }programas?page=${pageP}&size=${sizeP}`;
            return new Promise((resolve, reject) => {
                axios.get(url, {
                    headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
                }).then(response => {
                    dispatch({
                        type: GET_PROGRAMAS,
                        payload: response.data
                    })
                    resolve(response);
                   
                }).catch(error => {
                    reject(error);
                });
            });
            
        } catch (error) {
            console.log(error);
        }
    }*/

    /**
     * Se registran los tipos de apoyos
     * @param {motivoRechazos} motivoRechazos 
     */
    const registrar = async programas => {
     
           // const resultado = await axiosPost('programas', programas);
            const url = `${ baseUrl }programasOverride`;
            return new Promise((resolve, reject) => {
                axios.post(url, programas, {
                    headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
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
    const actualizar= async objetoActualizar => {

        const {  _links: { programas: { href } } } = objetoActualizar;

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
                    boactivo} = objetoActualizar


        let objetoEnviar = {
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
                    boactivo
        }
      /*  try {

            const result = await axiosPostHetoas(href, objetoEnviar, 'PUT');
            dispatch({
                type: MODIFICAR_PROGRAMAS,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }*/
        const url = `${ baseUrl }programasOverride`;
        return new Promise((resolve, reject) => {
            axios.put(href, objetoEnviar, {
                headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
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

    const eliminar= async id => {
        try {
            await axiosDeleteTipo(`programas/${id}`);
            dispatch({
                type: ELIMINAR_PROGRAMAS,
                payload: id,
            })
        } catch (error) {
            console.log(error);
        }
    }

     /**
     * obtener tipos de apoyo
     */
      const getByID= async id => {
        try {
            const result = await axiosGet(`programas/${id}`);
            dispatch({
                type: GET_PROGRAMAS_BY_ID,
                payload: result
            })
        } catch (error) {
            console.log(error);
        }
    }
          
     //Paginacion

 const changePage =  (page) => {
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

    return (
        <ProgramasContext.Provider
            value={{
                programasList: state.programasList,
                programa: state.programa,
                errorInsert:state.errorInsert,
                mensajeError:state.mensajeError,
                pageP:state.pageP,
                sizeP:state.sizeP,
                totalP:state.totalP,
                get,
                registrar,
                actualizar,
                eliminar,
                getByID,
                changePageNumber,
                changePageSize,
                changePage,
            }}
        >
            {props.children}
        </ProgramasContext.Provider>
    )
}