import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

//contexts
import { FirmasContext } from 'contexts/catalogos/firmasContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';


import { FirmasForm } from './FirmasForm';
import { FirmasEdit } from './FirmasEdit';
import BlockIcon from '@material-ui/icons/Block';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { useTranslation } from 'react-i18next';
import { Mensaje } from 'components/Personalizados/Mensaje';
const useStyles = makeStyles(stylesArchivo);

export const FirmasScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [firmasSeleccionado, setfirmasSeleccionado] = useState();
    const { getFirmas, eliminarFirmas, firmasList, size, page, total,  changePageSizes, changePage,getFirmasByParametros } = useContext(FirmasContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const [error] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const { setShowModalUpdate }
        = useContext(ModalContextUpdate);

    useEffect(() => {
        getFirmas();

    }, []);

    useEffect(() => {
        getFirmas();

    }, [size, page]);

    const onSelect = (e) => {
        setShowModalUpdate(true);
        setfirmasSeleccionado(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }


    const handleDeshabilitar = () => {       
        eliminarFirmas(idEliminar)
        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
    }
    const handleChangePage = (event, newPage) => {
        changePage(newPage)
    };

    const handleChangeRowsPerPage = event => {
        changePageSizes(+event.target.value);
        changePage(0)

    };

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }

    const buscaPorParametros = (search) => {
        if(search === ''){
            getFirmas();
        }else{
            getFirmasByParametros(search)
        }
       
    }

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('pnl.catalogofirmas')}</h4>
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
                                    onChange={(searchVal) => buscaPorParametros(searchVal)}
                                    onCancelSearch={() => buscaPorParametros('')}
                                />
                            </Grid>
                        </Grid>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="ta1" >
                                < TableCell align="center" > {t('dgv.estatus')}</TableCell >
                                < TableCell align="center" >{t('dgv.nombrequienautoriza')}</TableCell >
                                < TableCell align="center">{t('dgv.puesto')}</TableCell >
                                < TableCell align="center">{t('dgv.fechaalta')}</TableCell >
                                < TableCell align="center">{t('dgv.comentarios')}</TableCell >

                                < TableCell align="center" colSpan={2}> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                firmasList.map(row => {                                   
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">
                                                {row.activo === true ? 'Activo' : 'Inactivo'}
                                            </TableCell>

                                            <TableCell align="center">{row.dsautoriza}</TableCell >
                                            <TableCell align="center" >{row.dspuesto}</TableCell>
                                            <TableCell align="center">{moment(row.fcfechacreacion).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                            <TableCell align="center">{row.dscomentario}</TableCell>

                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => deleteDialog(row)}>
                                                <BlockIcon />
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
                        count={total}
                        rowsPerPage={size}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>
            <Modal>
                <FirmasForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <FirmasEdit firmasSeleccionado={firmasSeleccionado} />
            </ModalUpdate>

            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </GridItem>

    )

}