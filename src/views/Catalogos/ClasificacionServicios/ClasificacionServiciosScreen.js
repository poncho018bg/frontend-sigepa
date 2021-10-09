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
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

//contexts
import { ClasificacionServiciosContext } from 'contexts/catalogos/clasificacionServiciosContext';
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { useTranslation } from 'react-i18next';

import { ClasificacionServiciosForm } from './ClasificacionServiciosForm';
import { ClasificacionServiciosEdit } from './ClasificacionServiciosEdit';

import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { Mensaje } from 'components/Personalizados/Mensaje';

const useStyles = makeStyles(stylesArchivo);

export const ClasificacionServiciosScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [clasificacionServiciosSeleccionado, setClasificacionServiciosSeleccionado] = useState();
    const { getClasificacionServicios, eliminarClasificacionServicios, clasificacionServiciosList, size, page, total, changePageSize, changePage } = useContext(ClasificacionServiciosContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);

    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        getClasificacionServicios();
        // eslint-disable-next-line
        console.log("tipo de apoyo", clasificacionServiciosList);
    }, []);


    const onSelect = (e) => {
        setShowModalUpdate(true);
        setClasificacionServiciosSeleccionado(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }


    const handleDeshabilitar = () => {
        eliminarClasificacionServicios(idEliminar)
        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`El registro ha sido inhabilitado exitosamente`);
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
                    <h4 className={classes.cardTitleWhite}>Clasificacion de los Servicios</h4>
                    <p className={classes.cardCategoryWhite}>
                        En esta sección podran clasificar los servicios
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
                                < TableCell > Estatus</TableCell >
                                < TableCell> Clasificacion de los servicios</TableCell >
                                <TableCell> Abreviatura</TableCell>
                                < TableCell> Fecha Registro</TableCell >
                                < TableCell colSpan={2} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    clasificacionServiciosList.filter(row => row.dsclasificacionservicio ?
                                        row.dsclasificacionservicio.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : clasificacionServiciosList
                                ).map((row, i) => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={i}>
                                            <TableCell>
                                                
                                                {row.activo ? 'Activo':'Inactivo'}
                                            </TableCell>
                                            <TableCell>{row.dsclasificacionservicio}</TableCell>
                                            <TableCell>{row.dsabreviatura}</TableCell>
                                            <TableCell >{moment(row.fcfechacreacion).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
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
                <ClasificacionServiciosForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <ClasificacionServiciosEdit clasificacionServiciosSeleccionado={clasificacionServiciosSeleccionado} />
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