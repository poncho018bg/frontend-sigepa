import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useTranslation } from 'react-i18next';

import { Grid, MenuItem, TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';

const useStyles = makeStyles(stylesArchivo);

export const ObservacionesExpediente = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const [observaciones, setObservaciones] = useState('');
    const classes = useStyles();
    const { getMotivoRechazos, motivoRechazosList } = useContext(MotivoRechazosContext);
    const [activar, setActivar] = useState("");
    const [motivoRechazo, setMotivoRechazo] = useState('');

    useEffect(() => {
        getMotivoRechazos();
        console.log("motivoRechazosList", motivoRechazosList);
    }, []);

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h5 className={classes.cardTitleWhite}>Observaciones (opcional)</h5>
                </CardHeader>
                <CardBody>
                    <TextField
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="observaciones"
                        value={observaciones}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />
                </CardBody>
            </Card >
            <Card>
                <CardHeader color="primary">
                    <h5 className={classes.cardTitleWhite}>Motivo de Baja / Suspensión (opcional)</h5>
                </CardHeader>
                <CardBody>
                    <TextField
                        variant="outlined"
                        label="Selecciona un motivo"
                        select
                        fullWidth
                        name="motivoRechazo"
                        value={motivoRechazo}
                        onChange={(e) => setMotivoRechazo(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>{t('cmb.ninguno')}</em>
                        </MenuItem>
                        {
                            motivoRechazosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsmotivorechazo}
                                    </MenuItem>
                                )
                            )
                        }
                    </TextField>
                </CardBody>
            </Card >
        </GridItem >
    )
});
