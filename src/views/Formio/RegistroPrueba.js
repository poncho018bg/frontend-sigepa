import React, { useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import './assets/index.scss';
import Form from '../Formio/components/Form';
import './i18n';
//import { i18n } from 'lingui-i18n';
//import './i18next';


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
                            <Form src="http://10.4.2.44:3001/becaeducativa" onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}