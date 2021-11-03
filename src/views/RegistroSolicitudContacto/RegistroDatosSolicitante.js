import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
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

import moment from 'moment';
import 'moment/locale/es';


//
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';

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
export const RegistroDatosSolicitante = forwardRef((props, ref) => {
    console.log('aqui');
    console.log(props);
    const { curpR, llenarDatosBeneficiario, beneficiario } = props;
    //console.log(props.allStates.about);
    const classes = useStyles();
    const [nombre, setNombre] = useState("")
    const [curp, setCurp] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setapellidoMaterno] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimientoAxu, setFechaNacimientoAxu] = useState("");
    const [fechaNacimientoReal, setFechaNacimientoReal] = useState("");
    const [edad, setEdad] = useState("");

    const [estudios, setEstudios] = useState("");
    const [estadoCivil, setEstadoCivil] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const [identPrograma, setIdentPrograma] = useState();

    const [loading, setLoading] = useState(true);

    const { getGeneros, generosList,
        estudiosList, getEstudios,
        estadoCivilList, getEstadoCivil,
        getIdentificaciones, identificacionesList
    } = useContext(RegistroSolicitudContext);

    const { programasList, get } = useContext(ProgramasContext);

    useEffect(() => {
        console.log("curp que llega --> ", curpR);

        console.log("BENEFICIARIO DEL USE EFFECT ====>", beneficiario);
        if (beneficiario.length == 0) {
            axios.get(`http://localhost:9080/v1/curp/consultaCurp/${curpR}`)
                .then(response => {
                    console.log(response);
                    setNombre(response.data.response[0].nombre);
                    setCurp(response.data.response[0].curp);
                    setApellidoPaterno(response.data.response[0].apellidoPaterno);
                    setapellidoMaterno(response.data.response[0].apellidoMaterno);
                    //setGenero(response.data.response[0].sexo)
                    console.log("fecha --->", response.data.response[0].fechaNacimientoAxu)
                    var dateParts = response.data.response[0].fechaNacimientoAxu.split("/");
                    console.log("date parts ", +dateParts[2], dateParts[1] - 1, dateParts[0])
                    var date = new Date(+dateParts[2], dateParts[1] - 1, dateParts[0]);
                    console.log("chale -->", date);
                    console.log("fomateada fecha ---> ", moment(date).format("YYYY-MM-DD"))
                    setFechaNacimientoReal(moment(date).format("YYYY-MM-DD"));
                    setFechaNacimientoAxu(response.data.response[0].fechaNacimientoAxu);
                    setEdad(response.data.response[0].edad);
                });
        } else {
            console.log("se llenando los datos del beneficiario");
            //setNombre(beneficiario.dsnombre);
            setGenero(beneficiario.idgenero);
            setEstudios(beneficiario.idgradoestudios);
            setEstadoCivil(beneficiario.idestadocivil);
            setIdentificacion(beneficiario.ididentificacionoficial);

        }
        get().then(data => {
            setTimeout(() => setLoading(false), 500);

        });
        getGeneros();
        getEstudios();
        getEstadoCivil();
        getIdentificaciones();

    }, [beneficiario]);

    const llenado = () => {
        console.log("entro al momento de cargar --->",
            nombre, apellidoPaterno, apellidoMaterno, genero, estudios, estadoCivil, identificacion);

        console.log("beneficiario que consulto si existe o no", beneficiario);
        llenarDatosBeneficiario(
            beneficiario.id,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            curp,
            genero,
            fechaNacimientoReal,
            edad,
            estudios,
            estadoCivil,
            identificacion);
    }
    useImperativeHandle(ref, () => ({
        registroBeneficiario() {
            llenado();
        }
    })
    );

    const onChange = event => {
        console.log("evento onchange", event);
        console.log("evento onchange", event.target);
        switch (event.target.name) {
            case 'programa':
                setIdentPrograma(event.target.value);
                console.log("programa ==> ", identPrograma);
                break;
            case 'genero':
                setGenero(event.target.value);
                console.log("genero onchange", genero);
                break;
            case 'estudios':
                setEstudios(event.target.value);
                console.log("estudios onchange", estudios);
                break;
            case 'estadoCivil':
                setEstadoCivil(event.target.value);
                console.log("civil ", estadoCivil);
                break;
            case 'identificacion':
                setIdentificacion(event.target.value);
                console.log("identificacion ", identificacion);
                break;
        }

    }

    console.log("Iden programa", identPrograma);

    const isValidated = () => {
        return true;
    };


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
                                            id="programa"
                                            label="Programa"
                                            variant="outlined"
                                            name="programa"
                                            fullWidth
                                            select
                                            onChange={onChange}
                                            value={identPrograma}
                                        >
                                            {
                                                programasList.map(
                                                    (g, i) => (
                                                        <MenuItem
                                                            key={i}
                                                            value={g.id}>
                                                            {g.dsprograma}
                                                        </MenuItem>
                                                    )
                                                )
                                            }
                                        </TextField>
                                    </GridItem>
                                    <GridItem xs={12} sm={12}>
                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="curp"
                                            label="Curp"
                                            variant="outlined"
                                            name="curp"
                                            fullWidth
                                            value={curp}
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

                                        <TextField
                                            style={{ marginBottom: '20px' }}
                                            id="genero"
                                            label="Genero"
                                            variant="outlined"
                                            name="genero"
                                            fullWidth
                                            select
                                            onChange={onChange}
                                            value={genero}
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
                                            name="estudios"
                                            fullWidth
                                            select
                                            onChange={onChange}
                                            value={estudios}
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
                                    name="estadoCivil"
                                    fullWidth
                                    select
                                    onChange={onChange}
                                    value={estadoCivil}
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
                                                    {g.dsestadocivil}
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
                                            id="ine"
                                            label="Identificación Oficial"
                                            variant="outlined"
                                            name="identificacion"
                                            fullWidth
                                            select
                                            onChange={onChange}
                                            value={identificacion}
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
                                    {/*
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
                                    */}
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </div>
    );
});