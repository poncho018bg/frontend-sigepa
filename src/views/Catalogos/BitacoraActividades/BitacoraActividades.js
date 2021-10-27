
import React from 'react'

import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';


export const BitacoraActividades = ({ bitacoraActividades }) => {

    const { id, fcfecharegistro, dsaccion } = bitacoraActividades;




    return (
        <>
            < TableRow key={id}>
                <TableCell align="center">{moment(fcfecharegistro).format("MM/DD/YYYY")}</TableCell>
                <TableCell align="center">{dsaccion}</TableCell >
            </TableRow >
        </>
    )
}