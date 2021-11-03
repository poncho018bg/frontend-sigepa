import React, { useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import './index.scss';
import  Form from '../Formio/components/Form';
export const RegistroPrueba = () => {

    const handleSubmit = (event) => {
        console.log("Aqui es donde vamos a mandar a guardar", event);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
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