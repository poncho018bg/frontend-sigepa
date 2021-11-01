import React, { useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../Formio/index.scss';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
//import { Form } from '@formio/react/lib/components';
import  Form from '../Formio/components/Form';

const useStyles = makeStyles(stylesArchivo);

export const RegistroIngresos = () => {
    const classes = useStyles();

    const handleSubmit = (event) => {
        console.log("Aqui es donde vamos a mandar a guardar", event);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Identificación de ingresos económicos de la mujer</h4>
                    </CardHeader>
                    <CardBody>
                        <div className="container" id="main">
                        <Form src="http://617c5f9034c5aaccebf28d64.localhost:3001/regingresos" onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}