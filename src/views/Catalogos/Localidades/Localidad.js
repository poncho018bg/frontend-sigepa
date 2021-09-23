
import React, {  useContext, useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalUpdate } from 'commons/ModalUpdate';
import { LocalidadEdit } from './LocalidadEdit';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

export const Localidad = ( {localidad}) => {

   const { 
             dsclavelocalidad, dslocalidad, dscodigopostal,fechaRegistro,activo 
    } = localidad;
    const [idEliminar, setIdEliminar] = useState(0);
    const {  setShowModalDelete } = useContext(ModalContextDelete);
    const {  eliminar } = useContext(LocalidadesContext);
    const [objetoActualizar, setObjetoActualizar] = useState();

    const {  setShowModalUpdate } = useContext(ModalContextUpdate);

    const onSelect = (e) => {
        console.log(e);
        setShowModalUpdate(true);
        setObjetoActualizar(e);
    }
    
   
    const handleClickOpen = (e) => {
        setShowModalDelete(true);
        setIdEliminar(e.id);
    }

    const handleDeshabilitar = () => {
        eliminar(idEliminar);
        setShowModalDelete(false);
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
            <TableCell>{dsclavelocalidad}</TableCell >
            <TableCell>{dslocalidad}</TableCell >
            <TableCell>{dscodigopostal}</TableCell >
            <TableCell >{moment(fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
             <TableCell align="center">                                 
                <IconButton aria-label="create" onClick={() => onSelect(localidad)}>
                <CreateIcon/>
                </IconButton>
             </TableCell>
            <TableCell align="center">                                 
                <IconButton aria-label="create"  onClick={() => handleClickOpen(localidad)}>
                     {(localidad.activo)? <DeleteIcon/>:<RefreshIcon/>} 
                </IconButton>
            </TableCell> 
        </TableRow >
        <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />
        <ModalUpdate>
             <LocalidadEdit objetoActualizar={objetoActualizar} />
        </ModalUpdate>
        </>
    )
}
