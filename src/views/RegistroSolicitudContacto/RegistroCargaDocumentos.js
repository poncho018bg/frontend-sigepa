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

import { PictureAsPdf } from '@material-ui/icons';

const useStyles = makeStyles(stylesArchivo);

const Input = styled('input')({
    display: 'none',
});


export const RegistroCargaDocumentos = (props) => {
    const classes = useStyles();
    const { documentosApoyoList, getDocumentosApoyo,
        documentosBoveda,
        registrarDatosBoveda } = useContext(RegistroCargaDocumentosContext);
    const { beneficiario } = props;
    //    const {idPrograma} = props;
    const [archivo, setArchivos] = useState([]);
    const [sesion, setSesion] = useState("");

    const [boveda, setBoveda] = useState();

    let idPrograma = '8cbd2101-ef40-4fad-8698-5911ccecaf54';


    useEffect(() => {
        getDocumentosApoyo(idPrograma);
        console.log("documentos ", documentosApoyoList);
        const getLogin = async () => {
            const result = await axiosLoginBoveda();
            console.log("resultado de la sesion ", result);
            setSesion(result);
        }
        getLogin();
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

    const handleChange = e => {
        console.log("files", e);
        /**
         * Aqui se llenan los archivos que se van a subir a la boveda
         */
        if (e[0] != undefined) {
            console.log("PRUEBA ", new File([e[0]], `${+new Date()}_${e[0].name}`, { type: e[0].type }));
            setArchivos(new File([e[0]], `${+new Date()}_${e[0].name}`, { type: e[0].type }));
        }

    }

    const submit = (documentoApoyo) => {
        //mandar llamar el inicio de sesión
        console.log("sesion de la boveda ", sesion, idPrograma);
        //subir archivo
        const data = new FormData();
        //archivo o archivos a subir
        console.log("archivo submit ====>", archivo);
        data.append("file", archivo);
        //id del usuario de la boveda
        data.append("userId", sesion.userId);
        //metadata
        data.append("metadata", '{"idPrograma":"' + idPrograma + '"}');

        const getGuardar = async (documentoApoyo) => {
            const result = await axiosPostFile(data, sesion.token);
            console.log("retorno algo? -->", result);
            setBoveda(result);

            console.log("AQUI LLEGA EL GUARDAR EN LA BOVEDA")
            guardarDatosBoveda(documentoApoyo, result);
        }
        getGuardar(documentoApoyo);
    }

    const guardarDatosBoveda = (documentoApoyo, result) => {
        var datos = JSON.parse(result.data.message);
        console.log("beneficiarios ====> ", beneficiario);
        console.log("Boveda ===========> ", datos.fileId);
        console.log("Documento Apoyo ==> ", documentoApoyo);
        let datosGuardar = {
            documentoId: documentoApoyo.id,
            beneficiarioId: beneficiario.id,
            documentoBovedaId: datos.fileId
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
                                            dropzoneText={"Arrastra un pdf aqui o da clic para agregar un archivo"}
                                            getPreviewIcon={handlePreviewIcon}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            type="submit"
                                            onClick={() => submit(row)}>
                                            Subir
                                        </Button>
                                    </Grid>
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