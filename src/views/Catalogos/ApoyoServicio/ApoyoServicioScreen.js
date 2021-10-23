import React, { useContext, useEffect, useState } from 'react';
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
import BlockIcon from '@material-ui/icons/Block';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

import { ModalUpdate } from 'commons/ModalUpdate';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';
import { ApoyoServicioFormEdit } from './ApoyoServicioFormEdit';
import { ApoyoServicioForm } from './ApoyoServicioForm';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const ApoyoServicioScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    
    const [searched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [ApoyoServicioSeleccionada, setApoyoServicioSeleccionada] = useState();

    const { apoyoservicioList, getApoyoServicio, eliminarApoyoServicio, 
        size, page, total,  changePage,changePageSizes,getApoyoServicioByParametros } = useContext(ApoyoServicioContext);
    const { setShowModal } = useContext(ModalContext);
    const {  setShowModalDelete } = useContext(ModalContextDelete);
    const { showModalUpdate,  setShowModalUpdate }
        = useContext(ModalContextUpdate);
    const [error] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [ setOpenDialog] = useState(false);

    useEffect(() => {
        getApoyoServicio();

    }, []);

    useEffect(() => {
        getApoyoServicio();

    }, [size,page]);

    useEffect(() => {
        getApoyoServicio();

    }, [showModalUpdate]);

    const onSelect = (e) => {
        setShowModalUpdate(true);
        setApoyoServicioSeleccionada(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }


    const handleDeshabilitar = () => {
        eliminarApoyoServicio(idEliminar)
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



    const buscaPorParametros = (search) => {
        if(search === ''){
            getApoyoServicio();
        }else{
            getApoyoServicioByParametros(search)
        }
       
    }

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('pnl.apoyoservicio')}</h4>
                    <p className={classes.cardCategoryWhite}>

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
                            < TableRow key="898as" >
                                < TableCell align="center"> {t('dgv.estatus')} </TableCell >
                                < TableCell align="center"> {t('dgv.tiposervicio')} </TableCell >
                                < TableCell colSpan={2} align="center"> {t('dgv.acciones')}</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                            apoyoservicioList.map(row => {
                                   
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">
                                                {row.activo === true ? 'Activo' : 'Inactivo'}
                                            </TableCell>
                                            <TableCell align="center">{row.dsservicio}</TableCell >
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
                <ApoyoServicioForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <ApoyoServicioFormEdit ApoyoServicioSeleccionada={ApoyoServicioSeleccionada} />
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
