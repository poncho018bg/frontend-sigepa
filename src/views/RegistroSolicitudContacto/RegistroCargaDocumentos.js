import React, { useContext, useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Grid, TextField, Button } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { styled } from "@material-ui/core/styles";

//context
import { RegistroCargaDocumentosContext } from 'contexts/registroCargaDocumentosContext';

//dropzone
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles(stylesArchivo);

const Input = styled('input')({
    display: 'none',
});


export const RegistroCargaDocumentos = () => {
    const classes = useStyles();
    const { documentosApoyoList, getDocumentosApoyo } = useContext(RegistroCargaDocumentosContext);
    //aqui va el id del apoyo momentaneo, este debe llegar desde otro lado
    let idApoyo = '75424371-b980-48c7-8a3f-b13ef586705e';

    useEffect(() => {
        getDocumentosApoyo(idApoyo);
        console.log("documentos ", documentosApoyoList);
    }, []);

    /**
     * funciones del dropzone
     */
    const [open, setOpen] = useState('false');
    const [files, setFiles] = useState([]);

    const handleClose = () => {
        setOpen('false');
    }

    const handleSave = files => {
        setFiles(files);
        setOpen('false');
    }

    const handleOpen = () => {
        setOpen('true');
    }

    const handleChange = files => {
        console.log("files", files)
    }




    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Carga de documentos</h4>
                </CardHeader>
                <CardBody>
                    {(documentosApoyoList
                    ).map((row, i) => {
                        return (
                            <Grid container spacing={1} key={i}>
                                <Grid item xs={12}>
                                    {row.documento}
                                </Grid>
                                {/*
                                <Grid item xs={12}>
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="pdf/*"
                                            id="contained-button-file"
                                            multiple="false"
                                            type="file"
                                            className="form-control"
                                        />
                                        <Button variant="contained" component="span">
                                            Subir
                                        </Button>
                                    </label>
                                </Grid>
                                */}
                                <Grid item xs={12}>
                                    <DropzoneArea
                                        acceptedFiles={['application/pdf']}
                                        filesLimit='1'
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })
                    }
                </CardBody>
            </Card>
        </GridItem>
    )
}