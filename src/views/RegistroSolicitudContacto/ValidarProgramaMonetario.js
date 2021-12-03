import React, { useContext, useEffect } from 'react';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Typography from '@material-ui/core/Typography';


const ValidarProgramaMonetario = ({ curp, idPrograma, edadValida, children, setActivar }) => {
    const { beneficiarioMonetario, getBeneficiarioMonetario,
        beneficiarioRegistrado, getBeneficiarioRegistradoPrograma } = useContext(RegistroSolicitudContext)
    if (edadValida !== undefined) {
        console.log("Monetario curp", curp)

        useEffect(() => {
            getBeneficiarioRegistradoPrograma(curp, idPrograma)
            getBeneficiarioMonetario(curp);
        }, [edadValida])

        console.log("Monetario resultado", beneficiarioMonetario);

        if (beneficiarioRegistrado) {
            console.log("beneficiario A registrado")
            setActivar(false);
            return (
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>Registro de Programa de Apoyo</h4>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="body1" color="text.secondary">
                                Ya se encuentra registrado en un Programa
                            </Typography>
                        </CardBody>
                    </Card>
                </GridItem>
            );
        } else {
            if (beneficiarioMonetario) {
                console.log("beneficiario A monetario")
                setActivar(false);
                return (
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4>Registro de Programa de Apoyo</h4>
                            </CardHeader>
                            <CardBody>
                                <Typography variant="body1" color="text.secondary">
                                    Ya se encuentra registrado en un programa
                                </Typography>
                            </CardBody>
                        </Card>
                    </GridItem>
                );
            } else {
                return children;
            }
        }
    } else {
        return children;
    }
}

export default ValidarProgramaMonetario;