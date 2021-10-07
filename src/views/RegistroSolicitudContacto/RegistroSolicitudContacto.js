import React, { useContext, useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'

import Box from '@material-ui/core/Box';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
const useStyles = makeStyles(stylesArchivo);

export const RegistroSolicitudContacto = () => {
    const classes = useStyles();
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Información de contacto</h4>
                </CardHeader>
                <CardBody>
                    <CardBody>
                        <TextField
                            variant="outlined"
                            id="dscelular"
                            label="Celular"
                            variant="outlined"
                            name="dscelular"
                            fullWidth
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            variant="outlined"
                            id="dstelefono"
                            label="Teléfono de casa"
                            variant="outlined"
                            name="dstelefono"
                            fullWidth
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dstelefonocontacto"
                            label="Teléfono de contacto"
                            variant="outlined"
                            name="dstelefonocontacto"
                            fullWidth
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dsemail"
                            label="Correo Electrónico"
                            variant="outlined"
                            name="dsemail"
                            fullWidth
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dsobservaciones"
                            label="Observaciones"
                            variant="outlined"
                            name="dsobservaciones"
                            fullWidth
                        />
                    </CardBody>
                </CardBody>
            </Card>
        </GridItem>
    )
}
