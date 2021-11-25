import React, { useContext, useEffect, useState } from 'react';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Grid, FormHelperText, TextField} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import moment from 'moment';
import 'moment/locale/es';

import SearchIcon from '@material-ui/icons/Search';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { ExpedienteContext } from 'contexts/expedienteContext';

import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);


export const ConsultaExpediente = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { getExpedienteParametros, solicitudParametrosExpediente } = useContext(ExpedienteContext);
    const [showDialogError, setShowDialogError] = useState(false);

    const [nombre, setNombre] = useState("")
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

        if (nombre === '' && curp === '') {
            errors.nombre = "Debe ingresar un nombre!";
            errors.curp = "Debe ingresar una Curp!";
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
                                onChange={event => {
                                    const { value } = event.target;
                                    setNombre(value);
                                }}
                            />

                            {errors.nombre && <FormHelperText error={errors.nombre}>{errors.nombre}</FormHelperText>}
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
                            {errors.curp && <FormHelperText error={errors.curp}>{errors.curp}</FormHelperText>}
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: 'right', float: 'right' }}>
                            <Button variant="contained" color="primary" fullWidth onClick={validarDatos}>
                                <SearchIcon />
                                Buscar Expediente
                            </Button>
                        </Grid>
                    </Grid>
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