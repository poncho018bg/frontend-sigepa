import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import { TextField } from "@material-ui/core";

const styles = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    ...customSelectStyle,
};

const useStyles = makeStyles(styles);
export const RegistroDireccion = () => {
    const classes = useStyles();
    const [simpleSelect, setsimpleSelect] = React.useState("");

    /*
    React.useImperativeHandle(ref, () => ({
        isValidated: () => {
            return isValidated();
        },
        sendState: () => {
            return sendState();
        },
        state: {
            simpleSelect,
        },
    }));
    const sendState = () => {
        return {
            simpleSelect,
        };
    };
    */
    const isValidated = () => {
        return true;
    };
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Dirección</h4>
                </CardHeader>
                <CardBody>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            <h4 className={classes.infoText}></h4>
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="calle"
                                label="Calle"
                                variant="outlined"
                                name="calle"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="numeroExterior"
                                label="Número Exterior"
                                variant="outlined"
                                name="numeroExterior"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="numeroInterior"
                                label="Número Interior"
                                variant="outlined"
                                name="numeroInterior"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="colonia"
                                label="Colonia"
                                variant="outlined"
                                name="colonia"
                                fullWidth
                            />
                        </GridItem>


                        <GridItem xs={12} sm={5}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="entreCalle"
                                label="Entre Calle"
                                variant="outlined"
                                name="entreCalle"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={5}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="yCalle"
                                label="Y calle"
                                variant="outlined"
                                name="yCalle"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="entidadFederativa"
                                label="Entidad Federativa"
                                variant="outlined"
                                name="entidadFederativa"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="codigoPostal"
                                label="Código Postal"
                                variant="outlined"
                                name="codigoPostal"
                                fullWidth
                            />
                        </GridItem>

                        <GridItem xs={12} sm={7}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="municipio"
                                label="Municipio"
                                variant="outlined"
                                name="municipio"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="ctLocalidad"
                                label="CT Localidad"
                                variant="outlined"
                                name="ctLocalidad"
                                fullWidth
                            />
                        </GridItem>


                        <GridItem xs={12} sm={3}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="nombreMunicipio"
                                label="Nombre del Municipio"
                                variant="outlined"
                                name="nombreMunicipio"
                                fullWidth
                            />
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="nombreLocalidad"
                                label="Nombre Localidad"
                                variant="outlined"
                                name="nombreLocalidad"
                                fullWidth
                            />
                        </GridItem>


                        <GridItem xs={12} sm={10}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="otraReferencia"
                                label="Otra referencia"
                                variant="outlined"
                                name="otraReferencia"
                                fullWidth
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        </GridItem>
    );
}