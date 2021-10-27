import React from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../Formio/index.scss';
import { Form } from '@formio/react';
import { ComplementoFursContext } from 'contexts/complementoFurContext';

export const RegistroPreguntas = () => {

    // const classes = useStyles();
    //const { getComplementoFurs, registrarComplementoFurs, actualizarComplementoFurs } = useContext(ComplementoFursContext);


    const handleSubmit = (event) => {

        //registrarComplementoFurs(event.target) 
        console.log("Aqui es donde vamos a mandar a guardar", event.target);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <div className="container" id="main">
                            <Form form={"http://localhost:3001/#/form/61772324c57ec723584e5910/preguntaSalario"} onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}