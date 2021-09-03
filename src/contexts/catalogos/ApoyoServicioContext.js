import React, { createContext, useReducer } from 'react';
import ApoyoServicioReducer from 'reducers/Catalogos/ApoyoServicioReducer';

import Axios from 'axios';

import { GET_APOYOSERVICIO, REGISTRAR_APOYOSERVICIO, ELIMINAR_APOYOSERVICIO, MODIFICAR_APOYOSERVICIO } from 'types/actionTypes';
import { axiosGet } from 'helpers/axios';
import { axiosPost } from 'helpers/axios';
import { axiosDeleteTipo } from 'helpers/axios';
import { axiosPostHetoas } from 'helpers/axios';


export const ApoyoServicioContext = createContext();

export const ApoyoServicioContextProvider = props => {

    const initialState = {
        apoyoservicioList: [],
        clienteActual: null
    }


    const [state, dispatch] = useReducer(ApoyoServicioReducer, initialState);

    const getApoyoServicio = async () => {

        try {
            const resultado = await axiosGet('apoyosServicios');
            //   console.log(resultado);
            console.log(resultado._embedded.apoyosServicios);
            dispatch({
                type: GET_APOYOSERVICIO,
                payload: resultado._embedded.apoyosServicios
            })
        } catch (error) {

            console.log(error);
        }
    }


    const registrarApoyoSevicio = async apoyosServicios => {
        try {
            console.log(apoyosServicios);
            const resultado = await axiosPost('apoyosServicios', apoyosServicios);
            console.log(resultado);
            dispatch({
                type: REGISTRAR_APOYOSERVICIO,
                payload: resultado
            })
        } catch (error) {

            console.log(error);
        }
    }


    const actualizarApoyoServicio = async apoyosServicios => {
        console.log(apoyosServicios);
        const { id, dsservicio, activo, _links: { apoyosServicios: { href } } } = apoyosServicios;
        let apoyosServiciosEnviar = {
            dsservicio,
            activo,
            crcProgramastipoapoyos:[]
        }
        try {
            const resultado = await axiosPostHetoas(href, apoyosServiciosEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_APOYOSERVICIO,
                payload: resultado,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarApoyoServicio = async idApoyoServicio => {
        try {
            await axiosDeleteTipo(`apoyosServicios/${idApoyoServicio}`);
            dispatch({
                type: ELIMINAR_APOYOSERVICIO,
                payload: idApoyoServicio
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ApoyoServicioContext.Provider
          value={{
            apoyoservicioList: state.apoyoservicioList,
            getApoyoServicio,
            registrarApoyoSevicio,
            eliminarApoyoServicio,
            actualizarApoyoServicio
           
          }}
        >
          {props.children}
        </ApoyoServicioContext.Provider>
      )


}