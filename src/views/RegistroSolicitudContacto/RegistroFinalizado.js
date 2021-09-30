import React, { useContext, useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
const useStyles = makeStyles(stylesArchivo);

export const RegistroFinalizado = () => {
    const classes = useStyles();
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Registro Exitoso</h4>
                </CardHeader>
                <CardBody>
                    AQUI VA EL RELLENO CREMOSO
                </CardBody>
            </Card>
        </GridItem>
    )
}