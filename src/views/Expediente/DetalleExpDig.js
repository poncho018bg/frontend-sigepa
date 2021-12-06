import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Box, Button, Container, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { DialogAgregarArchivos } from './DialogAgregarArchivos'
//import { expDigDocumentosStartLoading, expDigDocStartLoading } from 'actions/expediente/expedienteAction';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import GridItem from 'components/Grid/GridItem';
import moment from 'moment';
import 'moment/locale/es';
import { Document, Page } from '@react-pdf/renderer';

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
moment.locale('es');

export const DetalleExpDig = (props) => {


    const location = useLocation();
    const dispatch = useDispatch();
    const [showCambio, setShowCambio] = useState(false);
    const [infoGral, setInfoGral] = useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [showDialogForm, setShowDialogForm] = useState(false);

    const handleChangePage = (event, newPage) => {
       // dispatch(expDigDocStartLoading(documentos[newPage].id))
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

     //   if (props.etapaSeleccionada === null || props.etapaSeleccionada === undefined) {
           // dispatch(expDigDocumentosStartLoading(null, null));
     //   } else {
           // dispatch(expDigDocumentosStartLoading(props.etapaSeleccionada.idEtapa, location.state.idExpediente));
      //  }
        setShowCambio(true);
    }, [props.etapaSeleccionada]);

    const documentos = null //useSelector((state) => state.expDig.lsDocumentos);

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

    const addDialog = () => {
        console.log('abriendo');
        setShowDialogForm(true);
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    const archivo = null // useSelector(state => state.expDig.archivo);
    const fileContent = 'data:application/pdf;base64, ' + (archivo === null ? ' ' : archivo.base64);

    if (props.etapaSeleccionada === null || props.etapaSeleccionada === undefined) {
        return (
            <Box display="flex" justifyContent="center" borderColor="black" border={5} flex="auto">
                <Grid item xs={11} border={10} borderColor="primary.main" >
                    <h3>Datos generales</h3>
                </Grid>
                
            </Box>


        )
    }
    return (
        <Box display="flex" justifyContent="center" borderColor="black" border={5} flex="auto">

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
                                                        <strong>Número de hoja</strong>
                                                        <br />
                                                        {row.nohoja}
                                                    </GridItem>
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
                                                    <GridItem xs={12} sm={12} md={12}>
                                                        <strong>Observaciones</strong>
                                                        <br />
                                                        {row.dsobservaciones}
                                                    </GridItem>
                                                </Container>
                                            </Drawer>
                                        </TableCell>
                                    </TableRow >
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
                    idExpediente={location.state.idExpediente}
                />
            </Grid>

        </Box>
    )
}
