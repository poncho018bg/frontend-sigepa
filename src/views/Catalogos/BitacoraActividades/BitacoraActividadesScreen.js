import React, { useContext, useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import moment from 'moment';
import 'moment/locale/es';

import SearchBar from "material-ui-search-bar";
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { ModalContext } from 'contexts/modalContex';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { BtActividadesContext } from 'contexts/catalogos/BtActividadesContext';
import { obtenerRolesAction } from 'actions/rolesKeycloakAction';
import { useDispatch, useSelector } from 'react-redux';
import { BitacoraActividades } from './BitacoraActividades';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(stylesArchivo);

export const BitacoraActividadesScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [searched, setSearched] = useState('');

    const { btActividadesList, getBtActividadesby } = useContext(BtActividadesContext);
    const { showModal, modalTitle, setShowModal, setModalTitle } = useContext(ModalContext);
    const { showModalDelete, setShowModalDelete } = useContext(ModalContextDelete);
    const { showModalUpdate, modalTitleUpdate, setShowModalUpdate, setModalTitleUpdate }
        = useContext(ModalContextUpdate);

    const [nombre, setNombre] = useState('');
    const [apellidopaterno, setApellidopaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [puesto, setPuesto] = useState('');
    const [rol, setRol] = useState('');
    const [fecha, setFecha] = useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const { roles } = useSelector(state => state.roles);


    useEffect(() => {
        getBtActividadesby("NULL", "NULL", "NULL", "NULL", "NULL", "NULL");
        const cargarRolesActivos = () => dispatch(obtenerRolesAction());
        cargarRolesActivos();

    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const onSelect = (e) => {
        setShowModalUpdate(true);
        setBitacoraActividadSeleccionada(e);
    }

    const addDialog = () => {
        setShowModal(true);
    }

    const deleteDialog = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }


    const handleDeshabilitar = () => {
        setShowModalDelete(false);
    }



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const buscarMovimientos = () => {
        console.log('rol', puesto.length)
        getBtActividadesby(nombre, apellidopaterno, apellidoMaterno, puesto, rol, fecha, "");
    }
    return (
        <GridItem xs={12} sm={12} md={12}>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}> Movimientos por Usuario </h4>
                    <p className={classes.cardCategoryWhite}>
                        Búsqueda de movimientos por Usuario
                    </p>
                    <CardActions>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
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
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <TextField
                                id="nombre"
                                label="Nombre"
                                variant="outlined"
                                name={nombre}
                                fullWidth
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="apellidopaterno"
                                label="Apellidos"
                                variant="outlined"
                                name={apellidopaterno}
                                fullWidth
                                value={apellidopaterno}
                                onChange={(e) => setApellidopaterno(e.target.value)}
                            />
                        </Grid>
                        
                        
                        <Grid item xs={2}>

                            <TextField
                                variant="outlined"
                                label="Selecciona un rol"
                                select
                                fullWidth
                                name="rol"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <MenuItem value="0">
                                    <em>{t('cmb.ninguno')}</em>
                                </MenuItem>
                                {
                                    roles.map(
                                        item => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={2}>
                        <TextField
                                id="fcvigenciainicio"
                                label="Desde"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={fecha}
                                name={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                InputProps={{
                                    inputProps: {
                                       
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" fullWidth onClick={buscarMovimientos}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell > Fecha de registro</TableCell >
                                < TableCell> Acción</TableCell >

                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    btActividadesList.filter(row => row.dsaccion ?
                                        row.dsaccion.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : btActividadesList
                                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {

                                    return (
                                        <BitacoraActividades
                                            key={row.id}
                                            bitacoraActividades={row} />
                                    );
                                })
                            }
                        </TableBody >
                    </ Table>
                    < TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        labelRowsPerPage={t('dgv.registrospaginas')}
                        count={btActividadesList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardBody>
            </Card>



        </GridItem>

    )
}
