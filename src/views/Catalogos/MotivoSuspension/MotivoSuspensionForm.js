import {
  Button,
  DialogContent,
  FormHelperText,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { MotivoSuspensionContext } from "contexts/MotivoSuspensionContext";
import { ModalContext } from "contexts/modalContex";

import { ModalConfirmacion } from "commons/ModalConfirmacion";
import { ModalContextConfirmacion } from "contexts/modalContextConfirmacion";
import { Mensaje } from "components/Personalizados/Mensaje";
import { useTranslation } from "react-i18next";

export const MotivoSuspensionForm = () => {
  const { t } = useTranslation();
  const { registrarMotivoSuspension } = useContext(MotivoSuspensionContext);
  const { setShowModal } = useContext(ModalContext);

  //dialog confirmacion
  const [valores, setValores] = useState();
  const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
  const [error, setError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [msjConfirmacion, setMsjConfirmacion] = useState("");
  /**
   * abre el dialogo de confirmación
   * @param {valores} e
   */
  const confirmacionDialog = (e) => {
    console.log("Aqui hace el llamado al dialog", e);
    setShowModalConfirmacion(true);
    setValores(e);
  };

  /**
   * Registra el elemento
   */
  const handleRegistrar = () => {
    const { dsmotivosuspesion } = valores;

    let motivoSuspension = {
      dsmotivosuspesion: dsmotivosuspesion,
      boactivo: true,
    };

    registrarMotivoSuspension(motivoSuspension)
      .then((response) => {
        setOpenSnackbar(true);
        setMsjConfirmacion(`${t("msg.registroguardadoexitosamente")}`);

        const timer = setTimeout(() => {
          setError(false);
          setShowModalConfirmacion(false);
          setShowModal(false);
        }, 1000);
        return () => clearTimeout(timer);
      })
      .catch((err) => {
        setOpenSnackbar(true);
        setError(true);
        setMsjConfirmacion(`${t("msg.ocurrioerrorcalidarinfo")}`);
      });
  };

  const formik = useFormik({
    initialValues: {
      dsmotivosuspesion: "",
    },
    validationSchema: Yup.object({
      dsmotivosuspesion: Yup.string()
        .required(`${t("msg.moduloobligatorio")}`)
        .matches(/^[a-zA-Z0-9_.-\sñÑ]*$/, `${t("msg.nocarateresespeciales")}`),
    }),
    onSubmit: async (valores) => {
      confirmacionDialog(valores);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <TextField
          id="dsmotivosuspesion"
          label={t("lbl.motivosuspensión")}
          variant="outlined"
          name="dsmotivosuspesion"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dsmotivosuspesion}
          inputProps={{ maxLength: "50" }}
        />
        {formik.touched.dsmotivosuspesion && formik.errors.dsmotivosuspesion ? (
          <FormHelperText error={formik.errors.dsmotivosuspesion}>
            {formik.errors.dsmotivosuspesion}
          </FormHelperText>
        ) : null}
      </DialogContent>

      <DialogContent>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary" type="submit">
            {t("btn.guardar")}
          </Button>
        </Grid>
      </DialogContent>
      <ModalConfirmacion handleRegistrar={handleRegistrar} evento="Registrar" />

      <Mensaje
        setOpen={setOpenSnackbar}
        open={openSnackbar}
        severity={error ? "error" : "success"}
        message={msjConfirmacion}
      />
    </form>
  );
};
