import React, { createContext, useReducer } from 'react';
import SubModuloReducer from '../reducers/SubModuloReducer';
import axios from "axios";
import {
    GET_SUBMODULOS, REGISTRAR_SUBMODULO, ELIMINAR_SUBMODULO, MODIFICAR_SUBMODULO, GET_MODULO_SUBMODULOS,
    AGREGAR_SUBMODULOS_ERROR
    
    
} from '../types/actionTypes';
import { axiosGet,  axiosPostHetoas } from 'helpers/axios';
import UserService from 'servicios/UserService';

const baseUrl = process.env.REACT_APP_API_URL;
export const SubModuloContext = createContext();

export const SubModuloContextProvider = props => {

    const initialState = {
        submoduloList: [],
        clienteActual: null
    }

    const [state, dispatch] = useReducer(SubModuloReducer, initialState);

    const getSubModulos = async () => {

        try {

            const resultado = await axiosGet('submodulosOverride/');
            console.log(resultado);
            dispatch({
                type: GET_SUBMODULOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getModulosBySubModulos = async subModulo => {

        try {
            console.log('mod. buscar =>', subModulo)
            const resultado = await axiosGet(`subModulos/${subModulo.id}/crcModulosCollection?page=${page}&size=${size}`);
            console.log('RES=>', resultado._embedded.modulos);
            dispatch({
                type: GET_MODULO_SUBMODULOS,
                payload: resultado._embedded.modulos
            })
        } catch (error) {
            console.log(error);
        }

    }

    const registrarSubModulos = async subModulo => {
        console.log('ddd=>', subModulo);
        const moduloEnviar = {
            dssubmodulo: subModulo.dssubmodulo,
            usuarioCreacionId: subModulo.usuarioCreacionId,
            boactivo: true,
            crcModulosCollection: [`/${subModulo.crcModulosCollection}`],
            perfiles: [],
            activoval:true
        }

        try {
            const url = `${baseUrl}subModulos`;
            return new Promise((resolve, reject) => {
                axios.post(url, moduloEnviar, {
                    headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
                }).then(response => {
                    resolve(response);
                    response.data.activoval = true
                    dispatch({
                        type: REGISTRAR_SUBMODULO,
                        payload: response.data
                    })
                    dispatch(getSubModulos())
                }).catch(error => {
                    reject(error);
                });
            });

        } catch (error) {
            console.log('ocurrio un error en el context');
            console.log(error);
            dispatch({
                type: AGREGAR_SUBMODULOS_ERROR,
                payload: true
            })
        }


    }

    const actualizarSubModulo = async submodulo => {

        console.log('x=>>', submodulo)

        const { id, crcModulosCollection,fcfecharegistro } = submodulo;


        const url = `${baseUrl}subModulos/${id}`;

        const moduloEnviar = {
            dssubmodulo: submodulo.dssubmodulo,
            usuarioCreacionId: `${process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`,
            boactivo: true,
            crcModulosCollection: [`/${crcModulosCollection}`],
            perfiles: [],
            fcfecharegistro:fcfecharegistro
        }
        let moduloEnviarm = {
            fcfecharegistro:fcfecharegistro,
            '_links': {

                '1': {
                    'href': `${process.env.REACT_APP_API_URL}modulos/${submodulo.crcModulosCollection}`,
                    'submodulo_id': `${process.env.REACT_APP_API_URL}subModulos/${id}`


                }
            }
        }
        const resultado2 = await axiosPostHetoas(`${process.env.REACT_APP_API_URL}subModulos/${id}/crcModulosCollection`, moduloEnviarm, 'PUT');
        console.log('Res 2.- =>', resultado2)

        return new Promise((resolve, reject) => {
            axios.put(url, moduloEnviar, {
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' }
            }).then(response => {
                resolve(response);
                dispatch({
                    type: MODIFICAR_SUBMODULO,
                    payload: response.data
                })
                dispatch(getSubModulos())
            }).catch(error => {
                reject(error);
            });
        });

    
        
    }

    const eliminarSubModulo = async idModulo => {

        const { id, activoval } = idModulo
        const act = !activoval;
        const url = `${baseUrl}subModulos/${id}`;
        idModulo.activo = act
        idModulo.activoval = act
        idModulo.usuarioCreacionId = `${process.env.REACT_APP_API_URL}/usuario/${UserService.getIdUSuario()}`
        idModulo.crcModulosCollection = []
        idModulo.perfiles = []
        try {
            const result = await axiosPostHetoas(url, idModulo, 'PUT');
            console.log(result);
            console.log('mir mira');
            dispatch({
                type: ELIMINAR_SUBMODULO,
                payload: result,
            })
        } catch (error) {
            console.log(error);
        }
    }


    const getModulosByParametros = async subModulo => {
        try {
            console.log('mod. buscar =>', subModulo)
            const resultado = await axiosGet(`subModulos/search/findByDssubmoduloContaining?dssubmodulo=${subModulo}`);           
            dispatch({
                type: GET_SUBMODULOS,
                payload: resultado._embedded.subModulos
            })
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <SubModuloContext.Provider
            value={{
                submoduloList: state.submoduloList,
                getSubModulos,
                getModulosBySubModulos,
                registrarSubModulos,
                actualizarSubModulo,
                eliminarSubModulo,
                getModulosByParametros
            }}
        >
            {props.children}
        </SubModuloContext.Provider>
    )

}