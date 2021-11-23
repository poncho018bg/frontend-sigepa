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
import { Loading } from "components/Personalizados/Loading";

import ValidarCurp from "./ValidarCurp";

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
const baseUrl = process.env.REACT_APP_AP_CURP_URL;
export const RegistroDatosSolicitante = forwardRef((props, ref) => {
    console.log('aqui');
    console.log(props);
    const { curpR, llenarDatosBeneficiario, beneficiario, setIdentPrograma, idPrograma, setEdadValida,setActivar } = props;
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
    const [loading, setLoading] = useState(true);
    const [estudios, setEstudios] = useState("");
    const [estadoCivil, setEstadoCivil] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const [rfc, setRfc] = useState("");
    const [idIdentificaion, setIdIdentificaion] = useState("");
    //const [identPrograma, setIdentPrograma] = useState();

    const [datosCorrectos, setDatosCorrectos] = useState(true);

    const { getGeneros, generosList,
        estudiosList, getEstudios,
        estadoCivilList, getEstadoCivil,
        getIdentificaciones, identificacionesList
    } = useContext(RegistroSolicitudContext);

    const { programasList, get, getCien } = useContext(ProgramasContext);

    useEffect(() => {
        setLoading(true);
        console.log("curp que llega --> ", curpR);

        console.log("BENEFICIARIO DEL USE EFFECT ====>", beneficiario);

        axios.get(`${baseUrl}${curpR}`)
            .then(response => {
                console.log('X=>', response);
                setNombre(response.data.response[0].nombre);
                setCurp(response.data.response[0].curp);
                setApellidoPaterno(response.data.response[0].apellidoPaterno);
                setapellidoMaterno(response.data.response[0].apellidoMaterno);
                setGenero(generoCurp(response.data.response[0].sexo))
                console.log("fecha --->", response.data.response[0].fechaNacimientoAxu)
                var dateParts = response.data.response[0].fechaNacimientoAxu.split("/");
                console.log("date parts ", +dateParts[2], dateParts[1] - 1, dateParts[0])
                var date = new Date(+dateParts[2], dateParts[1] - 1, dateParts[0]);
                console.log("chale -->", date);
                console.log("fomateada fecha ---> ", moment(date).format("YYYY-MM-DD"))
                setFechaNacimientoReal(moment(date).format("YYYY-MM-DD"));
                setFechaNacimientoAxu(response.data.response[0].fechaNacimientoAxu);
                setEdad(response.data.response[0].edad);

                console.log("EDAD ===>", response.data.response[0].edad)
                if (response.data.response[0].edad !== null) {
                    setEdadValida(response.data.response[0].edad);
                }
                setDatosCorrectos(true);
                setActivar(true);
            }).catch(error => {
                console.log("Error ", error)
                if (error.response) {
                    console.log("--------------------------------------------------")
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("ERROR DATA", error.response.data);
                    console.log("ERROR STATUS", error.response.status);
                    console.log("ERROR HEADERS", error.response.headers);
                    setDatosCorrectos(false);
                    setActivar(false);
                } else if (error.request) {
                    console.log("*************************")

                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("ERROR REQUEST", error.request);
                    setDatosCorrectos(false);
                    setActivar(false);
                } else {
                    console.log("++++++++++++++++++++++++")
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error MESSAGE ', error.message);
                    setDatosCorrectos(false);
                    setActivar(false);
                }
                console.log(error.config);
            });
        if (beneficiario !== undefined) {
            console.log("se llenando los datos del beneficiario", beneficiario);
            //setNombre(beneficiario.dsnombre);
            setGenero(beneficiario.idgenero);
            setEstudios(beneficiario.idgradoestudios);
            setEstadoCivil(beneficiario.idestadocivil);
            setIdentificacion(beneficiario.ididentificacionoficial);
            setRfc(beneficiario.rfc);
            setIdIdentificaion(beneficiario.dsiddocumento)

        }
        getCien().then(data => {
            setTimeout(() => setLoading(false), 500);

        });
        getGeneros();
        getEstudios();
        getEstadoCivil();
        getIdentificaciones();

    }, [beneficiario]);

    const generoCurp = (generocrp) => {
        console.log('', generocrp)
        let gen = '';
        generosList.map(e => {
            console.log('e=>', e)
            if (e.dsabreviatura === generocrp) {
                gen = e.id;
            }
        })
        return gen
    };

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
            identificacion,
            rfc,
            idIdentificaion);
    }
    useImperativeHandle(ref, () => ({
        registroBeneficiario() {
            llenado();
        }
    })
    );

    const onChange = event => {
        console.log("nombre del evento ==>", event.target);
        let testLetrasNum = /^[a-zA-Z0-9_.-\sñÑ]*$/;
        switch (event.target.name) {
            case 'rfc':
                if (testLetrasNum.test(event.target.value)) {
                    setRfc(event.target.value);
                    console.log("RFC ==>", rfc);
                }
                break;
            case 'idIdentificaion':
                if (testLetrasNum.test(event.target.value)) {
                    setIdIdentificaion(event.target.value);
                }
                break;
            case 'programa':
                setIdentPrograma(event.target.value);
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

    //console.log("Iden programa", identPrograma);

    const isValidated = () => {
        return true;
    };


    return (
        <ValidarCurp datosCorrectos={datosCorrectos}>
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
                                                value={idPrograma}
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
                                                label="CURP"
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
                                                label="Apellido paterno"
                                                variant="outlined"
                                                name="nombre"
                                                fullWidth
                                                value={apellidoPaterno}
                                                inputProps={{ maxLength: 80, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12}>
                                            <TextField
                                                style={{ marginBottom: '20px' }}
                                                id="apellidoMaterno"
                                                label="Apellido materno"
                                                variant="outlined"
                                                name="apellidoMaterno"
                                                fullWidth
                                                value={apellidoMaterno}
                                                inputProps={{ maxLength: 80, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12}>
                                            <TextField
                                                style={{ marginBottom: '20px' }}
                                                id="nombre"
                                                label="Nombre"
                                                variant="outlined"
                                                name="nombre"
                                                fullWidth
                                                value={nombre}
                                                inputProps={{ maxLength: 80, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6}>
                                            <TextField
                                                style={{ marginBottom: '20px' }}
                                                id="rfc"
                                                label="RFC"
                                                variant="outlined"
                                                name="rfc"
                                                fullWidth
                                                onChange={onChange}
                                                value={rfc}
                                                inputProps={{ maxLength: 13, pattern: '/^[a-zA-Z0-9_.-\sñÑ]*$/' }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6}>

                                            <TextField
                                                style={{ marginBottom: '20px' }}
                                                id="genero"
                                                label="Género"
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
                                                label="Fecha nacimiento"
                                                variant="outlined"
                                                name="fechaNacimientoAxu"
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
                                                name="edad"
                                                fullWidth
                                                value={edad}

                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12}>
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
                                        label="Estado civil"
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
                                        <GridItem xs={12} sm={6}>
                                            <TextField
                                                style={{ marginBottom: '20px' }}
                                                id="ine"
                                                label="Identificación oficial"
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
                                        <GridItem xs={12} sm={6}>
                                            <TextField
                                                style={{ marginBottom: '20px' }}
                                                id="idIdentificaion"
                                                label="Folio de la identificación"
                                                variant="outlined"
                                                name="idIdentificaion"
                                                fullWidth
                                                onChange={onChange}
                                                value={idIdentificaion}

                                            />
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>

                        </CardBody>
                    </Card>
                </GridItem>
                {/*
            <Loading
                loading={loading}
            />*/}
            </div>
        </ValidarCurp>
    );
});