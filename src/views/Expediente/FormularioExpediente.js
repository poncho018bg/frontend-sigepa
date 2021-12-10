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

export const FormularioExpediente = (props) => {
    console.log("props FormularioExpediente --->", props);
    const classes = useStyles();
    const { idBeneficiario, idProgramaExpediente } = props;
    const [activar, setActivar] = useState("");
    const { programa, getByID } = useContext(ProgramasContext);
    const { actualizarComplementoFurs, getComplementoFurs, registrarComplementoFurs, complementoList } = useContext(ComplementoFursContext);
    let ruta = '';

    useEffect(() => {
        getByID(idProgramaExpediente);
        getComplementoFurs(idProgramaExpediente, idBeneficiario)
        setActivar(false)
    }, []);

    const jsonGuardado = JSON.stringify(complementoList[0]);
    const jsonParseado = JSON.parse(jsonGuardado);

    console.log("complementoFursList +++++++++++++++", complementoList);
    if (programa !== null) {
        if (complementoList.length === 0) {
            ruta = `${baseUrlFormio}${programa.dsnombreplantilla}`;
        } else {
            ruta = `${baseUrlFormio}${programa.dsnombreplantilla}/submission/${jsonParseado.jsComplemento._id}`;
        }
        console.log("ruta", ruta);
    }

    const handleSubmit = (event) => {
        window.scrollTo(0, 0)
        if (complementoFursList.length === 0) {
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
                id: complementoFursList[0].id,
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