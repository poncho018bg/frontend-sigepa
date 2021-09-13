
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

export const Localidad = ( {localidad}) => {

   const { id, dsPagina, dsmodulo, dsurlpagina,fechaRegistro,activo } = localidad;
    console.log(localidad);


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
            <TableCell>{id}</TableCell>
            <TableCell>{dsPagina}</TableCell >
            <TableCell>{dsmodulo}</TableCell >
            <TableCell>{dsurlpagina}</TableCell >
            <TableCell >{moment(fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
            {/* <TableCell align="center">                                 
                <IconButton aria-label="create" onClick={() => onSelect(pagina)}>
                <CreateIcon/>
                </IconButton>
             </TableCell>
            <TableCell align="center">                                 
                <IconButton aria-label="create"  onClick={() => handleClickOpen(pagina)}>
                     {(pagina.activo)? <DeleteIcon/>:<RefreshIcon/>} 
                </IconButton>
            </TableCell> */}
        </TableRow >
        </>
    )
}
