import React, { useContext, useEffect, useState, useRef } from 'react';
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
import { DialogActions, DialogContent } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import ReactToPrint from "react-to-print";
import { PDFDownloadLink, Page, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';
import { ComponentToPrint } from './folio';
import Typography from '@material-ui/core/Typography';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});




const useStyles = makeStyles(stylesArchivo);

export const RegistroFinalizado = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [error, setError] = useState(false);
    const { solicitudFolio, registrarSolicitudFolio } = useContext(RegistroSolicitudContext);
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [open, setOpen] = React.useState(false);
    const componentRef = useRef();
    const { beneficiario, idPrograma, nombrePrograma, origen } = props;

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
        console.log('origen=>', origen)
        let folios;
        if (beneficiario.id !== undefined) {
            folios = {
                idPrograma: idPrograma,
                idBeneficiario: beneficiario?.id,
                idUsuario: '1fd03e93-887c-4c48-9a25-71097e7f71f4',
                idOrigen: origen?.id
            }
        } else {
            folios = {
                idPrograma: idPrograma,
                idBeneficiario: beneficiario[0]?.id,
                idUsuario: '1fd03e93-887c-4c48-9a25-71097e7f71f4',
                idOrigen: origen?.id
            }
        }

        /**
         * registra el folio de la solicitud
         */
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

    useEffect(() => {
        sessionStorage.setItem('foliosol', solicitudFolio?.dsfoliosolicitud)
    }, [solicitudFolio]);

    const handleClose = () => {
        setOpen(false);
        window.location.reload(false);
    };

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Registro Exitoso</h4>
                </CardHeader>
                <CardBody>
                </CardBody>
            </Card>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth={true}>
                <DialogContent >
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Registro Exitoso</h4>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="body1" color="text.secondary">
                                Registro de solicitud exitosa para el Programa “{nombrePrograma}", cualquier duda o aclaración favor de comunicarse a la Dirección General de Programas Sociales Estratégicos al 722 2 13 89 15 extensiones de la 808 a la 811 y en el Centro de Atención Telefónica del Gobierno del Estado de México (CATGEM) al 800 22 57 333 para el interior de la República y 070 para Toluca y zona conurbada, las 24 horas del día, los 365 días del año
                            </Typography>
                        </CardBody>
                    </Card>
                </DialogContent>
            </Dialog>
        </GridItem>
    )
}