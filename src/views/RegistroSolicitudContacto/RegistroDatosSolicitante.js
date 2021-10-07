import React, { useEffect, useState, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import axios from "axios";
import { TextField, MenuItem } from "@material-ui/core";


//
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";

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

const useStyles = makeStyles(styles);
export const RegistroDatosSolicitante = ({ curpR, llenarDatos }) => {
    console.log('aqui');
    console.log(curp);
    //console.log(props.allStates.about);
    const classes = useStyles();
    const [simpleSelect, setsimpleSelect] = React.useState("");
    const [design, setdesign] = React.useState(false);
    const [code, setcode] = React.useState(false);
    const [develop, setdevelop] = React.useState(false);
    const [nombre, setNombre] = useState("")
    const [curp, setCurp] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setapellidoMaterno] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimientoAxu, setFechaNacimientoAxu] = useState("");
    const [edad, setEdad] = useState("");

    const { getGeneros, generosList,
        estudiosList, getEstudios, 
        estadoCivilList, getEstadoCivil,
        getIdentificaciones, identificacionesList} = useContext(RegistroSolicitudContext);

    useEffect(() => {
        axios.get(`http://localhost:9080/v1/curp/consultaCurp/${curpR}`)
            .then(response => {
                console.log(response);
                setNombre(response.data.response[0].nombre);
                setCurp(response.data.response[0].curp);
                setApellidoPaterno(response.data.response[0].apellidoPaterno);
                setapellidoMaterno(response.data.response[0].apellidoMaterno);
                setGenero(response.data.response[0].sexo)
                setFechaNacimientoAxu(response.data.response[0].fechaNacimientoAxu);
                setEdad(response.data.response[0].edad);
            })
        getGeneros();
        getEstudios();
        getEstadoCivil();
        getIdentificaciones();
    }, [curpR]);

    const isValidated = () => {
        return true;
    };

    const llenado = () => {
        console.log("entro al momento de cargar", nombre, apellidoPaterno, apellidoMaterno);
        llenarDatos(nombre, apellidoPaterno, apellidoMaterno);
    }
    return (
        <div>
            <h4 className={classes.infoText}></h4>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Datos del Solicitante</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12} lg={10}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="curp"
                                            label="Curp"
                                            variant="outlined"
                                            name="curp"
                                            fullWidth
                                            value={curp}
                                            onChange={llenado()}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="apellidoPaterno"
                                            label="Apellido Paterno"
                                            variant="outlined"
                                            nombre="nombre"
                                            fullWidth
                                            value={apellidoPaterno}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="apellidoMaterno"
                                            label="Apellido Materno"
                                            variant="outlined"
                                            nombre="apellidoMaterno"
                                            fullWidth
                                            value={apellidoMaterno}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="nombre"
                                            label="Nombre"
                                            variant="outlined"
                                            nombre="nombre"
                                            fullWidth
                                            value={nombre}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        {/*
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="genero"
                                            label="Genero"
                                            variant="outlined"
                                            nombre="genero"
                                            fullWidth
                                            value={genero}
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {generosList.map((gen, i) => {
                                                <MenuItem
                                                    key={i}
                                                    value={gen.id}>
                                                    {gen.dsgenero}
                                                </MenuItem>

                                            })}
                                        </TextField>
                                        */}

                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="genero"
                                            label="Genero"
                                            variant="outlined"
                                            nombre="genero"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {
                                                generosList.map(
                                                    (g, i) => (
                                                        <MenuItem
                                                            key={i}
                                                            value={g.id}>
                                                            {g.dsgenero}
                                                        </MenuItem>
                                                    )
                                                )
                                            }
                                        </TextField>
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="fechaNacimientoAxu"
                                            label="Fecha Nacimiento"
                                            variant="outlined"
                                            nombre="fechaNacimientoAxu"
                                            fullWidth
                                            value={fechaNacimientoAxu}

                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="edad"
                                            label="Edad"
                                            variant="outlined"
                                            nombre="edad"
                                            fullWidth
                                            value={edad}

                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={6}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="estudios"
                                            label="Grado de estudios"
                                            variant="outlined"
                                            nombre="estudios"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {
                                                estudiosList.map(
                                                    (g, i) => (
                                                        <MenuItem
                                                            key={i}
                                                            value={g.id}>
                                                            {g.dsgrado}
                                                        </MenuItem>
                                                    )
                                                )
                                            }
                                        </TextField>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12} lg={10}>
                            <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="estadoCivil"
                                            label="Estado Civil"
                                            variant="outlined"
                                            nombre="estadoCivil"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {
                                                estadoCivilList.map(
                                                    (g, i) => (
                                                        <MenuItem
                                                            key={i}
                                                            value={g.id}>
                                                            {g.dsgrado}
                                                        </MenuItem>
                                                    )
                                                )
                                            }
                                        </TextField>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12} lg={10}>
                                <GridContainer>
                                    <GridItem xs={12} sm={4}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="tipoIdentificacion"
                                            label="Tipo de Identificación Oficial"
                                            variant="outlined"
                                            name="tipoIdentificacion"
                                            fullWidth
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        {/*
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="apellidoPaterno"
                                            label="Identificación Oficial"
                                            variant="outlined"
                                            nombre="nombre"
                                            fullWidth
                                            value={apellidoPaterno}

                                        />
                                        */}
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="ine"
                                            label="Identificación Oficial"
                                            variant="outlined"
                                            nombre="ine"
                                            fullWidth
                                            select
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {
                                                identificacionesList.map(
                                                    (g, i) => (
                                                        <MenuItem
                                                            key={i}
                                                            value={g.id}>
                                                            {g.dsidentificacion}
                                                        </MenuItem>
                                                    )
                                                )
                                            }
                                        </TextField>
                                    </GridItem>
                                    <GridItem xs={12} sm={4}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="folio"
                                            label="Folio"
                                            variant="outlined"
                                            nombre="folio"
                                            fullWidth
                                        />
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </div>
    );
}