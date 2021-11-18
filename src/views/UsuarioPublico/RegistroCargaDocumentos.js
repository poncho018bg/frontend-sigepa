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

import { axiosLoginBoveda, axiosPostFile } from 'helpers/axiosBoveda';
import axios from "axios";
import { axiosGet } from 'helpers/axiosPublico';

import { PictureAsPdf } from '@material-ui/icons';
import { Mensaje } from 'components/Personalizados/Mensaje';

const useStyles = makeStyles(stylesArchivo);

const Input = styled('input')({
    display: 'none',
});


export const RegistroCargaDocumentos = (props) => {
    const classes = useStyles();
    const { documentosApoyoList, getDocumentosApoyo,
        existeDocumento,existedoc,
        registrarDatosBoveda } = useContext(RegistroCargaDocumentosContext);
    const { beneficiario } = props;
    const { idPrograma } = props;
    const { identPrograma } = props;
    const { setValidarDocs, validarDocs, setActivar } = props;
    const [archivo, setArchivos] = useState([]);
    const [sesion, setSesion] = useState("");

    const [boveda, setBoveda] = useState();
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    //let idPrograma = '8cbd2101-ef40-4fad-8698-5911ccecaf54';


    useEffect(() => {
        if (identPrograma !== undefined) {
            getDocumentosApoyo(identPrograma, beneficiario.id);
        } else {
            getDocumentosApoyo(idPrograma, beneficiario.id);
        }

        console.log("documentos ", documentosApoyoList);
        const getLogin = async () => {
            const result = await axiosLoginBoveda();
            console.log("resultado de la sesion ", result);
            setSesion(result);
        }
        getLogin();
    }, []);

    /**
     * Se crea el array con los documentos para validar si ya estan cargados,
     * se inicializan todos en false
     */

    useEffect(() => {
        setActivar(true)
        if (documentosApoyoList.length > 0) {           
            documentosApoyoList.map(e => {
              if(!e.validarCarga){
                setActivar(false)
              }
            })            
        }

        setValidarDocs(documentosApoyoList)
    }, [documentosApoyoList]);





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

    const handleChange = e => {

        /**
         * Aqui se llenan los archivos que se van a subir a la boveda
         */
        if (e[0] != undefined) {

            setArchivos(new File([e[0]], `${+new Date()}_${e[0].name}`, { type: e[0].type }));
        }

    }

    const submit = (documentoApoyo) => {
        //mandar llamar el inicio de sesión

        //subir archivo
        const data = new FormData();
        //archivo o archivos a subir

        data.append("file", archivo);
        //id del usuario de la boveda
        data.append("userId", sesion.data.userId);
        //metadata
        data.append("metadata", '{"idPrograma":"' + idPrograma + '"}');

        const getGuardar = async (documentoApoyo) => {
            const result = await axiosPostFile(data, sesion.token);
            console.log("retorno algo? -->", result);
            setBoveda(result);

            console.log("AQUI LLEGA EL GUARDAR EN LA BOVEDA")
            guardarDatosBoveda(documentoApoyo, result);
            setOpenSnackbar(true);
            setMsjConfirmacion(`Archivo guardado`);

            //confirmar carga de docuemnto en el array de validaciones
            
            getDocumentosApoyo(idPrograma, beneficiario.id);

            validandodocs();

        }
        getGuardar(documentoApoyo);
        setOpenSnackbar(false);


    }

    const guardarDatosBoveda = (documentoApoyo, result) => {
        //var datos = JSON.parse(result.data);

        let datosGuardar = {
            documentoId: documentoApoyo.idDocumentoRequisito,
            beneficiarioId: beneficiario.id,
            documentoBovedaId: result.data.fileId
        }
        registrarDatosBoveda(datosGuardar);
    }


    const handlePreviewIcon = (fileObject, classes) => {
        const { type } = fileObject.file
        const iconProps = {
            className: classes.image,
        }

        switch (type) {
            case "application/pdf":
                return <PictureAsPdf {...iconProps} />
        }
    }



    const validandodocs = () => {
        setActivar(true)
        documentosApoyoList.map(e => {
            if (!e?.validarCarga) {
                setActivar(false)
            }
        })
        console.log('VALIDANDO DOCS', documentosApoyoList)
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
                                    <h4>{row.nombreDocumento}</h4>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={6}>
                                        <DropzoneArea
                                            acceptedFiles={['application/pdf']}
                                            filesLimit='1'
                                            onChange={handleChange}
                                            dropzoneText={"Arrastra un pdf aquí o da clic para agregar un archivo"}
                                            getPreviewIcon={handlePreviewIcon}
                                        />
                                    </Grid>
                                   

                                    <Button variant="contained" color="primary" disabled={row.validarCarga}   onClick={() => submit(row)}>
                                        Subir
                                    </Button>
                                </Grid>
                            </Grid>
                        );
                    })
                    }
                </CardBody>
            </Card>
            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </GridItem>
    )
}