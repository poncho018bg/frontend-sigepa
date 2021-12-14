import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Grid, FormHelperText, TextField } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import moment from 'moment';
import 'moment/locale/es';
import { useHistory } from "react-router";

import SearchIcon from '@material-ui/icons/Search';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { ExpedienteContext } from 'contexts/expedienteContext';


import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';

import BeneficiariosExpediente from './BeneficiariosExpediente';

import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);


export const ConsultaExpediente = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    let history = useHistory();
    const { getExpedienteParametros, solicitudParametrosExpediente, beneficiariosList } = useContext(ExpedienteContext);
    const [showDialogError, setShowDialogError] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellidoPat, setApellidoPat] = useState("");
    const [apellidoMat, setApellidoMat] = useState("");
    const [curp, setCurp] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors({});
    }, []);

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    const validarDatos = () => {
        setErrors({});
        const errors = {};


        if (nombre === '' && apellidoPat === '') {
            errors.nombre = "Debe ingresar un nombre!";
            errors.apellidoPat = "Debes de ingresar un apellido paterno";
        }

        if (!isObjEmpty(errors)) {
            setErrors(errors);
            return;
        }
        buscarExpediente()
        setErrors({});
    }


    const buscarExpediente = () => {

        let expedienteFilter = {
            'nombre': nombre === '' ? 'NULL' : nombre,
            'apellidoPaterno': apellidoPat === '' ? 'NULL' : apellidoPat,
            'apellidoMaterno': apellidoMat === '' ? 'NULL' : apellidoMat,
            'curp': curp === '' ? 'NULL' : curp,
        }
        console.log(expedienteFilter)
        getExpedienteParametros(expedienteFilter);

        if (solicitudParametrosExpediente === null) {
            setShowDialogError(true)
        }
    }

    const handleClose = () => {
        setShowDialogError(false);
    }


    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Búsqueda de Expediente</h4>
                    <CardActions>

                    </CardActions>
                </CardHeader>
                <CardBody>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="nombre"
                                label="Nombre"
                                variant="outlined"
                                name="nombre"
                                fullWidth
                                value={nombre}
                                onChange={event => {
                                    const { value } = event.target;
                                    setNombre(value);
                                }}
                                inputProps={{ maxlength: 50, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                            />

                            {errors.nombre && <FormHelperText error={errors.nombre}>{errors.nombre}</FormHelperText>}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="apellidoPat"
                                label="Apellido Paterno"
                                variant="outlined"
                                name="apellidoPat"
                                fullWidth
                                value={apellidoPat}
                                onChange={event => {
                                    const { value } = event.target;
                                    setApellidoPat(value);
                                }}
                                inputProps={{ maxlength: 50, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                            />

                            {errors.apellidoPat && <FormHelperText error={errors.apellidoPat}>{errors.apellidoPat}</FormHelperText>}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="apellidoMat"
                                label="Apellido Materno"
                                variant="outlined"
                                name="apellidoMat"
                                fullWidth
                                value={apellidoMat}
                                onChange={event => {
                                    const { value } = event.target;
                                    setApellidoMat(value);
                                }}
                                inputProps={{ maxlength: 50, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="curp"
                                label="CURP"
                                variant="outlined"
                                name="curp"
                                fullWidth
                                value={curp}
                                onClick={event => {
                                    let testCurp = /^[a-zA-Z0-9_.-\sñÑ]*$/;
                                    if (testCurp.test(event.target.value)) {
                                        const { value } = event.target;
                                        setCurp(value);
                                    }
                                }}
                                onChange={event => {
                                    let testCurp = /^[a-zA-Z0-9_.-\sñÑ]*$/;
                                    if (testCurp.test(event.target.value)) {
                                        const { value } = event.target;
                                        setCurp(value);
                                    }
                                }}
                                inputProps={{ maxlength: 18, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right', float: 'right' }}>
                            <Button variant="contained" color="primary" onClick={validarDatos}>
                                <SearchIcon />
                                Buscar Expediente
                            </Button>
                        </Grid>
                    </Grid>
                </CardBody>
            </Card>

            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Resultados de la búsqueda</h4>
                    <CardActions>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    < Table stickyHeader aria-label="sticky table" >
                        < TableHead >
                            < TableRow key="898as" >
                                < TableCell align="center"> Nombre</TableCell >
                                < TableCell align="center"> Apellido Paterno</TableCell >
                                < TableCell align="center"> Apellido Materno</TableCell >
                                < TableCell align="center"> CURP</TableCell >
                                < TableCell align="center"> Ver Datos</TableCell >
                            </TableRow >
                        </TableHead>
                        < TableBody >
                            {beneficiariosList.length > 0 ?
                                beneficiariosList.map((b, i) => {
                                    return (
                                        <BeneficiariosExpediente i={i} b={b} />
                                    )
                                })
                                : <h4>No se encontraron datos</h4>
                            }
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>

            <Dialog
                classes={{ paper: classes.paper }}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={showDialogError}
            >
                <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        No se han encontrado registros con los datos proporcionados!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </GridItem>
    )
}