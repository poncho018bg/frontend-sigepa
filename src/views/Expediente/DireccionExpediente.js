import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CardActions from '@material-ui/core/CardActions';

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import { Grid, TextField, MenuItem } from "@material-ui/core";

//contexts
import { EstadosContext } from "contexts/catalogos/EstadosContext";
import { MunicipiosContext } from "contexts/catalogos/MunicipiosContext";
import { LocalidadesContext } from "contexts/catalogos/Localidades/localidadesContext";
import { useTranslation } from 'react-i18next';
const styles = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center",
    },
    ...customSelectStyle,
};

const useStyles = makeStyles(styles);
export const DireccionExpediente = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { idBeneficiario, direccionBeneficiario, guardarDireccion,setDtosgrlsprint,  dtosgrlsprint } = props;

    console.log("LLEGA EL direccionBeneficiario ---> ", direccionBeneficiario);

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
    const [idEstado, setIdEstado] = useState("");
    const [idMunicipio, setIdMunicipio] = useState("");
    const [activar, setActivar] = useState("");
    const [activaGuardar, setActivaGuardar] = useState(false);

    useEffect(() => {
        getEstadosAll();
        console.log("Expediente direccion DEL BENEFICIARIO -----> ", direccionBeneficiario);
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
                setOtraReferencia(direccionBeneficiario[0].otraReferencia);
                if (direccionBeneficiario[0].idEstado != null) {
                    setIdEstado(direccionBeneficiario[0].idEstado);
                    getMunicipioEstado(direccionBeneficiario[0].idEstado);
                    setIdMunicipio(direccionBeneficiario[0].idMunicipio);
                    getLocalidadesMunicipio(direccionBeneficiario[0].idMunicipio, direccionBeneficiario[0].codigoPostal);
                    setIdLocalidad(direccionBeneficiario[0].idLocalidad);
                    setCodigoPostal(direccionBeneficiario[0].codigoPostal);
                }

                var valoresprint = dtosgrlsprint
                valoresprint.calle=direccionBeneficiario[0].calle
                valoresprint.numeroExterior=direccionBeneficiario[0].noExterior
                valoresprint.numeroInterior=direccionBeneficiario[0].noInterior
                valoresprint.colonia=direccionBeneficiario[0].colonia
                valoresprint.entreCalle=direccionBeneficiario[0].entreCalle
                valoresprint.ycalle=direccionBeneficiario[0].ycalle
                valoresprint.entidadFederativa=estadosList.filter(e=> e.id === direccionBeneficiario[0].idEstado)[0]?.dsestado
                valoresprint.municipio=municipiosListId.filter(e=> e.id === direccionBeneficiario[0].idMunicipio)[0]?.dsmunicipio
                valoresprint.codigoPostal=direccionBeneficiario[0].codigoPostal
                valoresprint.localidad=localidadesList.filter(e=> e.id === direccionBeneficiario[0].idLocalidad)[0]?.dslocalidad
                valoresprint.referencia=direccionBeneficiario[0].otraReferencia

                setDtosgrlsprint(valoresprint)

            }
        }
        //setActivar(next());
    }, [direccionBeneficiario]);


    const llenado = () => {
        if (idBeneficiario != undefined) {
            console.log("idBeneficiario ===>", idBeneficiario);
            let datosDireccion = {};
            datosDireccion = {
                id: direccionBeneficiario[0].id,
                idBeneficiario: idBeneficiario,
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
                correo: direccionBeneficiario[0].correo,
                dsobservaciones: direccionBeneficiario[0].dsobservaciones
            }
            console.log("Datos que debe guardar", datosDireccion);
            guardarDireccion(datosDireccion);
        } else {
            console.log("llega ben ---->", idBeneficiario);
        }

    }

    const onChangeEstado = event => {
        console.log("entro al onchagen estado", event.target.value);
        setIdEstado(event.target.value);
        getMunicipioEstado(event.target.value);

    }

    const onChangeMunicipio = event => {
        console.log("entro al onchange municipio");
        setIdMunicipio(event.target.value);
        //getLocalidadesMunicipio(event.target.value);
    }

    /**
     * Esta funci??n llena los datos
     * @param {event} event 
     */
    const onChange = event => {
        //setActivaGuardar(true);
        console.log("target direccion ===> ", event.target.name);
        console.log(event.target.value);
        //llenado de los datos a registrar
        let testLetrasNum = /^[a-zA-Z0-9_.-\s????]*$/;
        let textSoloNum = /^[0-9]*$/;
        switch (event.target.name) {
            case "calle":
                if (testLetrasNum.test(event.target.value)) {
                    setCalle(event.target.value);
                }
                break;
            case "numeroExterior":
                if (testLetrasNum.test(event.target.value)) {
                    setNoExterior(event.target.value);
                }
                break;
            case "numeroInterior":
                if (testLetrasNum.test(event.target.value)) {
                    setNoInterior(event.target.value);
                }
                break;
            case "colonia":
                if (testLetrasNum.test(event.target.value)) {
                    setColonia(event.target.value);
                }
                break;
            case "entreCalle":
                if (testLetrasNum.test(event.target.value)) {
                    setEntreCalle(event.target.value);
                }
                break;
            case "yCalle":
                if (testLetrasNum.test(event.target.value)) {
                    setYCalle(event.target.value);
                }
                break;
            case "codigoPostal":
                if (textSoloNum.test(event.target.value)) {
                    setCodigoPostal(event.target.value);
                    buscarLocalidadCP(event.target.value);
                }
                break;
            case "localidad":
                console.log("target value ==>", event.target.value)
                setIdLocalidad(event.target.value);
                break;
            case "otraReferencia":
                if (testLetrasNum.test(event.target.value)) {
                    setOtraReferencia(event.target.value);
                }
                break;
        }
    }

    const [calleStatus, setCalleStatus] = useState("");
    const [exteriorStatus, setExteriorStatus] = useState("");
    const [interiorStatus, setInteriorStatus] = useState("");
    const [coloniaStatus, setColoniaStatus] = useState("");
    const [entreCalleStatus, setEntreCalleStatus] = useState("");
    const [ycalleStatus, setYCalleStatus] = useState("");
    const [codigoPostalStatus, setCodigoPostalStatus] = useState("");
    const [localidadStatus, setLocalidadStatus] = useState("");

    const next = () => {
        if (activar || activar === undefined) {
            console.log("activar es true o indefinido oblur", calle);
            if (calle !== "" && noExterior !== "" && colonia !== "" && entreCalle !== "" && yCalle !== "" && idLocalidad !== "") {
                return true;
            } else {
                if (calle === "") {
                    return false;
                }
                if (noExterior === "") {
                    return false;
                }
                if (colonia === "") {
                    return false;
                }
                if (entreCalle === "") {
                    return false;
                }
                if (yCalle === "") {
                    return false;
                }
                if (idLocalidad === "") {
                    return false;
                }
            }
        }
    }

    const buscarLocalidadCP = target => {
        console.log("municipio =========>", idMunicipio);
        console.log("codigo postal =====>", target);
        getLocalidadesMunicipio(idMunicipio, target);
    }


    useEffect(() => {
        console.log("entro al USEEFFECT ====>", activar);
        setActivar(next())
    }, [calle, noExterior, colonia, entreCalle, yCalle, idLocalidad]);

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
                    <h4 className={classes.cardTitleWhite}>{t('pnl.expReferenciadomiciliaria')}</h4>
                    <CardActions>
                    </CardActions>
                </CardHeader>
                <CardBody>
                    <GridContainer justify="center">
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <GridItem xs={12} sm={6}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="calle"
                                    label={t('lbl.expCalle')}
                                    variant="outlined"
                                    name="calle"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={calle}
                                    success={calleStatus === 'success'}
                                    error={calleStatus === 'error'}
                                    disabled="true"
                                    inputProps={{
                                        onChange: (event) => {
                                            if (event.target.value === "") {
                                                setCalleStatus("error");
                                                setActivar(false);
                                            } else {
                                                console.log("entra aqui calle");
                                                setCalleStatus("success");
                                                setActivar(next())
                                            }
                                        }, maxLength: 20
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="numeroExterior"
                                    label={t('lbl.expNumeroexterior')}
                                    variant="outlined"
                                    name="numeroExterior"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={noExterior}
                                    success={exteriorStatus === 'success'}
                                    error={exteriorStatus === 'error'}
                                    disabled="true"
                                    inputProps={{
                                        onChange: (event) => {
                                            console.log("evento exterior", event);
                                            if (event.target.value === "") {
                                                setExteriorStatus("error");
                                                setActivar(false);
                                            } else {
                                                console.log("numero exterior");
                                                setExteriorStatus("success");
                                                setActivar(next())
                                            }
                                        }, maxLength: 40
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="numeroInterior"
                                    label={t('lbl.expNumerointerior')}
                                    variant="outlined"
                                    name="numeroInterior"
                                    fullWidth
                                    onChange={onChange}
                                    value={noInterior}
                                    inputProps={{ maxLength: 40 }}
                                    disabled="true"
                                />
                            </GridItem>
                        </Grid>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <GridItem xs={12} sm={6}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="colonia"
                                    label={t('lbl.expColonia')}
                                    variant="outlined"
                                    name="colonia"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={colonia}
                                    success={coloniaStatus === 'success'}
                                    error={coloniaStatus === 'error'}
                                    disabled="true"
                                    inputProps={{
                                        onChange: (event) => {
                                            console.log("colonia", event)
                                            if (event.target.value === "") {
                                                setColoniaStatus("error");
                                                setActivar(false);
                                            } else {
                                                console.log("entra aqui colonia");
                                                setColoniaStatus("success");
                                                setActivar(next())
                                            }
                                        }, maxLength: 80
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="entreCalle"
                                    label={t('lbl.expEntrecalle')}
                                    variant="outlined"
                                    name="entreCalle"
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    fullWidth
                                    value={entreCalle}
                                    success={entreCalleStatus === 'success'}
                                    error={entreCalleStatus === 'error'}
                                    disabled="true"
                                    inputProps={{
                                        onChange: (event) => {
                                            if (event.target.value === "") {
                                                setEntreCalleStatus("error");
                                                setActivar(false);
                                            } else {
                                                console.log("entra aqui entre calle");
                                                setEntreCalleStatus("success");
                                                setActivar(next())
                                            }
                                        }, maxLength: 80
                                    }}
                                />
                            </GridItem>
                        </Grid>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <GridItem xs={12} sm={6}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="yCalle"
                                    label={t('lbl.expYcalle')}
                                    variant="outlined"
                                    name="yCalle"
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={yCalle}
                                    success={ycalleStatus === 'success'}
                                    error={ycalleStatus === 'error'}
                                    disabled="true"
                                    inputProps={{
                                        onChange: (event) => {
                                            if (event.target.value === "") {
                                                setYCalleStatus("error");
                                                setActivar(false);
                                            } else {
                                                console.log("entra aqui y calle");
                                                setYCalleStatus("success");
                                                setActivar(next())
                                            }
                                        }, maxLength: 80
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="entidadFederativa"
                                    label={t('lbl.expEntidadfederativa')}
                                    variant="outlined"
                                    name="entidadFederativa"
                                    fullWidth
                                    select
                                    onChange={onChangeEstado}
                                    value={idEstado}
                                    disabled="true"
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
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="municipio"
                                    label={t('lbl.expMunicipio')}
                                    variant="outlined"
                                    name="municipio"
                                    fullWidth
                                    select
                                    onChange={onChangeMunicipio}
                                    value={idMunicipio}
                                    disabled="true"
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
                        </Grid>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="codigoPostal"
                                    label={t('lbl.expCodigopostal')}
                                    variant="outlined"
                                    name="codigoPostal"
                                    fullWidth
                                    onChange={onChange}
                                    value={codigoPostal}
                                    inputProps={{ maxLength: 5, pattern: '/^[a-zA-Z0-9_.-\s????]*$/' }}
                                    disabled="true"
                                />
                            </GridItem>


                            <GridItem xs={12} sm={3}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="ctLocalidad"
                                    label={t('lbl.expLocalidad')}
                                    variant="outlined"
                                    name="localidad"
                                    fullWidth
                                    select
                                    onChange={onChange}
                                    onBlur={() => setActivar(next())}
                                    value={idLocalidad}
                                    success={localidadStatus === 'success'}
                                    error={localidadStatus === 'error'}
                                    disabled="true"
                                    inputProps={{
                                        onChange: (event) => {
                                            if (event.target.value === "") {
                                                setLocalidadStatus("error");
                                                setActivar(false);
                                            } else {
                                                console.log("entra aqui localidad");
                                                setIdLocalidad(event.target.value);
                                                setLocalidadStatus("success");
                                                setActivar(next())
                                            }
                                        }
                                    }}
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

                            <GridItem xs={12} sm={6}>
                                <TextField
                                    style={{ marginBottom: '20px' }}
                                    id="otraReferencia"
                                    label={t('lbl.expOtrareferencia')}
                                    variant="outlined"
                                    name="otraReferencia"
                                    fullWidth
                                    onChange={onChange}
                                    value={otraReferencia}
                                    inputProps={{ maxLength: 100, pattern: '/^[a-zA-Z0-9_.-\s????]*$/' }}
                                    disabled="true"
                                />
                            </GridItem>
                        </Grid>
                    </GridContainer>
                </CardBody>
            </Card>
        </GridItem>
    );
});