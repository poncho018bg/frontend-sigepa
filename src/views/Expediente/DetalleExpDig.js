import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Box, Button, Container, DialogContent, IconButton, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { DialogAgregarArchivos } from './DialogAgregarArchivos'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//import { expDigDocumentosStartLoading, expDigDocStartLoading } from 'actions/expediente/expedienteAction';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import { pdfjs } from 'react-pdf';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import GridItem from 'components/Grid/GridItem';
import moment from 'moment';
import 'moment/locale/es';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ExpedienteContext } from 'contexts/expedienteContext';
import GridContainer from 'components/Grid/GridContainer';
import { useTranslation } from 'react-i18next';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
moment.locale('es');

//imports de los datos generales del expediente 
import { DatosGeneralesExpediente } from './DatosGeneralesExpediente';
import { DireccionExpediente } from './DireccionExpediente';
import { ContactoExpediente } from "./ContactoExpediente"
import { ApoyosRecibidosExpediente } from "./ApoyosRecibidosExpediente"
import { ObservacionesExpediente } from "./ObservacionesExpediente"
import { FormularioExpediente } from './FormularioExpediente';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { ModalContext } from 'contexts/modalContex';

/**
 * Aqui se va a mostrar el detalle del expediente del beneficiario
 * @param {props} props 
 * @returns 
 */

export const DetalleExpDig = (props) => {
    const { t } = useTranslation();
    /**
     * props beneficiario
     */
    const { idBeneficiario, beneficiarioPadre, setIdentPrograma, idProgramaExpediente, direccionBeneficiario, idExpedienteBoveda } = props;

    const location = useLocation();
    const dispatch = useDispatch();
    const [showCambio, setShowCambio] = useState(false);
    const [infoGral, setInfoGral] = useState(false);
    const [validarCargaDocs, setValidarCargaDocs] = useState(false);

    const { expDigDocumentosStartLoading, documentosExpedienteLst, expDigDocStartLoading, contenidoDocumento, deshabilitarDocumentoExpediente, deshabilitarDocumento ,generarExpedientepdf} = useContext(ExpedienteContext);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [showDialogForm, setShowDialogForm] = useState(false);
    const idExpediente = idExpedienteBoveda

    const { setShowModal } = useContext(ModalContext);
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [dtosgrlsprint, setDtosgrlsprint] = useState({});

    const handleChangePage = (event, newPage) => {
        // dispatch(expDigDocStartLoading(documentos[newPage].id))
        expDigDocStartLoading(documentos[newPage].id)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        if (validarCargaDocs) {

            console.log('1 Actualizar docs', props.etapaSeleccionada?.idEtapa)
            console.log('2 Actualizar docs', idExpediente)
            console.log('3 Actualizar docs', idExpedienteBoveda)
            expDigDocumentosStartLoading(props.etapaSeleccionada?.idEtapa, idExpediente).then(response => {
                setOpenSnackbar(true);

                setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

                const timer = setTimeout(() => {
                    setValidarCargaDocs(false)
                    setError(false);
                    setShowModalConfirmacion(false);
                    setShowModal(false);

                    console.log('4 Actualizar docs', documentos[page]?.id)
                    expDigDocStartLoading(documentos[page]?.id)


                }, 1500);
                return () => clearTimeout(timer);
            })
                .catch(err => {
                    console.log('err', err)
                    setOpenSnackbar(true);
                    setError(true);
                    setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
                });
        }


    }, [validarCargaDocs]);

    useEffect(() => {
        console.log('CAMBIO DE ETAPA', props.etapaSeleccionada)
        if (props.etapaSeleccionada !== '00000000-0000-0000-0000-000000000000' && props.etapaSeleccionada !== '00000000-0000-0000-0000-000000000001') {
            expDigDocumentosStartLoading(props.etapaSeleccionada?.idEtapa, idExpediente);
            console.log('CAMBIO DE ETAPA EXIT', props.etapaSeleccionada)
        }
        setShowCambio(true);
    }, [props.etapaSeleccionada]);

    const documentos = documentosExpedienteLst //useSelector((state) => state.expDig.lsDocumentos);

    useEffect(() => {
        if (documentos !== null && documentos !== undefined && documentos.length === 1) {
            handleChangePage(null, 0);
        }
    }, [documentos]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setInfoGral(open);
    };
    const downloadPDF = (bytes, nombredoc, folio) => {
        const downloadLink = document.createElement("a");
        const fileName = `${nombredoc}_${folio}.pdf`;
        downloadLink.href = bytes;
        downloadLink.download = fileName;
        downloadLink.click();
    }


    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idDocumentoBorrar, setIdDocumentoBorrar] = useState("");
    const deleteDialog = (e) => {
        console.log("se selecciona este archivo ==>", e)
        setShowModalDelete(true);
        setIdDocumentoBorrar(e.id)
    }

    const handleClose = () => {
        setShowModalDelete(false)
    }

    const handleAceptar = () => {
        console.log('aceptar');
        deshabilitarDocumentos();
    }

    const deshabilitarDocumentos = () => {
        console.log('idDocumentoexp=>', idDocumentoBorrar)
        deshabilitarDocumentoExpediente(idDocumentoBorrar).then(response => {
            const timer = setTimeout(() => {
                expDigDocumentosStartLoading(props.etapaSeleccionada?.idEtapa, idExpediente);
            }, 1000);

            return () => clearTimeout(timer);
        }).catch(err => {
            console.log(err)
        })
        setShowModalDelete(false)
    }

    /*
    const deshabilitarDocumentos = (idDocumentoexp) => {
        console.log('idDocumentoexp=>', idDocumentoexp)
        deshabilitarDocumentoExpediente(idDocumentoexp.id).then(response => {


            const timer = setTimeout(() => {
                expDigDocumentosStartLoading(props.etapaSeleccionada?.idEtapa, idExpediente);

            }, 1000);

            return () => clearTimeout(timer);
        }).catch(err => {
            console.log(err)
        })
    }
    */

    const addDialog = () => {
        console.log('abriendo');
        setShowDialogForm(true);
    }
    

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    const archivo = contenidoDocumento // useSelector(state => state.expDig.archivo);
    const fileContent = 'data:application/pdf;base64, ' + (archivo === null ? ' ' : archivo?.base64);


    
    const imprimirpdf = () => {
        console.log('Dtosgrlsprint=>',dtosgrlsprint)
        
        console.log('Dtosgrlsprint=>',dtosgrlsprint)
        let data = {
                preguntasjson : {},
                respuestasjson: {} ,
                datosGeneralesExpedienteDTO:dtosgrlsprint,
                ruta:dtosgrlsprint.ruta
        }
        generarExpedientepdf(data).then(response => {
            console.log('generarExpedientepdf=>',response)
        }).catch(err => {
            console.log(err)
        })
    }

    if (props.etapaSeleccionada === '00000000-0000-0000-0000-000000000000' || props.etapaSeleccionada === null || props.etapaSeleccionada === undefined) {
        return (
            <Box display="flex" justifyContent="center" borderColor="black" border={1} flex="auto">{console.log('xp', idExpedienteBoveda)}{console.log('xp', idExpediente)}
                <Grid item xs={12} border={10} borderColor="primary.main" >
                    <h3>Datos generales</h3>
                    <Grid item xs={12} style={{textAlign:'end'}}>
                        <Button
                            variant="contained"
                            color="primary"                           
                            size="large"
                            onClick={()=>imprimirpdf()}
                        >
                            Imprimir
                        </Button>
                    </Grid>
                    <DatosGeneralesExpediente
                        beneficiarioPadre={beneficiarioPadre}
                        setIdentPrograma={setIdentPrograma}
                        setDtosgrlsprint={setDtosgrlsprint}
                        dtosgrlsprint={dtosgrlsprint}
                    //setIdProgramaExpediente={setIdProgramaExpediente}
                    />
                    <DireccionExpediente
                        direccionBeneficiario={direccionBeneficiario}
                        idBeneficiario={idBeneficiario}
                        setDtosgrlsprint={setDtosgrlsprint} 
                        dtosgrlsprint={dtosgrlsprint}/>
                    <ContactoExpediente
                        direccionB={direccionBeneficiario}
                        idBeneficiario={idBeneficiario}
                        setDtosgrlsprint={setDtosgrlsprint} 
                        dtosgrlsprint={dtosgrlsprint}/>
                    <ApoyosRecibidosExpediente
                        idBeneficiario={idBeneficiario} 
                        setDtosgrlsprint={setDtosgrlsprint}
                        dtosgrlsprint={dtosgrlsprint}/>
                    <ObservacionesExpediente idBeneficiario={idBeneficiario}
                        idProgramaExpediente={idProgramaExpediente}
                        setDtosgrlsprint={setDtosgrlsprint}
                        dtosgrlsprint={dtosgrlsprint}
                    />
                </Grid>
            </Box>
        )
    }

    if (props.etapaSeleccionada === '00000000-0000-0000-0000-000000000001') {
        return (
            <Box display="flex" justifyContent="center" borderColor="black" border={1} flex="auto">
                <Grid item xs={11} border={10} borderColor="primary.main" >
                    <h3>Información de la beneficiaria</h3>
                    <FormularioExpediente
                        idBeneficiario={idBeneficiario}
                        idProgramaExpediente={idProgramaExpediente}
                        setDtosgrlsprint={setDtosgrlsprint}
                        dtosgrlsprint={dtosgrlsprint} />
                </Grid>
            </Box>


        )
    }

    return (
        <Box display="flex" justifyContent="center" borderColor="black" border={1} flex="auto">

            <Grid item xs={11} border={10} borderColor="primary.main" >

                <h3>{props.etapaSeleccionada.dsetapa}</h3>
                <hr />
                <Button width={30}
                    variant="contained"
                    color="primary"
                    onClick={addDialog}
                    size="large"
                >Registrar expediente
                </Button>


                < TablePagination
                    rowsPerPageOptions={[1]}
                    component="div"
                    labelRowsPerPage="Registros por página"
                    count={documentos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                < Table stickyHeader aria-label="sticky table" >
                    < TableBody >
                        {
                            documentos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={1}>
                                                <IconButton aria-label="delete" onClick={() => downloadPDF(fileContent, row.dsnombredocumento, moment(new Date()).format("yyyy_MM_DD_HH_mm_ss"))}>
                                                    <GetAppIcon fontSize="large" />
                                                </IconButton>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={1}>
                                                <IconButton aria-label="delete" onClick={() => deleteDialog(row)}>
                                                    <DeleteIcon fontSize="large" />
                                                </IconButton>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <h5> {row.dsnombredocumento}</h5>
                                            </GridItem>
                                        </GridContainer>

                                        < TableRow key={row.id}>



                                            <TableCell>
                                                <div style={{ width: '100%' }}>
                                                    <Button
                                                        style={{ right: '0', position: 'fixed', top: '50%', zIndex: '1000' }}
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={toggleDrawer(true)}
                                                        size="large"
                                                        aria-label="Ver Metadatos" component="span"
                                                    ><ArrowBackIos />
                                                    </Button >
                                                    {archivo !== null &&
                                                        <Document file={fileContent}
                                                            onLoadSuccess={onDocumentLoadSuccess}
                                                        >
                                                            <Page pageNumber={pageNumber} />
                                                        </Document>}
                                                    {/* <p>Page {pageNumber} of {numPages}</p> */}
                                                </div>
                                                <Drawer anchor={'right'} open={infoGral} onClose={toggleDrawer(false)}>
                                                    <Container maxWidth="lg">
                                                        <h3>Información General</h3>

                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <strong>Fecha de creación</strong>
                                                            <br />
                                                            {moment(row.fcfecharegistro).format("DD/MMM/YYYY")}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <strong>Fecha de documento</strong>
                                                            <br />
                                                            {moment(row.fcfechadocumento).format("DD/MMM/YYYY")}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <strong>Nombre documento</strong>
                                                            <br />
                                                            {row.dsnombredocumento}
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <strong>Subclasificación</strong>
                                                            <br />
                                                            {row.etapa}
                                                        </GridItem>

                                                    </Container>
                                                </Drawer>
                                            </TableCell>
                                        </TableRow >
                                    </>
                                );
                            })
                        }
                    </TableBody >
                </ Table>
                < TablePagination
                    rowsPerPageOptions={[1]}
                    component="div"
                    labelRowsPerPage="Registros por página"
                    count={documentos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <DialogAgregarArchivos
                    showDialogForm={showDialogForm}
                    setShowDialogForm={setShowDialogForm}
                    etapaSeleccionada={props.etapaSeleccionada}
                    idExpediente={idExpediente}
                    idBeneficiario={idBeneficiario}
                    idProgramaExpediente={idProgramaExpediente}
                    setValidarCargaDocs={setValidarCargaDocs}

                />

                <Mensaje
                    setOpen={setOpenSnackbar}
                    open={openSnackbar}
                    severity={error ? "error" : "success"}
                    message={msjConfirmacion}
                />

                <Dialog
                    open={showModalDelete}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Esta seguro que desea borrar el archivo?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleAceptar} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

        </Box>
    )
}
