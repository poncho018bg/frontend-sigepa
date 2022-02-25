import React, { useContext, useState, useEffect } from "react";
//componentes
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from "@material-ui/core/CardActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  TableContainer,
  TextField,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

export const GeneracionEventoScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            Creación de lotes por punto de entrega
          </h4>
          <p className={classes.cardCategoryWhite}></p>
        </CardHeader>
        <CardBody>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="paterno"
                label="Número de Evento-Lote"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label={t("lbl.seleccionaunprograma")}
                select
                fullWidth
                name="programa"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
              >
                <MenuItem value="0">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {programasList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dsprograma}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label={t("lbl.seleccionaunprograma")}
                select
                fullWidth
                name="programa"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
              >
                <MenuItem value="0">
                  <em>{t("cmb.ninguno")}</em>
                </MenuItem>
                {programasList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.dsprograma}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
    </GridItem>
  );
};
