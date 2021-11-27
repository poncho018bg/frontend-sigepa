/*eslint-disable*/
import React from "react";
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
import styles from "assets/jss/material-dashboard-react/cardImagesStyles"

import { FormularioExpediente } from './FormularioExpediente';
import { DatosGeneralesExpediente } from './DatosGeneralesExpediente';
import { DireccionExpediente } from './DireccionExpediente';
import { ContactoExpediente} from "./ContactoExpediente"
import { ApoyosRecibidosExpediente} from "./ApoyosRecibidosExpediente"
import { ObservacionesExpediente} from "./ObservacionesExpediente"

import { widgetStories, bugs, website, server } from "variables/general.js";
import { ExpedienteDocumentos } from "./ExpedienteDocumentos";
import CustomTabs from "components/CustomTabs/CustomTabs";

const useStyles = makeStyles(styles);

export const Expediente = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                                        <DatosGeneralesExpediente />
                                        <DireccionExpediente />
                                        <ContactoExpediente/>
                                        <ApoyosRecibidosExpediente/>
                                        <ObservacionesExpediente/>
                                    </GridItem>
                                ),
                            },
                            {
                                tabName: "Información de Beneficiaria",
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