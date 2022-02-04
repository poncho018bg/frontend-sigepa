import React, { useContext, useState, useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
//context
import { SolicitudEmbozoTarjetasContext } from "contexts/solicitudEmbozoTarjetasContext";
//componentes
import { SolicitudEmbozoTarjetaBeneficiario } from "./SolicitudEmbozoTarjetaBeneficiario";
//useStyles
import { makeStyles } from "@material-ui/core/styles";
import { stylesArchivo } from "css/stylesArchivo";
const useStyles = makeStyles(stylesArchivo);

/**
 * En esta función se retorna la vista con la lista de solicitud de embozo de tarjetas
 * @returns
 */
export const SolicitudEmbozoTarjetasScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { embozoBeneficiarios, getEmbozoBeneficiarios } = useContext(
    SolicitudEmbozoTarjetasContext
  );

  /**
   * Se realiza la consulta al endpoint
   */
  useEffect(() => {
    console.log("solicitu embozo tarjetas");
    getEmbozoBeneficiarios();
  }, []);

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>
            Solicitud de Embozo de Tarjetas
          </h4>
          <p className={classes.cardCategoryWhite}></p>
        </CardHeader>
        <CardBody>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow key="SE1MI">
                <TableCell align="center">Secuencial</TableCell>
                <TableCell align="center">Nombre Completo</TableCell>
                <TableCell align="center">Nombre a embozar</TableCell>
                <TableCell align="center">Calle, Numero exterior</TableCell>
                <TableCell align="center">Numero interior</TableCell>
                <TableCell align="center">Ciudad</TableCell>
                <TableCell align="center">Colonia</TableCell>
                <TableCell align="center">Teléfono</TableCell>
                <TableCell align="center">Código Postal</TableCell>
                <TableCell align="center">Código Provincia</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Tipo de Documento</TableCell>
                <TableCell align="center">Número de Documento</TableCell>
                <TableCell align="center">Sexo</TableCell>
                <TableCell align="center">Fecha de Nacimiento</TableCell>
                <TableCell align="center">RFC</TableCell>
                <TableCell align="center">CURP</TableCell>
                <TableCell align="center">Celular</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {embozoBeneficiarios.map((row, i) => {
                return (
                  <SolicitudEmbozoTarjetaBeneficiario datos={row} index={i} />
                );
              })}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </GridItem>
  );
};
