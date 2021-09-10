import React, { useContext, useEffect, useState } from 'react';

import {  makeStyles } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

import { axiosGetHetoas } from 'helpers/axios';

const useStyles = makeStyles(stylesArchivo);

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