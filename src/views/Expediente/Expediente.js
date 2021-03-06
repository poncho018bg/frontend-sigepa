/*eslint-disable*/
import React, { useContext, useEffect, useState, useRef } from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-dashboard-react/cardImagesStyles";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";

import { FormularioExpediente } from './FormularioExpediente';
import { DatosGeneralesExpediente } from './DatosGeneralesExpediente';
import { DireccionExpediente } from './DireccionExpediente';
import { ContactoExpediente } from "./ContactoExpediente"
import { ApoyosRecibidosExpediente } from "./ApoyosRecibidosExpediente"
import { ObservacionesExpediente } from "./ObservacionesExpediente"

import { widgetStories, bugs, website, server } from "variables/general.js";
import { ExpedienteDocumentos } from "./ExpedienteDocumentos";
import CustomTabs from "components/CustomTabs/CustomTabs";

import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

const useStyles = makeStyles(styles);

export const Expediente = () => {

    const [value, setValue] = React.useState(0);
    const { beneficiario, direccion,
        registrarDireccionBeneficiario, getBeneficiario, actualizarBeneficiario,
        obtenerDireccionBeneficiario, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);

    const child = useRef();
    const direccionChild = useRef();
    const contacto = useRef();
    const [activar, setActivar] = useState();
    const [curp, setCurp] = useState();
    const [identPrograma, setIdentPrograma] = useState();
    const [idBeneficiario, setIdBeneficiario] = useState();
    const [idProgramaExpediente, setIdProgramaExpediente] = useState();

    let query = useLocation();
    let history = useHistory();

    useEffect(() => {
        console.log("expediente ==>", query.state);
        if (query.state?.curp) {
            setCurp(query.state?.curp);
            setIdBeneficiario(query.state?.id)
            obtenerDireccionBeneficiario(query.state?.id);
            getBeneficiario(query.state?.curp)
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const guardarDireccion = datosDireccion => {
        console.log("guardar direccion");
        actualizarDireccionBeneficiario(datosDireccion);
        obtenerDireccionBeneficiario(query.state?.id);
    }

    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs
                        title="Expediente:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Datos Generales",
                                tabIcon: Store,
                                tabContent: (
                                    <GridItem xs={12} sm={12}>
                                        <DatosGeneralesExpediente
                                            //ref={child}
                                            beneficiarioPadre={beneficiario}
                                            setIdentPrograma={setIdentPrograma}
                                            setActivar={setActivar}
                                            setIdProgramaExpediente={setIdProgramaExpediente} />
                                        <DireccionExpediente
                                            //activar={activar}
                                            //setActivar={setActivar}
                                            direccionBeneficiario={direccion}
                                            idBeneficiario={idBeneficiario}
                                            //ref={contacto}
                                            guardarDireccion={guardarDireccion} />
                                        <ContactoExpediente
                                            direccionB={direccion}
                                            idBeneficiario={idBeneficiario}
                                            ref={contacto} />
                                        <ApoyosRecibidosExpediente idBeneficiario={idBeneficiario}/>
                                        <ObservacionesExpediente />
                                    </GridItem>
                                ),
                            },
                            {
                                tabName: "Informaci??n de Beneficiaria",
                                tabIcon: Code,
                                tabContent: (
                                    <FormularioExpediente />
                                ),
                            },
                            {
                                tabName: "Documentos",
                                tabIcon: Cloud,
                                tabContent: (
                                    <ExpedienteDocumentos />
                                ),
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
        </div>
    )
}