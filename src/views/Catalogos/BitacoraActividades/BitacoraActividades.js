
import React, { useContext, useState } from 'react'

import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';

import { useHistory } from 'react-router';
import { BtActividadesContext } from 'contexts/catalogos/BtActividadesContext';
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