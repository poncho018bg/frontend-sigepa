import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, FormHelperText, DialogContent, DialogTitle, Grid, IconButton, TextField, makeStyles } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';

import { axiosGetHetoas } from 'helpers/axios';

const useStyles = makeStyles(stylesArchivo);

/**
 * Busca los programas a los que se le asigno la firma
 * @param {Firma} Firma 
 * @returns programa.dsprograma
 */
export const FirmaPrograma = ({ Firma }) => {
    const classes = useStyles();
    const [programa, setPrograma] = useState([]);

    const { _links: { programas: { href } } } = Firma;

    useEffect(() => {
        const GetPrograma = async () => {
            const result = await axiosGetHetoas(href);
            setPrograma(result);
        }
        GetPrograma();
    }, [Firma.id]);

    return (
        <span>
            {programa.dsprograma}
        </span>
    )
}