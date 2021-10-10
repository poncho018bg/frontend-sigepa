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
import { FirmaPrograma } from './FirmaPrograma';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const FirmasScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar] = useState(0);
    const [firmasSeleccionado, setfirmasSeleccionado] = useState();
    const { getFirmas, eliminarFirmas, firmasList, size, page, total, changePageSize, changePage } = useContext(FirmasContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);

    const { setShowModalUpdate }
        = useContext(ModalContextUpdate);

    useEffect(() => {
        getFirmas();
        // eslint-disable-next-line
        console.log("tipo de apoyo", firmasList);
    }, []);

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
    }
    const handleChangePage = (event, newPage) => {
        changePage(newPage)
    };

    const handleChangeRowsPerPage = event => {
        changePageSize(+event.target.value);
        changePage(0)
    };

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
                                < TableCell >{t('dgv.nombrequienautoriza')}</TableCell >
                                < TableCell>{t('dgv.puesto')}</TableCell >
                                < TableCell>{t('dgv.fechaalta')}</TableCell >
                                < TableCell>{t('dgv.comentarios')}</TableCell >
                                < TableCell colSpan={2}> {t('dgv.estatus')}</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    firmasList.filter(row => row.dsautoriza ?
                                        row.dsautoriza.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : firmasList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>


                                            <TableCell>{row.dsautoriza}</TableCell >
                                            <TableCell >{row.dspuesto}</TableCell>
                                            <TableCell >{moment(row.fcfechacreacion).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                            <TableCell >{row.dscomentario}</TableCell>
                                            <TableCell>
                                                {row.activo === true ? 'Activo' : 'Inactivo'}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="create" onClick={() => onSelect(row)}>
                                                    <CreateIcon />
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
        </GridItem>

    )

}