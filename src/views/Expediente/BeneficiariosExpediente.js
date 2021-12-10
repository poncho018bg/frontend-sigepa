import React, { useContext, useEffect, useState } from 'react';

import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import Add from '@material-ui/icons/Add';
import { useHistory } from "react-router";

const BeneficiariosExpediente = ({ i, b }) => {

    let history = useHistory();
    
    const onClick = (linea) => {
        console.log("expediente beneficiario ===>", linea);
        //history.push("/admin/expediente", { id: linea.id, curp:linea.dscurp });
        history.push("/admin/expedienteapi", { id: linea.id, curp:linea.dscurp });
    }

    return (
        <TableRow key={b.id}>
            <TableCell align="center">{b.dsnombre}</TableCell>
            <TableCell align="center">{b.dsapellido1}</TableCell>
            <TableCell align="center">{b.dsapellido2}</TableCell>
            <TableCell align="center">{b.dscurp}</TableCell>
            <TableCell align="center">
                <Button
                    color="white"
                    aria-label="edit"
                    justIcon round
                    onClick={() => onClick(b)}>
                    <Add />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default BeneficiariosExpediente;