import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//componentes
import { Grid, TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
//context
import { RegistroSolicitudContext } from "contexts/registroSolicitudContext";
//
import { useTranslation } from "react-i18next";

export default function AgregarFolio(props) {
  const { row } = props;
  const { t } = useTranslation();
  const [mostrar, setMostrar] = useState(false);
  const [folioInterno, setFolioInterno] = useState("");
  const [conFolioInterno, setConFolioInterno] = useState(false);
  const [beneficiario, setBeneficiario] = useState("");
  //context
  const { actualizarBeneficiarioFolio } = useContext(RegistroSolicitudContext);
  console.log("Agregar folio ===> datos del registro ==>", row);

  /**
   * consulta beneficiario por curp al beneficiario
   */
  const baseUrlPublico = process.env.REACT_APP_API_PUBLICO_URL;
  useEffect(() => {
    console.log("Agregar folio ===> curp del beneficiario ==>", row.dscurp);
    const url = `${baseUrlPublico}beneficiarioOverride/curp/${row.dscurp}`;
    axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(
          "Agregar folio ====> beneficiario response: ",
          response.data
        );
        setBeneficiario(response.data);
        resolve(response);
      })
      .catch((error) => {
        console.log("Error ", error);
        if (error.response) {
          console.log("--------------------------------------------------");
          console.log("ERROR DATA", error.response.data);
          console.log("ERROR STATUS", error.response.status);
          console.log("ERROR HEADERS", error.response.headers);
        } else if (error.request) {
          console.log("*************************");
          console.log("ERROR REQUEST", error.request);
        } else {
          console.log("++++++++++++++++++++++++");
          console.log("Error MESSAGE ", error.message);
        }
        console.log(error.config);
      });
  }, [row,mostrar]);

  /**
   * revisamos que nos trae el beneficiario
   */
  useEffect(() => {
    console.log("Agregar folio ===> beneficiario consulta ==>", beneficiario);
    if (beneficiario !== undefined) {
      if (beneficiario.id !== undefined) {
        if (beneficiario.dsfolio !== "") {
          console.log(
            "Agregar folio ===> trae folio ===>",
            beneficiario.dsfolio
          );
          setFolioInterno(beneficiario.dsfolio);
          setConFolioInterno(true);
        }
      }
    }
  }, [beneficiario]);

  const onChange = (event) => {
    console.log("nombre del evento ==>", event.target);
    let testLetrasNum = /^[a-zA-Z0-9_.-\sñÑ]*$/;
    switch (event.target.name) {
      case "folioInterno":
        console.log("programa value", event.target.value);
        setFolioInterno(event.target.value);
        break;
    }
    setMostrar(true);
  };

  const onClick = (e) => {
    console.log("Agregar folio ===> Guardamos folio", folioInterno);
    llenado();
    setMostrar(false);
  };

  const llenado = () => {
    let datosEnviar = {
      id: beneficiario.id,
      dsnombre: beneficiario.dsnombre,
      dsapellido1: beneficiario.dsapellido1,
      dsapellido2: beneficiario.dsapellido2,
      dscurp: beneficiario.dscurp,
      idgenero: beneficiario.idgenero,
      fcfechanacimiento: beneficiario.fcfechanacimiento,
      idestadocivil: beneficiario.idestadocivil,
      idgradoestudios: beneficiario.idgradoestudios,
      ididentificacionoficial: beneficiario.ididentificacionoficial,
      rfc: beneficiario.rfc,
      dsiddocumento: beneficiario.dsiddocumento,
      folioInterno: folioInterno,
    };

    console.log(
      "Agregar folio ===> expediente actualizar beneficiario ===>",
      datosEnviar
    );
    actualizarBeneficiarioFolio(datosEnviar,sessionStorage.getItem("idUSuario"));
  };

  /**
   * Validamos que tenga folio interno
   */
  if (conFolioInterno) {
    return folioInterno;
  } else {
    return (
      <>
        <TextField
          style={{ width: "200px"}}
          id="folioInterno"
          label={t("lbl.expFolioSEDESEM")}
          variant="outlined"
          name="folioInterno"
          value={folioInterno}
          inputProps={{
            maxLength: 80,
            pattern: "/^[a-zA-Z0-9_.-sñÑ]*$/",
            alignItems: "center"
          }}
          onChange={onChange}
        />
        {mostrar && (
          <Grid item xs={1}>
            <Button round onClick={onClick}>
              Guardar Cambios
            </Button>
          </Grid>
        )}
      </>
    );
  }
}
