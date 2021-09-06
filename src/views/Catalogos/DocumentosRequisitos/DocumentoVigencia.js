import React, { useContext, useEffect, useState } from 'react';
//import { Button, Dialog, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core';
import { Button, Dialog, FormHelperText, DialogContent, DialogTitle, Grid, IconButton, TextField, makeStyles } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';

import { DocumentosContext } from 'contexts/catalogos/documentosContext';

const useStyles = makeStyles(stylesArchivo);


export const DocumentoVigencia = ({ documentosRequisitos }) => {
    const classes = useStyles();

    const { getVigenciaDocumentos, vigenciaList } = useContext(DocumentosContext);

    useEffect(() => {
        getVigenciaDocumentos(documentosRequisitos);
        console.log("vigencia console log--->", vigenciaList);
    }, []);

    return (
        <span>
            {vigenciaList.dsvigencia}
        </span>
    )

}