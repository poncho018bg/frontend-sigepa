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

const ValidarCurp = ({ datosCorrectos, children }) => {
    const classes = useStyles();
    console.log("ValidarPrograma ===>", datosCorrectos)
    if (!datosCorrectos)
        return (
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Registro de Programa de Apoyo</h4>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="body1" color="text.secondary">
                            La CURP es incorrecta, favor de verificar
                        </Typography>
                    </CardBody>
                </Card>
            </GridItem>
        );
    return children;
}

export default ValidarCurp;