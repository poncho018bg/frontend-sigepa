import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../Formio/index.scss';
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
//import { Form } from '@formio/react/lib/components';
import Form from '../Formio/components/Form';
import { ComplementoFursContext } from "contexts/complementoFurContext";
const useStyles = makeStyles(stylesArchivo)

export const RegistroIngresos = (props) => {
    const classes = useStyles();
    const { beneficiario } = props;
    const { idPrograma } = props;
    const { getComplementoFurs, registrarComplementoFurs, actualizarComplementoFurs } = useContext(ComplementoFursContext);

    const handleSubmit = (event) => {
        console.log("Aqui es donde vamos a mandar a guardar", event);
        let complementoFur = {
            programas: idPrograma,
            beneficiarios: beneficiario,
            jsComplemento: event.target
        }
        console.log("Esto es lo que mandamos guardar", complementoFur );
        //registrarComplementoFurs(complementoFur);
        
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
                            <Form src="http://61836f5f556049bc543535a3.localhost:3001/testform" onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}