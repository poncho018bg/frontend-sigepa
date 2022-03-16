import React, { useEffect, useState, useContext, forwardRef } from "react";
import { useTranslation } from "react-i18next";
//componentes
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from "@material-ui/core/CardActions";
import Button from "components/CustomButtons/Button.js";
import { Grid, MenuItem, TextField } from "@material-ui/core";

//
import DialogConfirmacionSuspension from "./DialogConfirmancionSuspension";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

//context
import { MotivoSuspensionContext } from "contexts/MotivoSuspensionContext";
import { ExpedienteContext } from "contexts/expedienteContext";

export const SuspensionExpediente = forwardRef((props) => {
  const { t } = useTranslation();
  const {
    idBeneficiario,
    idProgramaExpediente,
    setDtosgrlsprint,
    dtosgrlsprint,
    setSuspendido,
    bajado
  } = props;
  const classes = useStyles();
  //context
  const {
    motivoSuspensionList,
    getMotivoSuspension,
    bandejaSuspensionList,
    getBandejaSuspendidos,
    registrarBandejaMotivoSuspensionExpediente,
    actualizarBandejaMotivoSuspensionExpediente,
  } = useContext(MotivoSuspensionContext);
  const { mvbandejasolicitud, solicitudBeneficiarioPrograma } = useContext(
    ExpedienteContext
  );
  //
  const [guardarMotivos, setGuardarMotivos] = useState(false);
  const [motivoSuspension, setMotivoSuspension] = useState("");
  const [desactivarGuardarMotivo, setDesactivarGuardarMotivo] = useState(false);
  //dialogo
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    console.log("entro a use efect para buscar los motivos");
    getMotivoSuspension();
    solicitudBeneficiarioPrograma(idBeneficiario, idProgramaExpediente);
  }, [idBeneficiario, idProgramaExpediente]);

  useEffect(() => {
    console.log("entro al use effect para buscar la bandeja");
    if (mvbandejasolicitud !== null) {
      getBandejaSuspendidos(mvbandejasolicitud.id_mv_bandeja_solicitudes);
    }
  }, [mvbandejasolicitud]);

  useEffect(() => {
    console.log("BANDEJA SUSPENSION USEEFFECT LIST", bandejaSuspensionList);
    if (
      (bandejaSuspensionList !== null) &&
      (bandejaSuspensionList !== undefined)
    ) {
      setMotivoSuspension(bandejaSuspensionList.idMotivoSuspension);

      if (
        bandejaSuspensionList.idMotivoSuspension !== undefined &&
        bandejaSuspensionList.idMotivoSuspension !== null
      ) {
        setSuspendido(true);
        setDesactivarGuardarMotivo(true);
      }
      //se agrega un boolean pasra cuando ya trae una bandeja de rechazo
      /*
      var valoresprint = dtosgrlsprint;
      valoresprint.motivosuspension = motivoSuspensionList.filter(
        (e) => e.id === bandejaSuspensionList.mvBandejaSolicitudes.id
      )[0]?.dsmotivosuspesion;
      setDtosgrlsprint(valoresprint);
      */
    }
  }, [bandejaSuspensionList]);

  const confirmacionDialog = () => {
    setMostrarConfirmacion(true);
  };

  const onClickMotivo = () => {
    console.log(
      "BANDEJA SUSPENSION Se va a guardar el Motivo Suspension",
      bandejaSuspensionList
    );

    //verifica si la bandeja tiene datos
    if (
      bandejaSuspensionList === undefined ||
      bandejaSuspensionList.length === 0
    ) {
      let guardarSuspension = {
        id: "NULL",
        dsobservaciones: "NULL",
        motivo_rechazo_id: motivoSuspension,
        mv_bandeja_id: mvbandejasolicitud.id_mv_bandeja_solicitudes,
        idUsuario: sessionStorage.getItem("idUSuario"),
      };
      //se registra el motivo de suspension
      registrarBandejaMotivoSuspensionExpediente(guardarSuspension);
    } else {
      //revisa si el id viene nulo o vacio
      if (
        bandejaSuspensionList.id === undefined ||
        bandejaSuspensionList.id === null
      ) {
        let guardarSuspension = {
          id: "NULL",
          dsobservaciones: "NULL",
          motivo_rechazo_id: motivoSuspension,
          mv_bandeja_id: mvbandejasolicitud.id_mv_bandeja_solicitudes,
          idUsuario: sessionStorage.getItem("idUSuario"),
        };
        //se registra el motivo de suspension
        registrarBandejaMotivoSuspensionExpediente(guardarSuspension);
      } else {
        let guardarSuspension = {
          id: bandejaSuspensionList.id,
          dsobservaciones: "NULL",
          motivo_rechazo_id: motivoSuspension,
          mv_bandeja_id: mvbandejasolicitud.id_mv_bandeja_solicitudes,
          idUsuario: sessionStorage.getItem("idUSuario"),
        };
        //se actualiza la bandeja de suspension
        actualizarBandejaMotivoSuspensionExpediente(guardarSuspension);
      }
    }
    setGuardarMotivos(false);
    setMostrarConfirmacion(false);
    setDesactivarGuardarMotivo(true);
    setSuspendido(true);
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h5 className={classes.cardTitleWhite}>
            Motivo de Suspensión (Opcional)
          </h5>
        </CardHeader>
        <CardActions>
          {guardarMotivos && (
            <Grid item xs={1}>
              <Button round onClick={confirmacionDialog}>
                Guardar Cambios
              </Button>
            </Grid>
          )}
        </CardActions>
        <CardBody>
          <TextField
            variant="outlined"
            label="Selecciona un motivo"
            select
            fullWidth
            name="motivoSuspension"
            value={motivoSuspension}
            disabled={desactivarGuardarMotivo === true || bajado === true}
            onChange={(e) => {
              setMotivoSuspension(e.target.value);
              if (!desactivarGuardarMotivo) {
                setGuardarMotivos(true);
              }
            }}
          >
            <MenuItem value="">
              <em>{t("cmb.ninguno")}</em>
            </MenuItem>
            {motivoSuspensionList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.dsmotivosuspesion}
              </MenuItem>
            ))}
          </TextField>
        </CardBody>
      </Card>
      <DialogConfirmacionSuspension
        mostrarConfirmacion={mostrarConfirmacion}
        setMostrarConfirmacion={setMostrarConfirmacion}
        onClickMotivo={onClickMotivo}
      />
    </GridItem>
  );
});
