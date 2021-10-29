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
import { TextField, MenuItem } from "@material-ui/core";

//contexts
import { EstadosContext } from "contexts/catalogos/EstadosContext";
import { MunicipiosContext } from "contexts/catalogos/MunicipiosContext";
import { LocalidadesContext } from "contexts/catalogos/Localidades/localidadesContext";
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";

const styles = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    ...customSelectStyle,
};

const useStyles = makeStyles(styles);
export const RegistroDireccion = forwardRef((props, ref) => {
    const classes = useStyles();
    const { beneficiario, obtenerDireccion, direccionBeneficiario } = props;

    console.log("LLEGA EL ID DEL BENEFICIARIO ---> ", beneficiario);

    const [simpleSelect, setsimpleSelect] = React.useState("");
    const { getEstadosAll, estadosList } = useContext(EstadosContext);
    const { getMunicipioEstado, municipiosListId } = useContext(MunicipiosContext);
    const { localidadesList, getLocalidadesMunicipio } = useContext(LocalidadesContext);
    const [calle, setCalle] = useState("");
    const [noExterior, setNoExterior] = useState("");
    const [noInterior, setNoInterior] = useState("");
    const [colonia, setColonia] = useState("");
    const [entreCalle, setEntreCalle] = useState("");
    const [yCalle, setYCalle] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [idLocalidad, setIdLocalidad] = useState("");
    const [otraReferencia, setOtraReferencia] = useState("");

    const { direccion, registrarDireccionBeneficiario } = useContext(RegistroSolicitudContext);




    useEffect(() => {
        console.log("ESTO LLEGO DE LA CONSULTA DE LA DIRECCION DEL BENEFICIARIO -----> ", direccionBeneficiario);
        if (direccionBeneficiario !== undefined) {
            console.log("DIRECCION DEL BENEFICIARIO -----> ", direccionBeneficiario[0]);
            if (direccionBeneficiario[0] !== undefined) {
                console.log("direccion es defined ====> ", direccionBeneficiario[0]);
                setCalle(direccionBeneficiario[0].calle);
                setNoExterior(direccionBeneficiario[0].noExterior);
                setNoInterior(direccionBeneficiario[0].noInterior);
                setColonia(direccionBeneficiario[0].colonia);
                setEntreCalle(direccionBeneficiario[0].entreCalle);
                setYCalle(direccionBeneficiario[0].ycalle);
                setIdLocalidad(direccionBeneficiario[0].idLocalidad);
                setOtraReferencia(direccionBeneficiario[0].otraReferencia);
            }
        }
        getEstadosAll();
    }, [direccionBeneficiario]);


    const llenado = () => {
        if (beneficiario != undefined) {
            console.log("beneficiario ===>", beneficiario);
            var id = "";
            if (beneficiario[0] !== undefined) {
                console.log("LLEGA EL ID DEL BENEFICIARIO AL LLENAR LOS DATOS? ---> ", beneficiario[0].id);
                id = beneficiario[0].id;
            } else {
                console.log("USA EL BEN como id");
                id = beneficiario.id;
            }
            let datosDireccion = {};
            if (direccionBeneficiario[0] === undefined) {
                datosDireccion = {
                    idBeneficiario: id,
                    calle: calle,
                    noExterior: noExterior,
                    noInterior: noInterior,
                    colonia: colonia,
                    entreCalle: entreCalle,
                    yCalle: yCalle,
                    codigoPostal: codigoPostal,
                    idLocalidad: idLocalidad,
                    otraReferencia: otraReferencia,
                    telefonoCasa: '',
                    telefonoCelular: '',
                    telefonoContacto: '',
                    correo: ''
                }
            } else {
                datosDireccion = {
                    id: direccionBeneficiario[0].id,
                    idBeneficiario: id,
                    calle: calle,
                    noExterior: noExterior,
                    noInterior: noInterior,
                    colonia: colonia,
                    entreCalle: entreCalle,
                    yCalle: yCalle,
                    codigoPostal: codigoPostal,
                    idLocalidad: idLocalidad,
                    otraReferencia: otraReferencia,
                    telefonoCasa: direccionBeneficiario[0].telefonoCasa,
                    telefonoCelular: direccionBeneficiario[0].telefonoCelular,
                    telefonoContacto: direccionBeneficiario[0].telefonoContacto,
                    correo: direccionBeneficiario[0].correo
                }
            }
            console.log("Datos que debe guardar", datosDireccion);
            /**
             * Aqui hacemos el guardar
             */
            /**
             * mandamos llenar la funcion padre
             */
            obtenerDireccion(datosDireccion);
        } else {
            console.log("llega ben ---->", beneficiario);
        }

    }

    useImperativeHandle(ref, () => ({
        registroDireccion(beneficiario1) {
            console.log("REGISTRO DIRECCION BEN ---->", beneficiario1);
            console.log("SE LLENO BENeficiario --->", beneficiario);
            llenado();
        }
    })
    );

    const onChangeEstado = event => {
        getMunicipioEstado(event.target.value);
    }

    const onChangeMunicipio = event => {
        getLocalidadesMunicipio(event.target.value);
    }

    const onChange = event => {
        console.log("target direccion ===> ", event.target.name);
        //llenado de los datos a registrar
        switch (event.target.name) {
            case "calle":
                setCalle(event.target.value);
                break;
            case "numeroExterior":
                setNoExterior(event.target.value);
                break;
            case "numeroInterior":
                setNoInterior(event.target.value);
                break;
            case "colonia":
                setColonia(event.target.value);
                break;
            case "entreCalle":
                setEntreCalle(event.target.value);
                break;
            case "yCalle":
                setYCalle(event.target.value);
                break;
            case "codigoPostal":
                setCodigoPostal(event.target.value);
                break;
            case "localidad":
                console.log("target value ==>",event.target.value)
                setIdLocalidad(event.target.value);
                break;
            case "otraReferencia":
                setOtraReferencia(event.target.value);
                break;
        }
    }

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
                                onChange={onChange}
                                value={calle}
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
                                onChange={onChange}
                                value={noExterior}
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
                                onChange={onChange}
                                value={noInterior}
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
                                onChange={onChange}
                                value={colonia}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={5}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="entreCalle"
                                label="Entre Calle"
                                variant="outlined"
                                name="entreCalle"
                                onChange={onChange}
                                fullWidth
                                value={entreCalle}
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
                                onChange={onChange}
                                value={yCalle}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={3}>
                            {/*}
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="entidadFederativa"
                                label="Entidad Federativa"
                                variant="outlined"
                                name="entidadFederativa"
                                fullWidth
                            />
                            */}
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="entidadFederativa"
                                label="Entidad Federativa"
                                variant="outlined"
                                name="entidadFederativa"
                                fullWidth
                                select
                                onChange={onChangeEstado}
                            >
                                {
                                    estadosList.map(
                                        (g, i) => (
                                            <MenuItem
                                                key={i}
                                                value={g.id}>
                                                {g.dsestado}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            {/*
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="municipio"
                                label="Municipio"
                                variant="outlined"
                                name="municipio"
                                fullWidth
                            />
                            */}
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="municipio"
                                label="Municipio"
                                variant="outlined"
                                name="municipio"
                                fullWidth
                                select
                                onChange={onChangeMunicipio}
                            >
                                {
                                    municipiosListId.map(
                                        (g, i) => (
                                            <MenuItem
                                                key={i}
                                                value={g.id}>
                                                {g.dsmunicipio}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </GridItem>
                        <GridItem xs={12} sm={5}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="codigoPostal"
                                label="Código Postal"
                                variant="outlined"
                                name="codigoPostal"
                                fullWidth
                                onChange={onChange}
                                value={codigoPostal}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={5}>
                            {/*
                            
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="ctLocalidad"
                                label="CT Localidad"
                                variant="outlined"
                                name="ctLocalidad"
                                fullWidth
                            />
                            */}
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="ctLocalidad"
                                label="Localidad"
                                variant="outlined"
                                name="localidad"
                                fullWidth
                                select
                                onChange={onChange}
                                value={idLocalidad}
                            >
                                {
                                    localidadesList.map(
                                        (g, i) => (
                                            <MenuItem
                                                key={i}
                                                value={g.id}>
                                                {g.dslocalidad}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </TextField>
                        </GridItem>

                        {/*
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
                        
                        <GridItem xs={12} sm={10}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="nombreLocalidad"
                                label="Nombre Localidad"
                                variant="outlined"
                                name="nombreLocalidad"
                                fullWidth
                            />
                        </GridItem>
                        */}

                        <GridItem xs={12} sm={10}>
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="otraReferencia"
                                label="Otra referencia"
                                variant="outlined"
                                name="otraReferencia"
                                fullWidth
                                onChange={onChange}
                                value={otraReferencia}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        </GridItem>
    );
});