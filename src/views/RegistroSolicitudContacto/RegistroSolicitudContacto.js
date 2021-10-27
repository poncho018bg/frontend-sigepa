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

export const RegistroSolicitudContacto = forwardRef((props, ref) => {
    const { direccionB, beneficiario } = props;
    console.log("direccionB en forward ref--->", direccionB, beneficiario);
    const classes = useStyles();
    // 
    const [celular, setCelular] = useState('');
    const [telefonoCasa, setTelefonoCasa] = useState('');
    const [telefonoContacto, setTelefonoContato] = useState('');
    const [email, setEmail] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const { direccion, registrarDireccionBeneficiario, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);

    useEffect(() => {
        console.log("DIRECCION B USSE EFFECT -----> ", direccionB);
        if(direccionB !== undefined){
            console.log("DIRECCION B DEFINED -----> ", direccionB[0]);
            if(direccionB[0] !== undefined){
                console.log("DIRECCION B 0 DEFINED ====> ", direccionB[0]);
                setCelular(direccionB[0].telefonoCelular);
                setTelefonoCasa(direccionB[0].telefonoCasa);
                setTelefonoContato(direccionB[0].telefonoContacto);
                setEmail(direccionB[0].correo);
            }
        }
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
                    correo: email
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
        switch (event.target.name) {
            case 'celular':
                setCelular(event.target.value);
            case 'telefono':
                setTelefonoCasa(event.target.value);
            case 'telefonocontacto':
                setTelefonoContato(event.target.value);
            case 'email':
                setEmail(event.target.value);
            case 'observaciones':
                setObservaciones(event.target.value);
        }
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Información de contacto</h4>
                </CardHeader>
                <CardBody>
                    <CardBody>
                        <TextField
                            variant="outlined"
                            id="dscelular"
                            label="Celular"
                            variant="outlined"
                            name="celular"
                            fullWidth
                            onChange={onChange}
                            value={celular}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            variant="outlined"
                            id="dstelefono"
                            label="Teléfono de casa"
                            variant="outlined"
                            name="telefono"
                            fullWidth
                            onChange={onChange}
                            value={telefonoCasa}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dstelefonocontacto"
                            label="Teléfono de contacto"
                            variant="outlined"
                            name="telefonocontacto"
                            fullWidth
                            onChange={onChange}
                            value={telefonoContacto}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dsemail"
                            label="Correo Electrónico"
                            variant="outlined"
                            name="email"
                            fullWidth
                            onChange={onChange}
                            value={email}
                        />
                    </CardBody>
                    <CardBody>
                        <TextField
                            id="dsobservaciones"
                            label="Observaciones"
                            variant="outlined"
                            name="observaciones"
                            fullWidth
                            onChange={onChange}
                        />
                    </CardBody>
                </CardBody>
            </Card>
        </GridItem>
    )
});
