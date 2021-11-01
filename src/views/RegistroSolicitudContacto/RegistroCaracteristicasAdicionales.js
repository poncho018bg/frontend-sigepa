import React, { useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../Formio/index.scss';
//import { Form } from '@formio/react/lib/components';
import  Form from '../Formio/components/Form';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';

const useStyles = makeStyles(stylesArchivo);

export const RegistroCaracteristicasAdicionales = () => {
    const classes = useStyles();

    const handleSubmit = (event) => {
        console.log("Aqui es donde vamos a mandar a guardar", event);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Características adicionales de la solicitante</h4>
                    </CardHeader>
                    <CardBody>
                        <div className="container" id="main">
                            <Form src="http://617c77de34c5aaccebf28e47.localhost:3001/caracteristicas" onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}