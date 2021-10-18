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
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { ContinuidadActividadesForm } from './ContinuidadActividadesForm';
import { ContinuidadActividadesEdit } from './ContinuidadActividadesEdit';
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const ContinuidadActividadesScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [continuidadActividadesSeleccionada, setContinuidadActividadesSeleccionada] = useState();

    const { actividadescontinuarList, getActividadesContinuar, eliminarActividadesContinuar,
         actualizarActividadesContinuar, size, page, total, changePageSize, changePage,changePageSizes } = useContext(ActividadesContinuarContext);
    const { setShowModal } = useContext(ModalContext);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const { setShowModalUpdate } = useContext(ModalContextUpdate);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        getActividadesContinuar();
    }, []);

    useEffect(() => {
        getActividadesContinuar();
    }, [size,page]);




    const onSelect = (e) => {
        setShowModalUpdate(true);
        setContinuidadActividadesSeleccionada(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e);
    }

    const handleDeshabilitar = () => {
        eliminarActividadesContinuar(idEliminar)
        setShowModalDelete(false);
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
    }

    const handleChangeCheck = (event) => {
        console.log("funciona re bien espero ---->", event.target);
        console.log("funciona re bien espero ---->",
            event.target.checked);
        console.log("funciona re bien espero ---->", event.target.name);
        const activo = event.target.checked;
        const lista = actividadescontinuarList.map((r) => {
            if (r.id === event.target.name) {
                console.log("antiguo r", r)
                const nuevaR = { ...r, activo };
                console.log("nuevo r", nuevaR);
                actualizarActividadesContinuar(nuevaR);
                return { ...r, activo };
            }
            return r;
        });
        console.log("actividades ---> ", lista);
    }

    const handleChangePage = (event, newPage) => {        
        changePage(newPage)       
    };

    const handleChangeRowsPerPage = event => {              
        changePageSizes(+event.target.value);
        changePage(0)       
        
    };

    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Actividades por realizar para continuar con el beneficio</h4>
                    <p className={classes.cardCategoryWhite}>
                        Pantalla que permite configurar las actividades por realizar para continuar con el beneficio
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
                            < TableRow key="898as" >
                                < TableCell align="center"> Estatus</TableCell >
                                < TableCell align="center"> Descripción de actividad </TableCell>
                                < TableCell colSpan={2} align="center"> Acciones</TableCell >
                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    actividadescontinuarList.filter(row => row.dsactividadcontinuidad ?
                                        row.dsactividadcontinuidad.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : actividadescontinuarList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell align="center">
                                            {row.activo === true ? 'Activo':'Inactivo'}
                                            </TableCell>
                                            <TableCell align="center">{row.dsactividadcontinuidad}</TableCell >
                                            
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
                        count={total}
                        rowsPerPage={size}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>
            <Modal>
                <ContinuidadActividadesForm />
            </Modal>
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
            <ModalUpdate>
                <ContinuidadActividadesEdit continuidadActividadesSeleccionada={continuidadActividadesSeleccionada} />
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