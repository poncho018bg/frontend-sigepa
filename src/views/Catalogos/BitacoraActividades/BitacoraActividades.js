
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

import { useHistory } from 'react-router';
import { BtActividadesContext } from 'contexts/catalogos/BtActividadesContext';
export const BitacoraActividades = ( {bitacoraActividades}) => {
    let history = useHistory();
    const{id,fcfecharegistro,dsaccion}=bitacoraActividades;

    const { showModalDelete, setShowModalDelete } = useContext(ModalContextDelete);
    const { btActividadesList, getBtActividadesby } = useContext(BtActividadesContext);

    const [idEliminar, setIdEliminar] = useState(0);  
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



      return (
        <>
       < TableRow key={id}>          
                    
           <TableCell >{moment(fcfecharegistro).format("MM/DD/YYYY")}</TableCell>           
           <TableCell>{dsaccion}</TableCell >
          
       </TableRow >
       
          
       </>
   )
}