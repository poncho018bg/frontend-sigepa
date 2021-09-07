import React, { useContext, useEffect, useState } from 'react';
//import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core';
import { Button, Dialog, FormHelperText, DialogContent, DialogTitle, Grid, IconButton, TextField, makeStyles } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

import { axiosGetHetoas } from 'helpers/axios';

const useStyles = makeStyles(stylesArchivo);


export const DocumentoVigencia = ({ documentosRequisitos }) => {
    const classes = useStyles();
    const [vigencia, setVigencia] = useState([]);

    const { _links: { vigencias: { href } } } = documentosRequisitos;

    const { getVigenciaDocumentos, vigenciaList } = useContext(DocumentosContext);

    useEffect(() => {
        //getVigenciaDocumentos(documentosRequisitos);
        //console.log("vigencia console log--->", vigenciaList);
        const getVigencia = async () => {
            const result = await axiosGetHetoas(href);
            setVigencia(result);
        }
        getVigencia();
    }, [documentosRequisitos.id]);

    return (
        <span>
            {vigencia.dsvigencia}
        </span>
    )

}