
import React, { useContext, useState } from 'react'

import Checkbox from '@material-ui/core/Checkbox';
import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import RefreshIcon from '@material-ui/icons/Refresh';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalUpdate } from 'commons/ModalUpdate';
import { LocalidadEdit } from './LocalidadEdit';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { DialogDelete } from 'views/Dialogs/DialogDelete';

export const Localidad = ({ localidad }) => {

    const {
        dsclavelocalidad, dslocalidad, dscodigopostal, fechaRegistro, activo
    } = localidad;
    const [idEliminar, setIdEliminar] = useState();

    const { eliminar } = useContext(LocalidadesContext);
    const [objetoActualizar, setObjetoActualizar] = useState();
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const { setShowModalUpdate } = useContext(ModalContextUpdate);

    const onSelect = (e) => {
        console.log(e);
        setShowModalUpdate(true);
        setObjetoActualizar(e);
        
    }


    const handleClickOpen = (e) => {
        console.log(e)
        setIdEliminar(e);
        setOpenDialog(true);
    }

    const handleDeshabilitar = () => {
        eliminar(idEliminar);
        
        setOpenDialog(false);
        setOpenSnackbar(true);
        setMsjConfirmacion(`El registro ha sido inhabilitado exitosamente`);
    }

    return (
        <>
            < TableRow >
                <TableCell>
                    {activo === true ? 'Activo':'Inactivo'}
                </TableCell>
                <TableCell>{dsclavelocalidad}</TableCell >
                <TableCell>{dslocalidad}</TableCell >
                <TableCell>{dscodigopostal}</TableCell >
                <TableCell >{moment(fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                <TableCell align="center">
                    <IconButton aria-label="create" onClick={() => onSelect(localidad)}>
                        <CreateIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton aria-label="create" onClick={() => handleClickOpen(localidad)}>
                        {(localidad.activo) ? <BlockIcon /> : <BlockIcon />}
                    </IconButton>
                </TableCell>
            </TableRow >


            <DialogDelete
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                handleDeshabilitar={handleDeshabilitar}
            />

            <ModalUpdate>
                <LocalidadEdit objetoActualizar={objetoActualizar} />
            </ModalUpdate>

      
            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />
        </>
    )
}
