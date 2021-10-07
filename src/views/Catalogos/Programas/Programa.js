
import React, {  useContext, useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { ProgramasEdit } from './ProgramasEdit';

import { useHistory } from 'react-router';

export const Programa = ( {programa}) => {
    let history = useHistory();
    const { 
         dsprograma, dsclaveprograma, 
        fcvigenciainicio,fcvigenciafin,
        dsdescripcion,
        activo 
} = programa;
    const [idEliminar, setIdEliminar] = useState(0);
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const {  eliminar } = useContext(ProgramasContext);
    const [objetoActualizar, setObjetoActualizar] = useState();

    const handleClickOpen = (e) => {

        setShowModalDelete(true);
        setIdEliminar(e.id);
    }

    const handleDeshabilitar = () => {

        eliminar(idEliminar);
        setShowModalDelete(false);
      }

      const onSelect = (e) => {
        console.log(e);
        setObjetoActualizar(e);

        //history.push(`/admin/editarPrograma/${e.id}`)
       history.push("/admin/editarPrograma",{mobNo:e.id})
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
        <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />

     
        <ProgramasEdit objetoActualizar={objetoActualizar} />
           
        </>
    )
}
