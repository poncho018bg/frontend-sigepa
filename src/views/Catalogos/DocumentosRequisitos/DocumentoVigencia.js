import React, { useEffect, useState } from 'react';

import {  makeStyles } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';

import { axiosGetHetoas } from 'helpers/axios';

/**
 * Busca la vigencia del documento utilizando el href hetoas
 * @param {documentosRequisitos} documentosRequisitos 
 * @returns vigencia
 */
export const DocumentoVigencia = ({ documentosRequisitos, actualiza }) => {
    const [vigencia, setVigencia] = useState([]);

    const { _links: { vigencias: { href } } } = documentosRequisitos;


    useEffect(() => {
        const getVigencia = async () => {
            const result = await axiosGetHetoas(href);
            setVigencia(result);
        }
        getVigencia();
    }, [actualiza]);

    return (
        <span>
            {vigencia.dsvigencia}
        </span>
    )

}