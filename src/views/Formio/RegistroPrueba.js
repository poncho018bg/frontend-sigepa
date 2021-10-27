import React, { useEffect } from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ReactDOM from 'react-dom';
import { FormBuilder} from '@formio/react/lib/components';
import './index.scss';
import { Alerts, AlertsProvider } from './modules/alerts';
//import Form from 'formiojs/Form';

//import { makeStyles } from "@material-ui/core/styles";
//import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";


//import './scripts/vendor-5d586f0fb0.js'
//import './styles/vendor-0ffa131bfe.css';
//import './scripts/vendor-ab5efb94f2.js';
//import './scripts/app-8cf39c05ae.js';

//const useStyles = makeStyles(styles);


export const RegistroPrueba = () => {

    // const classes = useStyles();

    const handleSubmit = (event) => {
        console.log("Aqui es donde vamos a mandar a guardar", event);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <div className="container" id="main">
                            <FormBuilder form={{display: 'form'}} onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}