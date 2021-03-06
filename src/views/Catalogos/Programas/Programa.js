
import React, { useContext, useState } from 'react'

import { TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';


import { useHistory } from 'react-router';



export const Programa = ({  programa }) => {
    let history = useHistory();
    const {
        id,
        dsprograma, dsclaveprograma,
        fcvigenciainicio, fcvigenciafin,
        fcregistrowebinicio, fcregistrowebfin,
        fcregistropresencialinicio, fcregistropresencialfin,
        
        activo
    } = programa;
    const [idEliminar, setIdEliminar] = useState();
    const { setShowModalDelete } = useContext(ModalContextDelete);
    const { eliminar} = useContext(ProgramasContext);
    const [ setObjetoActualizar] = useState();

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




        </>
    )
}
