import React, { useEffect, useState, useContext, forwardRef, useImperativeHandle } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useTranslation } from 'react-i18next';
import CardActions from '@material-ui/core/CardActions';
import Button from "components/CustomButtons/Button.js";

import { Grid, MenuItem, TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from 'css/stylesArchivo';
import { MotivoRechazosContext } from 'contexts/catalogos/motivoRechazosContext';
import { ExpedienteContext } from 'contexts/expedienteContext';


const useStyles = makeStyles(stylesArchivo);

export const ObservacionesExpediente = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const { idBeneficiario, idProgramaExpediente } = props;
    const [observaciones, setObservaciones] = useState('');
    const classes = useStyles();
    const { getMotivoRechazos, motivoRechazosList } = useContext(MotivoRechazosContext);
    const { mvbandejasolicitud, solicitudBeneficiarioPrograma, registrarBandejaMotivoRechazoExpediente, actualizarBandejaMotivoRechazoExpediente,
        bandejaRechazo, getBandejaRechazos } = useContext(ExpedienteContext);
    const [motivoRechazo, setMotivoRechazo] = useState('');
    const [guardarObservaciones, setGuardarObservaciones] = useState(false);
    const [guardarMotivos, setGuardarMotivos] = useState(false);

    useEffect(() => {
        getMotivoRechazos();
        console.log("motivoRechazosList", motivoRechazosList);
        /**
         * buscamos la solicitud
         */
        console.log("mv bandeja solicitud beneficiario y programa", idBeneficiario, idProgramaExpediente);
        /*
        consulta de la solicitud, 
        consulta la bandeja de solicitudes 
        y al final el mv_bandeja solicitudes, 
        para poder hacer el un insert del rechazo de la bandeja en caso que se guarde
        */
        solicitudBeneficiarioPrograma(idBeneficiario, idProgramaExpediente);
    }, [idBeneficiario, idProgramaExpediente]);

    useEffect(() => {
        console.log("mv bandeja solicitud busca la bandeja de rechazos")
        if (mvbandejasolicitud !== null) {
            getBandejaRechazos(mvbandejasolicitud.id_mv_bandeja_solicitudes);
        }
    }, [mvbandejasolicitud]);

    useEffect(() => {
        console.log("mv bandeja solicitud registra las observaciones y el motivo de rechazo de la bandeja")
        if (bandejaRechazo !== null) {
            setObservaciones(bandejaRechazo.dsobservaciones);
            setMotivoRechazo(bandejaRechazo.motivo_rechazo_id);
        }
    }, [bandejaRechazo])

    //console.log("mv bandeja solicitud", mvbandejasolicitud);
    const onClickObservaciones = () => {
        console.log("mv bandeja solicitud", mvbandejasolicitud);
        /**
         * Las observaciones se guardan en mv_bandejasolicitudes
         */
        setGuardarObservaciones(false);
    };

    const onClickMotivo = () => {
        console.log("mv bandeja solicitud", mvbandejasolicitud.id_mv_bandeja_solicitudes);
        /**
         * se guarda en crc_bandejarechazos, junto con las observaciones
         */
        if (bandejaRechazo.id === undefined) {
            let guardarRechazo = {
                dsobservaciones: observaciones,
                motivo_rechazo_id: motivoRechazo,
                mv_bandeja_id: mvbandejasolicitud.id_mv_bandeja_solicitudes
            }

            registrarBandejaMotivoRechazoExpediente(guardarRechazo);
        } else {
            let guardarRechazo = {
                id: bandejaRechazo.id,
                dsobservaciones: observaciones,
                motivo_rechazo_id: motivoRechazo,
                mv_bandeja_id: mvbandejasolicitud.id_mv_bandeja_solicitudes
            }
            actualizarBandejaMotivoRechazoExpediente(guardarRechazo);
        }

        setGuardarMotivos(false);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                    <h5 className={classes.cardTitleWhite}>{t('pnl.expObservaciones')} </h5>
                    <CardActions>
                        {guardarObservaciones &&
                            <Grid item xs={1}>
                                <Button
                                    round
                                    onClick={onClickObservaciones}
                                >
                                    Guardar Cambios
                                </Button>
                            </Grid>
                        }
                    </CardActions>
                </CardHeader>
                <CardBody>
                    <TextField
                        id="outlined-multiline-static"
                        label={t('lbl.expObservaciones')} 
                        multiline
                        rows={4}
                        variant="outlined"
                        name="observaciones"
                        value={observaciones}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                        onChange={event => {
                            const { value } = event.target;
                            setObservaciones(value);
                            //setGuardarObservaciones(true);
                        }}
                    />
                </CardBody>
            </Card >
            <Card>
                <CardHeader color="primary">
                    <h5 className={classes.cardTitleWhite}>{t('pnl.expMotivoBajaSuspencion')}</h5>
                </CardHeader>
                <CardActions>
                    {guardarMotivos &&
                        <Grid item xs={1}>
                            <Button
                                round
                                onClick={onClickMotivo}
                            >
                                Guardar Cambios
                            </Button>
                        </Grid>
                    }
                </CardActions>
                <CardBody>
                    <TextField
                        variant="outlined"
                        label="Selecciona un motivo"
                        select
                        fullWidth
                        name="motivoRechazo"
                        value={motivoRechazo}
                        onChange={e => {
                            setMotivoRechazo(e.target.value)
                            setGuardarMotivos(true);
                        }}
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
