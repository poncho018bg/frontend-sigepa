
import React, { useContext, useState } from 'react'

import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { ModalUpdate } from 'commons/ModalUpdate';
import { LocalidadEdit } from './LocalidadEdit';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { DialogDelete } from 'views/Dialogs/DialogDelete';
import { useTranslation } from 'react-i18next';
export const Localidad = ({ localidad }) => {
    const { t } = useTranslation();
    const {
        dsclavelocalidad, dslocalidad, dscodigopostal, fechaRegistro, activo
    } = localidad;
    const [idEliminar, setIdEliminar] = useState();

    const { eliminar } = useContext(LocalidadesContext);
    const [objetoActualizar, setObjetoActualizar] = useState();
    const [error] = useState(false);
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
        setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
    }

    return (
        <>
            < TableRow >
                <TableCell align="center">
                    {activo === true ? 'Activo':'Inactivo'}
                </TableCell>
                <TableCell align="center">{dsclavelocalidad}</TableCell >
                <TableCell align="center">{dslocalidad}</TableCell >
                <TableCell align="center">{dscodigopostal}</TableCell >
                <TableCell align="center">{moment(fechaRegistro).format("MMMM DD YYYY, h:mm:ss a")}</TableCell>
                <TableCell align="center">
                    <IconButton aria-label="create" onClick={() => onSelect(localidad)}>
                        <CreateIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton aria-label="create" onClick={() => handleClickOpen(localidad)}>
                    <BlockIcon />
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
