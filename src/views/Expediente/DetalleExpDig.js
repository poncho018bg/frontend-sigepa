import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Box, Button, Container, DialogContent, IconButton, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { DialogAgregarArchivos } from './DialogAgregarArchivos'
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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
moment.locale('es');

//imports de los datos generales del expediente 
import { DatosGeneralesExpediente } from './DatosGeneralesExpediente';
import { DireccionExpediente } from './DireccionExpediente';
import { ContactoExpediente } from "./ContactoExpediente"
import { ApoyosRecibidosExpediente } from "./ApoyosRecibidosExpediente"
import { ObservacionesExpediente } from "./ObservacionesExpediente"
import { FormularioExpediente } from './FormularioExpediente';

/**
 * Aqui se va a mostrar el detalle del expediente del beneficiario
 * @param {props} props 
 * @returns 
 */

export const DetalleExpDig = (props) => {

    /**
     * props beneficiario
     */
    const { idBeneficiario, beneficiarioPadre, setIdentPrograma, idProgramaExpediente, setIdProgramaExpediente, direccionBeneficiario  ,idExpedienteBoveda} = props;

    const location = useLocation();
    const dispatch = useDispatch();
    const [showCambio, setShowCambio] = useState(false);
    const [infoGral, setInfoGral] = useState(false);

    const { expDigDocumentosStartLoading, documentosExpedienteLst, expDigDocStartLoading, contenidoDocumento, deshabilitarDocumentoExpediente, deshabilitarDocumento } = useContext(ExpedienteContext);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [showDialogForm, setShowDialogForm] = useState(false);
    const idExpediente = idExpedienteBoveda
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
        console.log('1 Actualizar docs',props.etapaSeleccionada?.idEtapa)
        console.log('2 Actualizar docs',idExpediente)
        console.log('3 Actualizar docs',idExpedienteBoveda)
        expDigDocumentosStartLoading(props.etapaSeleccionada?.idEtapa, idExpediente);
        expDigDocStartLoading(documentos[page]?.id)
    }, [showDialogForm]);

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

    if (props.etapaSeleccionada === '00000000-0000-0000-0000-000000000000' || props.etapaSeleccionada === null || props.etapaSeleccionada === undefined) {
        return (
            <Box display="flex" justifyContent="center" borderColor="black" border={1} flex="auto">{console.log('xp',idExpedienteBoveda) }{console.log('xp',idExpediente)}
                <Grid item xs={12} border={10} borderColor="primary.main" >
                    <h3>Datos generales</h3>
                    <DatosGeneralesExpediente
                        beneficiarioPadre={beneficiarioPadre}
                        setIdentPrograma={setIdentPrograma}
                        setIdProgramaExpediente={setIdProgramaExpediente} />
                    <DireccionExpediente
                        direccionBeneficiario={direccionBeneficiario}
                        idBeneficiario={idBeneficiario} />
                    <ContactoExpediente
                        direccionB={direccionBeneficiario}
                        idBeneficiario={idBeneficiario} />
                    <ApoyosRecibidosExpediente
                        idBeneficiario={idBeneficiario} />
                    <ObservacionesExpediente idBeneficiario={idBeneficiario}
                        idProgramaExpediente={idProgramaExpediente}
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
                    idProgramaExpediente={idProgramaExpediente}/>
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
                                                <IconButton aria-label="delete" onClick={() => deshabilitarDocumentos(row)}>
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

                />
            </Grid>

        </Box>
    )
}
