import React from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
const useStyles = makeStyles(styles);
const styles = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    inputAdornmentIcon: {
        color: "#555",
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px",
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch,
};

const ValidarProgramaTipoApoyo = ({ programa, setActivar, children }) => {
    const classes = useStyles();
    console.log("Validar Programa Tipo Apoyo", programa)
    if (!programa.existeTipoApoyo) {
        setActivar(false);
        return (
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Registro de Programa de Apoyo</h4>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="body1" color="text.secondary">
                            El programa no tiene un tipo de apoyo registrado, no puedes continuar con el registro
                        </Typography>
                    </CardBody>
                </Card>
            </GridItem>
        );
    } else {
        console.log("TRUE");
        setActivar(true);
        return children;
    }
}

export default ValidarProgramaTipoApoyo;