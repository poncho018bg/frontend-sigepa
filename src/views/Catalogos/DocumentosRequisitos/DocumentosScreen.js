import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { Grid } from '@material-ui/core';
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

const useStyles = makeStyles(stylesArchivo);

export const DocumentosScreen = () => {

    const classes = useStyles();
    //const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [edadesBeneficiariosSeleccionado, setEdadesBeneficiariosSeleccionado] = useState();
    const [documentoSeleccionado, setDocumentoSeleccionado] = useState();
    const { getDocumentos, documentosList } = useContext(DocumentosContext);
    const { showModal, modalTitle, setShowModal, setModalTitle } = useContext(ModalContext);
    const { showModalDelete, setShowModalDelete } = useContext(ModalContextDelete);

    const [documentoProgramaSeleccionado, setDocumentoProgramaSeleccionado] = useState();
    const [verProgramasDocumento, setVerProgramasDocumento] = useState();


    const [vigenciaDocumentos, setVigenDocumento] = useState();

    const { showModalUpdate, modalTitleUpdate, setShowModalUpdate, setModalTitleUpdate }
        = useContext(ModalContextUpdate);

    const [actualiza, setActualiza] = useState('noactual');

    useEffect(() => {
        getDocumentos();
        // eslint-disable-next-line
        console.log("documentos", documentosList);
        setActualiza('actualiza');
    }, []);

    const total = 0;
    const idiomas = [];
    const size = 0;
    const page = 0;

    const handleChangePage = (event, newPage) => {
    };

    const handleChangeRowsPerPage = event => {
    };

    const onSelect = (e) => {
        setShowModalUpdate(true);
        setDocumentoSeleccionado(e);
        setActualiza('noactual');
    }

    const onSelectVigencia = (e) => {
        setVigenDocumento(true);
        //console.log("que llega aqui para llenar",e);
        setDocumentoSeleccionado(e);
    }

    const onCloseVigencia = () => {
        setVigenDocumento(false);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }



    const handleDeshabilitar = () => {
        eliminarEdadesBeneficiarios(idEliminar)
        setShowModalDelete(false);
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




    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Documentos</h4>
                    <p className={classes.cardCategoryWhite}>
                        En esta zona se consutan los documentos y programas a los que tiene asignados
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
                                    placeholder="Buscar"
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
                                < TableCell align="center" >Programa de Apoyo</TableCell >
                                < TableCell align="center">Vigencia</TableCell >
                                {/*< TableCell align="center"> Fecha Registro</TableCell >*/}
                                < TableCell colSpan={2} > Activo</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    documentosList.filter(row => row.dsdocumento ?
                                        row.dsdocumento.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : documentosList
                                ).map((row, i) => {
                                    console.log("page:" + page + " size:" + size)
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
                                                {/*
                                                <IconButton aria-label="create" onClick={() => onSelectVigencia(row)}>
                                                    <CreateIcon />
                                                </IconButton>*/}
                                            </TableCell>

                                            <TableCell >
                                                <Checkbox
                                                    disabled
                                                    checked={row.activo}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'Checkbox A' }}
                                                />
                                                {row.boactivo}
                                            </TableCell>

                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </TableCell>
                                            {/*
                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                                                    {(row.activo) ? <DeleteIcon /> : <RefreshIcon />}
                                                </IconButton>
                                            </TableCell>
                                            */}
                                        </TableRow >
                                    );
                                })
                            }
                        </TableBody >
                    </ Table>
                    < TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        labelRowsPerPage="Registros por página"
                        count={total}
                        rowsPerPage={size}
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

        </GridItem>
    )

}