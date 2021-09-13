
import React, {  useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import { TableCell, TableRow } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

export const Programa = ( {programa}) => {

    const { 
        id, dsprograma, dsclaveprograma, 
        fcvigenciainicio,fcvigenciafin,
        dsdescripcion,
        activo 
} = programa;



    const onSelect = (e) => {
        dispatch(obtenerPaginaEditar(e));
        setShowDialogForm(true);
    }
   
    const handleClickOpen = (e) => {
        dispatch(obtenerPaginaEliminar(e));
        setOpenDialog(true);
    }

    const handleDeshabilitar = () => {
        dispatch(borrarPaginaAction());
        setOpenDialog(false);
      }

    return (
         <>
        < TableRow >
            <TableCell>
                <Checkbox
                    checked={activo}
                    color="primary"
                     inputProps={{ 'aria-label': 'Checkbox A' }}
                />
            </TableCell>
            <TableCell>{dsprograma}</TableCell>
            <TableCell>{dsclaveprograma}</TableCell >
            <TableCell >{moment(fcvigenciainicio).format("MM/DD/YYYY")}</TableCell>
            <TableCell >{moment(fcvigenciafin).format("MM/DD/YYYY")}</TableCell>
            <TableCell>{dsdescripcion}</TableCell >
            
            <TableCell align="center">                                 
                <IconButton aria-label="create" onClick={() => onSelect(programa)}>
                <CreateIcon/>
                </IconButton>
             </TableCell>
            <TableCell align="center">                                 
                <IconButton aria-label="create"  onClick={() => handleClickOpen(programa)}>
                     {(programa.activo)? <DeleteIcon/>:<RefreshIcon/>} 
                </IconButton>
            </TableCell> 
        </TableRow >
        </>
    )
}
