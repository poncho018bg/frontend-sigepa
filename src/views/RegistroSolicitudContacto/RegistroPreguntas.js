import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../Formio/index.scss';
//import { Form } from '@formio/react/lib/components';
import Form from '../Formio/components/Form';
import { ComplementoFursContext } from "contexts/complementoFurContext";

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
//Ruta para mandar a llamar de forma dinamica el formulario a agregar
const baseUrlFormio = process.env.REACT_APP_API_FORMIO_URL;

const useStyles = makeStyles(stylesArchivo);

export const RegistroPreguntas = (props) => {
    const classes = useStyles();
    const { beneficiario, setActivar } = props;
    const { idPrograma } = props;
    const { programa, getByID } = useContext(ProgramasContext);
    const { getComplementoFurs, registrarComplementoFurs, actualizarComplementoFurs } = useContext(ComplementoFursContext);
    let ruta = '';
    useEffect(() => {
        getByID(idPrograma);
        setActivar(false)
    }, []);

    if (programa !== null) {
        ruta = `${baseUrlFormio}${programa.dsnombreplantilla}`;
        console.log("ruta", ruta);
    }

    const handleSubmit = (event) => {
        console.log("Aqui es donde vamos a mandar a guardar event-------", event);
        let complementoFur = {
            programas: idPrograma,
            beneficiarios: beneficiario.id,
            jsComplemento: event
        }
        console.log("Esto es lo que mandamos guardar", complementoFur);
        //registrarComplementoFurs(complementoFur);
        setActivar(true)
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
                            <Form src={ruta} onSubmit={handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}