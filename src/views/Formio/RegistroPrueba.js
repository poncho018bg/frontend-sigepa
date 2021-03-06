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

export const RegistroPrueba = () => {
    let idBeneficiario = 'd32f0c96-40a9-43f2-95ca-fee1cc1bb1bd';
    let idProgramaExpediente = 'd0d43c97-ba2e-4824-88c9-1f630b82d006';

    const classes = useStyles();
    const [activar, setActivar] = useState("");
    const { programa, getByID } = useContext(ProgramasContext);
    const { actualizarComplementoFurs, getComplementoFurs, registrarComplementoFurs, complementoList } = useContext(ComplementoFursContext);
    let ruta = '';
    let jsonGuardado = {};
    let jsonParseado = {};
    let idBusqueda = '';

    useEffect(() => {
        getByID(idProgramaExpediente);
        getComplementoFurs(idProgramaExpediente, idBeneficiario)
        setActivar(false)
    }, []);


    if (complementoList.length > 0) {
        jsonParseado = JSON.parse(complementoList[0]?.jsComplemento);
        console.log("idBusquedaasdfasdf ----------- ", jsonParseado._id)
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

    console.log("ruta", ruta);

    const handleSubmit = (event) => {
        window.scrollTo(0, 0)
        if (complementoList.length === 0) {
            console.log("Aqui es donde vamos a mandar a guardar event-------", event);
            const jsonGuardado = JSON.stringify(event);
            let complementoFur = {
                id: '',
                idPrograma: idProgramaExpediente,
                idBeneficiario: idBeneficiario,
                jsComplemento: jsonGuardado
            }
            console.log("Esto es lo que mandamos guardar", complementoFur);
            registrarComplementoFurs(complementoFur);
        } else {
            console.log("Aqui es donde vamos a mandar a actualizar event-------", event);
            let complementoFur = {
                id: complementoList[0].id,
                idPrograma: idProgramaExpediente,
                idBeneficiario: idBeneficiario,
                jsComplemento: jsonGuardado
            }
            console.log("Esto es lo que mandamos actualizar", complementoFur);
            actualizarComplementoFurs(complementoFur);
        }
    }

    return (
        <GridContainer> 
            {console.log("ruta 2----", {ruta})}           
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Caracter??sticas adicionales de la solicitante</h4>
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