
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
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { ProgramasEdit } from './ProgramasEdit';

import { useHistory } from 'react-router';



export const Programa = ({ programa }) => {
    let history = useHistory();
    const {
        dsprograma, dsclaveprograma,
        fcvigenciainicio, fcvigenciafin,
        fcregistrowebinicio, fcregistrowebfin,
        fcregistropresencialinicio, fcregistropresencialfin,
        dsdescripcion, dscriterioelegibilidad,
        activo
    } = programa;
    const [idEliminar, setIdEliminar] = useState('');
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const { eliminar, get } = useContext(ProgramasContext);
    const [objetoActualizar, setObjetoActualizar] = useState();

    const handleClickOpen = (e) => {
        setIdEliminar(e);
        console.log('handleClickOpen=>', e)
        console.log('handleClickOpen=>', e.id)
        setShowModalDelete(true);

    }

    const handleDeshabilitar = () => {
        console.log('eliminareliminar', idEliminar)
        eliminar(idEliminar);

        setShowModalDelete(false);
    }

    const onSelect = (e) => {
        console.log("on select del programa -->\n", e);
        console.log("id editar", e.id);
        setObjetoActualizar(e);
        //history.push(`/admin/editarPrograma/${e.id}`)
        history.push("/admin/editarPrograma", { mobNo: e.id })
    }


    return (
        <>
            < TableRow >
                <TableCell align="center">
                    {activo ? 'Activo' : 'Inactivo'}
                </TableCell>
                <TableCell align="center">{dsprograma}</TableCell>
                <TableCell align="center">{dsclaveprograma}</TableCell >
                <TableCell align="center">{moment(fcvigenciainicio).format("DD MMMM")} - {moment(fcvigenciafin).format(" DD MMMM YYYY")}</TableCell>
                <TableCell align="center">{moment(fcregistrowebinicio).format("DD MMMM")} - {moment(fcregistrowebfin).format(" DD MMMM YYYY")}</TableCell>
                <TableCell align="center">{moment(fcregistropresencialinicio).format("DD MMMM")} - {moment(fcregistropresencialfin).format(" DD MMMM YYYY")}</TableCell>


                <TableCell align="center">
                    <IconButton aria-label="create" onClick={() => onSelect(programa)}>

                        <CreateIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton aria-label="create" onClick={() => handleClickOpen(programa)}>
                        {(programa.activo) ? <BlockIcon /> : <BlockIcon />}
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
