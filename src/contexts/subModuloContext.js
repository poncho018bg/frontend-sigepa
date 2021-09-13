import React, { createContext, useReducer } from 'react';
import SubModuloReducer from '../reducers/SubModuloReducer';

import { GET_SUBMODULOS, REGISTRAR_SUBMODULO, ELIMINAR_SUBMODULO, MODIFICAR_SUBMODULO, GET_MODULO_SUBMODULOS } from '../types/actionTypes';
import { axiosGet, axiosPost, axiosDeleteTipo, axiosPostHetoas } from 'helpers/axios';
import UserService from 'servicios/UserService';


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
            const resultado = await axiosGet(`subModulos/${subModulo.id}/crcModulosCollection`);
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
        try {
            console.log(subModulo);
            const crcModulosCollection = subModulo.crcModulosCollection
            subModulo.crcModulosCollection = [{}]
            subModulo.perfiles = []
            console.log('POST SubModulos', subModulo)
            const resultado = await axiosPost('subModulos', subModulo);
            console.log(resultado);



            const { id,  _links: { crcModulosCollection: { href } } } = resultado;
            let moduloEnviar = {

                '_links': {

                    '1': {
                        'href': `${process.env.REACT_APP_API_URL}/modulos/${crcModulosCollection}`,
                        'submodulo_id': `${process.env.REACT_APP_API_URL}/subModulos/${id}`


                    }
                }
            }

            console.log(moduloEnviar);
            try {
                const resultado2 = await axiosPostHetoas(href, moduloEnviar, 'PUT');

                dispatch({
                    type: MODIFICAR_SUBMODULO,
                    payload: resultado2,
                })

            } catch (error) {
                console.log(error);
            }

            dispatch({
                type: REGISTRAR_SUBMODULO,
                payload: resultado
            })



        } catch (error) {
            console.log(error);
        }
    }

    const actualizarSubModulo = async submodulo => {

        console.log('x=>>', submodulo)
        const { id, dssubmodulo,  boactivo, crcModulosCollection } = submodulo;


        let moduloEnviar = {
            dssubmodulo,
            'usuarioCreacionId': `${process.env.REACT_APP_API_URL}msubModulosodulos/${UserService.getIdUSuario()}`,
            boactivo,
            'crcModulosCollection': [{}],
            "perfiles": []

        }
        console.log(moduloEnviar);
        try {
            const resultado = await axiosPostHetoas(`${process.env.REACT_APP_API_URL}subModulos/${id}`, moduloEnviar, 'PUT');

            dispatch({
                type: MODIFICAR_SUBMODULO,
                payload: resultado,
            })
            console.log('Res 1.- =>', resultado)
            let moduloEnviarm = {

                '_links': {

                    '1': {
                        'href': `${process.env.REACT_APP_API_URL}modulos/${crcModulosCollection}`,
                        'submodulo_id': `${process.env.REACT_APP_API_URL}subModulos/${id}`


                    }
                }
            }
            console.log('MD 1.- =>', moduloEnviarm)
            const resultado2 = await axiosPostHetoas(`${process.env.REACT_APP_API_URL}subModulos/${id}/crcModulosCollection`, moduloEnviarm, 'PUT');
            console.log('Res 2.- =>', resultado)
            dispatch({
                type: MODIFICAR_SUBMODULO,
                payload: resultado2,
            })

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarSubModulo = async idModulo => {
        try {
            await axiosDeleteTipo(`subModulos/${idModulo}`);
            dispatch({
                type: ELIMINAR_SUBMODULO,
                payload: idModulo
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


            }}
        >
            {props.children}
        </SubModuloContext.Provider>
    )

}