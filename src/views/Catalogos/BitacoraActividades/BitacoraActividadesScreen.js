import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { MenuItem, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
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
import { ModalContext } from 'contexts/modalContex';
import { Modal } from 'commons/Modal';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { ModalUpdate } from 'commons/ModalUpdate';
import { BtActividadesContext } from 'contexts/catalogos/BtActividadesContext';
import { obtenerRolesAction } from 'actions/rolesKeycloakAction';
//import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(stylesArchivo);

export const BitacoraActividadesScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    //const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [searched, setSearched] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [bitacoraActividadSeleccionada, setBitacoraActividadSeleccionada] = useState();

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
        //eliminarPersona(idEliminar)
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
                                label="Apellido Paterno"
                                variant="outlined"
                                name={apellidopaterno}
                                fullWidth
                                value={apellidopaterno}
                                onChange={(e) => setApellidopaterno(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="apellidoMaterno"
                                label="Apellido Materno"
                                variant="outlined"
                                name={apellidoMaterno}
                                fullWidth
                                value={apellidoMaterno}
                                onChange={(e) => setApellidoMaterno(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="puesto"
                                label="Puesto"
                                variant="outlined"
                                name={puesto}
                                fullWidth
                                value={puesto}
                                onChange={(e) => setPuesto(e.target.value)}
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
                                    <em>Ninguno</em>
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
                            {/* <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> */}
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
                                < TableCell > fcfecharegistro</TableCell >
                                < TableCell> dsaccion</TableCell >

                            </TableRow >
                        </TableHead >
                        < TableBody >
                            {
                                (searched ?
                                    btActividadesList.filter(row => row.dsaccion ?
                                        row.dsaccion.toLowerCase().includes(searched.toLowerCase()) : null)
                                    : btActividadesList
                                ).map(row => {
                                    console.log("page:" + page + " size:" + size)
                                    return (
                                        < TableRow key={row.id}>
                                            <TableCell >{moment(row.fcfecharegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                                            <TableCell>{row.dsaccion}</TableCell >
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



        </GridItem>

    )

}