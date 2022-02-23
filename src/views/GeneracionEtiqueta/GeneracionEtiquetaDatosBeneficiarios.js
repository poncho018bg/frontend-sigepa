import React, { useContext, useState, useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const GeneracionEtiquetaDatosBeneficiarios = (props) => {
  const { datos, index } = props;
  return (
    <TableRow key={index}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{datos.nombreCompleto}</TableCell>
      <TableCell align="center">{datos.municipio}</TableCell>
      <TableCell align="center">{datos.consecutivo}</TableCell>
      <TableCell align="center">{datos.codigoEvento}</TableCell>
      <TableCell align="center">{datos.vertiente}</TableCell>
      <TableCell align="center">FECHA DE ENTREGA</TableCell>
      <TableCell align="center">{datos.terminacionTarjeta}</TableCell>
    </TableRow>
  );
};
