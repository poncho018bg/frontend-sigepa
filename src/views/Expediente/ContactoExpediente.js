import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CardActions from '@material-ui/core/CardActions';

import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';
const useStyles = makeStyles(stylesArchivo);

export const ContactoExpediente = forwardRef((props, ref) => {
    const { direccionB, idBeneficiario } = props;
    console.log("direccionB en forward ref--->", direccionB, idBeneficiario);
    const classes = useStyles();
    // 
    const [celular, setCelular] = useState('');
    const [telefonoCasa, setTelefonoCasa] = useState('');
    const [telefonoContacto, setTelefonoContato] = useState('');
    const [email, setEmail] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [activar, setActivar] = useState("");
    const [activaGuardar, setActivaGuardar] = useState(false);

    const { direccion, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);

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
            if (idBeneficiario != undefined) {
                let datosDireccion = {
                    id: direccionB[0].id,
                    idBeneficiario: idBeneficiario,
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
        setActivaGuardar(true);
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
            }
        }
    }

    useEffect(() => {
        console.log("entro al USEEFFECT ====>", activar);
        setActivar(next());
    }, [celular]);

    /*
    const onClickGuardar = () => {
        console.log("GUARDA LOS CAMBIOS");
        setActivaGuardar(false);
    }
    */

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{t('lbl.expInformacioncontacto')}</h4>
                    <CardActions>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    <GridContainer justify="center">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    variant="outlined"
                                    id="dscelular"
                                    label={t('lbl.expCelular')}
                                    variant="outlined"
                                    name="celular"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={celular}
                                    success={celularStatus === 'success'}
                                    error={celularStatus === 'error'}
                                    disabled="true"
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
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    variant="outlined"
                                    id="dstelefono"
                                    label={t('lbl.expTelefonocasa')}
                                    variant="outlined"
                                    name="telefono"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={telefonoCasa}
                                    success={telefonoCasaStatus === 'success'}
                                    error={telefonoCasaStatus === 'error'}
                                    inputProps={{ maxLength: 10 }}
                                    disabled="true"
                                />
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="dstelefonocontacto"
                                    label={t('lbl.expTelefonocontacto')}
                                    variant="outlined"
                                    name="telefonocontacto"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={telefonoContacto}
                                    success={telefonoContactoStatus === 'success'}
                                    error={telefonoContactoStatus === 'error'}
                                    inputProps={{ maxLength: 10 }}
                                    disabled="true"
                                />
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="dsemail"
                                    label={t('lbl.expCorreoElectronico')}
                                    variant="outlined"
                                    name="email"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={email}
                                    success={emailStatus === 'success'}
                                    error={emailStatus === 'error'}
                                    inputProps={{ maxLength: 80 }}
                                    disabled="true"
                                />
                            </GridItem>
                        </Grid>
                    </GridContainer>
                </CardBody>
            </Card >
        </GridItem >
    )
});
