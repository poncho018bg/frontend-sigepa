import React, { useContext, useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";

import ReactPDF, { PDFDownloadLink, Page, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const useStyles = makeStyles(stylesArchivo);

export const RegistroFinalizado = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [error, setError] = useState(false);
    const { solicitudFolio, registrarSolicitudFolio } = useContext(RegistroSolicitudContext);
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [open, setOpen] = React.useState(false);
    let history = useHistory();
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'Oswald'
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
            fontFamily: 'Oswald'
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman'
        },

        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },

    });

    useEffect(() => {
        console.log('Finalizar')
        let folios = {
            idPrograma: '0f8ff60c-bfce-49d9-8609-58368cdad5f8',
            idBeneficiario: '019faef4-37dd-4e9b-a1f2-a9e9835c3b60',
            idUsuario: 'a9ebeb7a-898d-4e7d-a867-3ee46c8bdf6f'
        }
        registrarSolicitudFolio(folios).then(response => {



            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setOpen(true);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            console.log('ERROR=>', err)
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        });
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const descargarFolio = () => {
        setOpen(false)
        history.push("/admin/consultaProgramas")
    };

   

    const MyDocument = () => (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                </Text>
                <Text style={styles.title}>Registro de solicitud exitosa</Text>

                <Text style={styles.title}>
                    Número de Folio de Solicitud: SSRE22000024
                </Text>
                <Text >
                    Para darle continuidad a tu trámite, es necesario conservar el número de folio
                </Text>
            </Page>
        </Document>
    );


    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Registro Exitoso</h4>
                </CardHeader>
                <CardBody>
                    
                </CardBody>
            </Card>

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                    <h2> Registro de solicitud exitosa </h2>
                </DialogTitle>
                <DialogContent >

                    <p> </p>
                    <p>Número de Folio de Solicitud: {solicitudFolio?.dsfoliosolicitud} </p>

                    <p>Para darle continuidad a tu trámite, es necesario conservar el número de folio</p>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => descargarFolio()} color="primary">
                    <PDFDownloadLink document={<MyDocument />} fileName={`${solicitudFolio?.dsfoliosolicitud}.pdf`} onClick={() => descargarFolio()}>
                            {({ blob, url, loading, error }) =>
                                 'Descargar'
                            }
                        </PDFDownloadLink>
                    </Button>
                   
                   
              
                </DialogActions>
            </Dialog>
        </GridItem>
    )
}