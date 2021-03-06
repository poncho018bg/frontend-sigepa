import React, { useContext, useEffect, useState } from 'react';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";


const ValidarProgramaMonetario = ({ curp, idPrograma, edadValida, children, setActivar, origen }) => {
    const { beneficiarioMonetario, getBeneficiarioMonetario,
        beneficiarioRegistrado, getBeneficiarioRegistradoPrograma } = useContext(RegistroSolicitudContext)
    let history = useHistory();
    if (edadValida !== undefined) {
        console.log("Monetario curp", curp)

        useEffect(() => {
            getBeneficiarioRegistradoPrograma(curp, idPrograma);
            getBeneficiarioMonetario(curp,idPrograma);
        }, [edadValida])

        console.log("programa, Monetario resultado", beneficiarioRegistrado, beneficiarioMonetario);

        if (beneficiarioRegistrado) {
            let open = true
            const handleClose = () => {
                open = false;
                /**
                 * se debe modificar el push para que regrese al inicio del registro
                 */
                if (origen === 'URL') {
                    window.location.reload(false);
                } else {
                    history.push("/admin/consultaProgramas")
                }
            };
            console.log("beneficiario A registrado")
            setActivar(false);
            return (
                <GridItem xs={12} sm={12} md={12}>
                    {/*
                    <Card>
                        <CardHeader color="primary">
                            <h4>Registro de Programa de Apoyo</h4>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="body1" color="text.secondary">
                                Su registro no puede ser procesado, cualquier dudad o aclaraci??n favor de comunicarse a la Direcci??n General de Programas Sociales Estrat??gicos al 722 2 13 89 15 extensiones de la 808 a la 811 y en el Centro de Atenci??n Telef??nica del Gobierno del Estado de M??xico (CATGEM) al 800 22 57 333 para el interior de la Rep??blica y 070 para Toluca y zona conurbada, las 24 horas del d??a, los 365 d??as del a??o
                            </Typography>
                        </CardBody>
                    </Card>
                    */}
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth={true}>
                        <DialogContent >
                            <Typography variant="body1" color="text.secondary">
                                Su registro no puede ser procesado, cualquier duda o aclaraci??n favor de comunicarse a la Direcci??n General de Programas Sociales Estrat??gicos al 722 2 13 89 15 extensiones de la 808 a la 811 y en el Centro de Atenci??n Telef??nica del Gobierno del Estado de M??xico (CATGEM) al 800 22 57 333 para el interior de la Rep??blica y 070 para Toluca y zona conurbada, las 24 horas del d??a, los 365 d??as del a??o
                            </Typography>
                        </DialogContent>
                    </Dialog>
                </GridItem>
            );
        } else {
            if (beneficiarioMonetario) {
                let open = true
                const handleClose = () => {
                    open = false;
                    /**
                     * se debe modificar el push para que regrese al inicio del registro
                     */
                    if (origen === 'URL') {
                        window.location.reload(false);
                    } else {
                        history.push("/admin/consultaProgramas")
                    }
                };
                console.log("beneficiario A monetario")
                setActivar(false);
                return (
                    <GridItem xs={12} sm={12} md={12}>
                        {/*
                        <Card>
                            <CardHeader color="primary">
                                <h4>Registro de Programa de Apoyo</h4>
                            </CardHeader>
                            <CardBody>
                                <Typography variant="body1" color="text.secondary">
                                    Su registro no puede ser procesado, cualquier dudad o aclaraci??n favor de comunicarse a la Direcci??n General de Programas Sociales Estrat??gicos al 722 2 13 89 15 extensiones de la 808 a la 811 y en el Centro de Atenci??n Telef??nica del Gobierno del Estado de M??xico (CATGEM) al 800 22 57 333 para el interior de la Rep??blica y 070 para Toluca y zona conurbada, las 24 horas del d??a, los 365 d??as del a??o
                                </Typography>
                            </CardBody>
                        </Card>
                        */}
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth={true}>
                            <DialogContent >
                                <Typography variant="body1" color="text.secondary">
                                    Su registro no puede ser procesado, cualquier duda o aclaraci??n favor de comunicarse a la Direcci??n General de Programas Sociales Estrat??gicos al 722 2 13 89 15 extensiones de la 808 a la 811 y en el Centro de Atenci??n Telef??nica del Gobierno del Estado de M??xico (CATGEM) al 800 22 57 333 para el interior de la Rep??blica y 070 para Toluca y zona conurbada, las 24 horas del d??a, los 365 d??as del a??o
                                </Typography>
                            </DialogContent>
                        </Dialog>
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