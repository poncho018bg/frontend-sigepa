import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import BlockIcon from '@material-ui/icons/Block';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

//contexts
import { DocumentosContext } from 'contexts/catalogos/documentosContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';


import { DocumentosForm } from './DocumentosForm';
import { DocumentosEdit } from './DocumentosEdit';
import { DocumentoVigencia } from './DocumentoVigencia';
import { DocumentosProgramas } from './DocumentosProgramas';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const DocumentosScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');

    const [documentoSeleccionado, setDocumentoSeleccionado] = useState();
    const { getDocumentos, documentosList, eliminarDocumentos } = useContext(DocumentosContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const [idEliminar, setIdEliminar] = useState(0);
    const [documentoProgramaSeleccionado, setDocumentoProgramaSeleccionado] = useState();
    const [verProgramasDocumento, setVerProgramasDocumento] = useState();
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const { setShowModalUpdate }
        = useContext(ModalContextUpdate);


    useEffect(() => {
        getDocumentos();
        // eslint-disable-next-line
        console.log("documentos", documentosList);
    }, []);


    const onSelect = (e) => {
        setShowModalUpdate(true);
        setDocumentoSeleccionado(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }
    const handleDeshabilitar = () => {
        eliminarDocumentos(idEliminar)

        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
    }


    const verProgramas = (e) => {
        console.log("programa seleccionado --->", e);
        setDocumentoProgramaSeleccionado(e);
        setVerProgramasDocumento(true);
    }

    const cerrarVistaProgramas = () => {
        setVerProgramasDocumento(false);
        setDocumentoProgramaSeleccionado(null);
    }


    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Documentos</h4>
                    <p className={classes.cardCategoryWhite}>
                        En esta zona se consultan los documentos y programas a los que tiene asignados
                    </p>
                    <CardActions>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    color="white"
                                    aria-label="edit"
                                    justIcon round
                                    onClick={addDialog}
                                >
                                    <Add />
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <SearchBar
                                    placeholder={t('lbl.buscar')}
                                    value={searched}
                                    onChange={(searchVal) => setSearched(searchVal)}
                                    onCancelSearch={() => setSearched('')}
                                />
                            </Grid>
                        </Grid>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="ta1" >
                                < TableCell align="center">Documento</TableCell >
                                < TableCell align="center" >Programa de apoyo</TableCell >
                                < TableCell align="center">Vigencia</TableCell >
                                < TableCell align="center" > Estatus</TableCell >
                                < TableCell colSpan={2} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    documentosList.filter(row => row.dsdocumento ?
                                        row.dsdocumento.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : documentosList
                                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                                    
                                    return (
                                        < TableRow key={row.id}>

                                            <TableCell align="center">{row.dsdocumento}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    color="white"
                                                    aria-label="edit"
                                                    round
                                                    onClick={() => verProgramas(row)}
                                                >
                                                    Ver Programas
                                                </Button>
                                            </TableCell >
                                            <TableCell align="center">
                                                <DocumentoVigencia key={i}
                                                    documentosRequisitos={row}
                                                    actualiza={row.fechaRegistro} />
                                            </TableCell>

                                            <TableCell align="center">
                                                {row.activo === true ? 'Activo' : 'Inactivo'}
                                            </TableCell>

                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                                                    {(row.activo) ? <BlockIcon /> : <BlockIcon />}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow >
                                    );
                                })
                            }
                        </TableBody >
                    </ Table>
                    < TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        labelRowsPerPage={t('dgv.registrospaginas')}
                        count={documentosList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>
            <Modal>
                <DocumentosForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <DocumentosEdit
                    documentoSeleccionado={documentoSeleccionado}
                />
            </ModalUpdate>
            {verProgramasDocumento === true &&
                <DocumentosProgramas
                    documentoProgramaSeleccionado={documentoProgramaSeleccionado}
                    cerrarVistaProgramas={cerrarVistaProgramas}
                />
            }

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />

        </GridItem>
    )

}