
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



export const Programa = ({  programa }) => {
    let history = useHistory();
    const {
        id,
        dsprograma, dsclaveprograma,
        fcvigenciainicio, fcvigenciafin,
        fcregistrowebinicio, fcregistrowebfin,
        fcregistropresencialinicio, fcregistropresencialfin,
        dsdescripcion, dscriterioelegibilidad,
        activo
    } = programa;
    const [idEliminar, setIdEliminar] = useState();
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const { eliminar, get } = useContext(ProgramasContext);
    const [objetoActualizar, setObjetoActualizar] = useState();

    const onClick = programa => {
        setShowModalDelete(true);
        console.log("seleccionado ", programa.id);
        setIdEliminar(programa.id);
    }

    const handleDeshabilitar = () => {
        setShowModalDelete(false);
        console.log('entro el deshabilitar idEliminar ---->', idEliminar);
        eliminar(idEliminar);
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
            < TableRow key={id} >
                <TableCell align="center">
                    {activo ? 'Activo' : 'Inactivo'}
                </TableCell>
                <TableCell align="center">{id} {dsprograma}</TableCell>
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
                    <IconButton
                        name="deshabilitar"
                        aria-label="create"
                        onClick={() => onClick(programa)}>
                        <BlockIcon />
                    </IconButton>
                </TableCell>
            </TableRow >
            <ModalDelete
                handleDeshabilitar={handleDeshabilitar}
            />


            {/*
            <ProgramasEdit objetoActualizar={objetoActualizar} />
*/}

        </>
    )
}
