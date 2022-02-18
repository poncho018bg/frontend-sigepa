import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { Button, DialogContent, FormHelperText, Grid, TextField } from '@material-ui/core'

import Box from '@material-ui/core/Box';

import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';
const useStyles = makeStyles(stylesArchivo);

import { useTranslation } from "react-i18next";

export const RegistroSolicitudContacto = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { direccionB, beneficiario, setActivar, activar, nombrePrograma } = props;
    console.log("direccionB en forward ref--->", direccionB, beneficiario);
    const classes = useStyles();
    // 
    const [celular, setCelular] = useState("");
    const [telefonoCasa, setTelefonoCasa] = useState("");
    const [telefonoContacto, setTelefonoContato] = useState("");
    const [email, setEmail] = useState("");
    const [observaciones, setObservaciones] = useState("");

    const { direccion, registrarDireccionBeneficiario, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);

    useEffect(() => {
        console.log("DIRECCION B USSE EFFECT -----> ", direccionB);
        if (direccionB !== undefined) {
            console.log("DIRECCION B DEFINED -----> ", direccionB[0]);
            if (direccionB[0] !== undefined) {
                console.log("DIRECCION B 0 DEFINED ====> ", direccionB[0]);
                setCelular(direccionB[0].telefonoCelular);
                setTelefonoCasa(direccionB[0].telefonoCasa);
                setTelefonoContato(direccionB[0].telefonoContacto);
                setEmail(direccionB[0].correo);
                setObservaciones(direccionB[0].dsobservaciones);
            }
        }
        setActivar(next());
    }, [direccionB]);

    const llenado = () => {
        if (direccionB != undefined) {
            if (beneficiario != undefined) {
                var idBen = "";
                if (beneficiario[0] !== undefined) {
                    console.log("LLEGA EL ID DEL BENEFICIARIO AL LLENAR LOS DATOS? ---> ", direccionB[0].id, beneficiario[0].id);
                    idBen = beneficiario[0].id;
                } else {
                    idBen = beneficiario.id
                }

                let datosDireccion = {
                    id: direccionB[0].id,
                    idBeneficiario: idBen,
                    calle: direccionB[0].calle,
                    noExterior: direccionB[0].noExterior,
                    noInterior: direccionB[0].noInterior,
                    colonia: direccionB[0].colonia,
                    entreCalle: direccionB[0].entreCalle,
                    yCalle: direccionB[0].ycalle,
                    codigoPostal: direccionB[0].codigoPostal,
                    idLocalidad: direccionB[0].idLocalidad,
                    otraReferencia: direccionB[0].otraReferencia,
                    telefonoCasa: telefonoCasa,
                    telefonoCelular: celular,
                    telefonoContacto: telefonoContacto,
                    correo: email,
                    dsobservaciones: observaciones
                }
                console.log("Datos que debe guardar", datosDireccion);

                actualizarDireccionBeneficiario(datosDireccion);
                console.log("direccion --->", direccion);
            }
        } else {
            console.log("llega direccion ---->", direccionB);
        }
    }

    useImperativeHandle(ref, () => ({
        registroContacto() {
            console.log(direccionB);
            llenado();
        }
    })
    );

    const onChange = event => {
        let textSoloNum = /^[0-9]*$/;
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        switch (event.target.name) {
            case 'celular':
                if (textSoloNum.test(event.target.value)) {
                    setCelular(event.target.value);
                }
                break;
            case 'telefono':
                if (textSoloNum.test(event.target.value)) {
                    setTelefonoCasa(event.target.value);
                }
                break;
            case 'telefonocontacto':
                if (textSoloNum.test(event.target.value)) {
                    setTelefonoContato(event.target.value);
                }
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'observaciones':
                setObservaciones(event.target.value);
                break;
        }
    }
    const [celularStatus, setCelularStatus] = useState('');
    const [telefonoCasaStatus, setTeleCasaStatus] = useState('');
    const [telefonoContactoStatus, setTelefonoContatoStatus] = useState('');
    const [emailStatus, setEmailStatus] = useState('');

    const verifyEmail = (value) => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    };

    const next = () => {
        if (activar || activar === undefined) {
            if (celular !== "") {
                return true;
            } else {
                if (celular === "") {
                    return false;
                }
                /*
                if (telefonoCasa === "") {
                    return false;
                }
                if (telefonoContacto === "") {
                    return false;
                }
                if (email === "") {
                    return false;
                }
                */
            }
        }
    }

    useEffect(() => {
        console.log("entro al USEEFFECT ====>", activar);
        setActivar(next());
    }, [celular]);

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Información de contacto</h4>
                </CardHeader>
                <CardBody>
                    <GridItem xs={12} sm={12} justify="center">
                        <h4 className={classes.infoText}>
                            {nombrePrograma}
                        </h4>
                    </GridItem>
                    <CardBody>
                        <TextField
                            variant="outlined"
                            id="dscelular"
                            label="Celular"
                            variant="outlined"
                            name="celular"
                            fullWidth
                            onChange={onChange}
                            onBlur={() => setActivar(next())}
                            value={celular}
                            success={celularStatus === 'success'}
                            error={celularStatus === 'error'}
                            inputProps={{
                                onChange: (event) => {
                                    if (event.target.value === "") {
                                        setCelularStatus("error");
                                        setActivar(false);
                                    } else {
                                        console.log("entra aqui calle");
                                        setCelularStatus("success");
                                        setActivar(next())
                                    }
                                }, maxLength: 10
                            }}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            variant="outlined"
                            id="dstelefono"
                            label="Teléfono de casa (opcional)"
                            variant="outlined"
                            name="telefono"
                            fullWidth
                            onChange={onChange}
                            onBlur={() => setActivar(next())}
                            value={telefonoCasa}
                            success={telefonoCasaStatus === 'success'}
                            error={telefonoCasaStatus === 'error'}
                            inputProps={{
                                /*
                                onChange: (event) => {
                                    if (event.target.value === "") {
                                        setTeleCasaStatus("error");
                                        setActivar(false);
                                    } else {
                                        console.log("entra aqui calle");
                                        setTeleCasaStatus("success");
                                        setActivar(next())
                                    }
                                },*/maxLength: 10
                            }}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dstelefonocontacto"
                            label="Teléfono de contacto (opcional)"
                            variant="outlined"
                            name="telefonocontacto"
                            fullWidth
                            onChange={onChange}
                            onBlur={() => setActivar(next())}
                            value={telefonoContacto}
                            success={telefonoContactoStatus === 'success'}
                            error={telefonoContactoStatus === 'error'}
                            inputProps={{
                                /*
                                onChange: (event) => {
                                    if (event.target.value === "") {
                                        setTelefonoContatoStatus("error");
                                        setActivar(false);
                                    } else {
                                        console.log("entra aqui calle");
                                        setTelefonoContatoStatus("success");
                                        setActivar(next())
                                    }
                                },*/maxLength: 10
                            }}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dsemail"
                            label="Correo Electrónico (opcional)"
                            variant="outlined"
                            name="email"
                            fullWidth
                            onChange={onChange}
                            onBlur={() => setActivar(next())}
                            value={email}
                            success={emailStatus === 'success'}
                            error={emailStatus === 'error'}
                            inputProps={{
                                /*
                                onChange: (event) => {
                                    if (event.target.value === "") {
                                        setEmailStatus("error");
                                        setActivar(false);
                                    } else {
                                        console.log("entra aqui calle");
                                        setEmailStatus("success");
                                        setActivar(next())
                                    }
                                },*/maxLength: 80
                            }}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dsobservaciones"
                            label="Observaciones (opcional)"
                            variant="outlined"
                            name="observaciones"
                            fullWidth
                            onChange={onChange}
                            onBlur={() => setActivar(next())}
                            value={observaciones}
                            inputProps={{
                                maxLength: 200
                            }}
                        />
                    </CardBody>
                </CardBody>
            </Card>
        </GridItem>
    )
});
