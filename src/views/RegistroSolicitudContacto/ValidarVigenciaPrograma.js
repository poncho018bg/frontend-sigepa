import React, { useContext, useEffect } from 'react';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";


const ValidarVigenciaPrograma = ({ idPrograma, children, setActivar, origen }) => {
    const { getProgramaVigente, programaVigente } = useContext(RegistroSolicitudContext);
    let history = useHistory();
    console.log("validar programa idPrograma", idPrograma)
    if (idPrograma !== undefined) {
        console.log("validar programa idPrograma 2", idPrograma)

        useEffect(() => {
            getProgramaVigente(idPrograma, '2');
        }, [idPrograma])

        console.log("validar programa idPrograma 3", programaVigente);
        if (programaVigente !== null) {
            if (!programaVigente) {
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
                        <Card>
                            <CardHeader color="primary">
                                <h4>Registro de Programa de Apoyo</h4>
                            </CardHeader>
                            <CardBody>
                                <Typography variant="body1" color="text.secondary">
                                    El programa no se encuentra vigente
                                </Typography>
                            </CardBody>
                        </Card>
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth={true}>
                            <DialogContent >
                                <Typography variant="body1" color="text.secondary">
                                    El programa no se encuentra vigente
                                </Typography>
                            </DialogContent>
                        </Dialog>
                    </GridItem>
                );
            } else {
                return children;
            }
        } else {
            return children;
        }
    } else {
        return children;
    }
}

export default ValidarVigenciaPrograma;