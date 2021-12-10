import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import '../Formio/assets/index.scss';
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
    const { idPrograma, nombrePrograma } = props;
    const { programa, getByIDSinToken } = useContext(ProgramasContext);
    const { actualizarComplementoFurs, getComplementoFurs, registrarComplementoFurs, complementoList } = useContext(ComplementoFursContext);
    let ruta = '';
    let jsonGuardado = {};
    let jsonParseado = {};
    let idBusqueda = '';

    useEffect(() => {
        getByIDSinToken(idPrograma);
        getComplementoFurs(idPrograma, beneficiario.id)
        setActivar(false)
    }, []);

    if (complementoList.length > 0) {
        jsonParseado = JSON.parse(complementoList[0]?.jsComplemento);
        console.log("complementoList ----------- ", jsonParseado._id)
        idBusqueda = jsonParseado._id
    }else{
        jsonParseado = JSON.parse(complementoList?.jsComplemento);
        console.log("complementoList ----------- ", jsonParseado._id)
        idBusqueda = jsonParseado._id
    }

    if (programa !== null) {
        console.log("idBusqueda ----------- ", idBusqueda)
        if (complementoList.length === 0) {
            ruta = `${baseUrlFormio}${programa.dsnombreplantilla}`;
        } else {
            ruta = `${baseUrlFormio}${programa.dsnombreplantilla}/submission/${jsonParseado._id}`;
        }
        console.log("ruta", ruta);
    }

    const handleSubmit = (event) => {
        window.scrollTo(0, 0)
        if (complementoList.length === 0) {
            console.log("Aqui es donde vamos a mandar a guardar event-------", event);
            const jsonGuardado = JSON.stringify(event);
            let complementoFur = {
                id: '',
                idPrograma: idPrograma,
                idBeneficiario: beneficiario.id,
                jsComplemento: jsonGuardado
            }
            console.log("Esto es lo que mandamos guardar", complementoFur);
            registrarComplementoFurs(complementoFur);
        } else {
            console.log("Aqui es donde vamos a mandar a actualizar event-------", event);
            let complementoFur = {
                id: complementoList[0].id,
                idPrograma: idPrograma,
                idBeneficiario: beneficiario.id,
                jsComplemento: jsonGuardado
            }
            console.log("Esto es lo que mandamos actualizar", complementoFur);
            actualizarComplementoFurs(complementoFur);
        }
        setActivar(true)
    }

    return (
        <GridContainer>

            <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} justify="center">
                    <h4 className={classes.infoText}>
                        {nombrePrograma}
                    </h4>
                </GridItem>
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