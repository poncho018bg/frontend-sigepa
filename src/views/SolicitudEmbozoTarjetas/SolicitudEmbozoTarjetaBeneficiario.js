import React, { useContext, useState, useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const SolicitudEmbozoTarjetaBeneficiario = (props) => {
  const { datos, index } = props;
  return (
    <TableRow key={index}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{datos.nombreCompleto}</TableCell>
      <TableCell align="center">{datos.nombreEmbozar}</TableCell>
      <TableCell align="center">
        {datos.calle} {datos.numeroExterior}
      </TableCell>
      <TableCell align="center">{datos.numeroInterior}</TableCell>
      <TableCell align="center">{datos.municipio}</TableCell>
      <TableCell align="center">{datos.localidad}</TableCell>
      <TableCell align="center">{datos.telefonoCasa}</TableCell>
      <TableCell align="center">{datos.codigoPostal}</TableCell>
      <TableCell align="center">{datos.codigoProvincia}</TableCell>
      <TableCell align="center">{datos.email}</TableCell>
      <TableCell align="center">{datos.tipoDocumento}</TableCell>
      <TableCell align="center">{datos.numeroDocumento}</TableCell>
      <TableCell align="center">{datos.genero}</TableCell>
      <TableCell align="center">{datos.fechaNacimiento}</TableCell>
      <TableCell align="center">{datos.rfc}</TableCell>
      <TableCell align="center">{datos.curp}</TableCell>
      <TableCell align="center">{datos.telefonoCelular}</TableCell>
    </TableRow>
  );
};
