import React, { useContext, useState, useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const GeneracionEtiquetaDatosBeneficiarios = (props) => {
  const { datos, index, fechaEntrega } = props;
  return (
    <TableRow key={index}>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">{datos.nombreCompleto}</TableCell>
      <TableCell align="center">{datos.municipio}</TableCell>
      <TableCell align="center">{datos.consecutivo}</TableCell>
      <TableCell align="center">{datos.codigoEvento}</TableCell>
      <TableCell align="center">{fechaEntrega}</TableCell>
      <TableCell align="center">{datos.vertiente}</TableCell>
      <TableCell align="center">{datos.terminacionTarjeta}</TableCell>
    </TableRow>
  );
};
