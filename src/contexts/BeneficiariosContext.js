import React, { createContext, useReducer } from 'react';
import BeneficiarioReducer from 'reducers/BeneficiarioReducer';
import { axiosGet } from 'helpers/axiosPublico';

import { GET_PADRON_BENEFICIARIOS, GET_DETALLE_PADRON_BENEFICIARIOS } from 'types/actionTypes';

export const BeneficiariosContext = createContext();

const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL

export const BeneficiariosContextProvider = props => {

    const initialState = {
        padronList: [],
        beneficiariaList: [],
        error: false,
        page: 0,
        size: 10,
        total: 0

    }

    const [state, dispatch] = useReducer(BeneficiarioReducer, initialState);


    const getPadronBeneficiarios = async parametros => {

        try {
            const resultado = await axiosGet(`beneficiarioOverride/padron/${parametros.nombrebeneficiario}/${parametros.curp}/${parametros.idPrograma}/${parametros.idTipoApoyo}/${parametros.anioPrograma}/${parametros.motivoRechazo}`);
            dispatch({
                type: GET_PADRON_BENEFICIARIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getDetalleBeneficiarios = async idBeneficiario => {

        try {
            const resultado = await axiosGet(`beneficiarioOverride/detallepadron/${idBeneficiario}/NULL`);
            dispatch({
                type: GET_DETALLE_PADRON_BENEFICIARIOS,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BeneficiariosContext.Provider
            value={{
                padronList: state.padronList,
                beneficiariaList:state.beneficiariaList,
                getPadronBeneficiarios,
                getDetalleBeneficiarios
               
            }}
        >
            {props.children}
        </BeneficiariosContext.Provider>
    )

}