import React, { useContext, useState, useEffect } from "react";


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import Close from "@material-ui/icons/Close";
import TextField from '@material-ui/core/TextField';
import { BeneficiariosContext } from "contexts/BeneficiariosContext";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TablePagination } from "@material-ui/core";
import { MotivoRechazosContext } from "contexts/catalogos/motivoRechazosContext";
import { Mensaje } from "components/Personalizados/Mensaje";
import { BandejaRechazosContext } from "contexts/BandejaRechazosContext";
import { useTranslation } from 'react-i18next';

export const BandejaPersonalizada = (props) => {

    const { nombre, curp, idPrograma, idTipoApoyo, anio, idMotivoBaja } = props;
    const { t } = useTranslation();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const { padronList, getPadronBeneficiarios, getDetalleBeneficiarios, beneficiariaList } = useContext(BeneficiariosContext);
    const { motivoRechazosList, getMotivoRechazosActivos } = useContext(MotivoRechazosContext);   
    const { registrarBandejaRechazos } = useContext(BandejaRechazosContext);
    const [bandeja, setBandeja] = useState([]);
    const [llMotivoBaja, setLlMotivoBaja] = useState('');
    const [dsMotivoBaja, setDsMotivoBaja] = useState('');
    const [idMvBandejaSol, setIdMvBandejaSol] = useState('');
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [open, setOpen] = React.useState(false);

    const [registros, setRegistros] = useState([]);

    const [verAccion, setVerAccion] = useState([]);
    const [registro, setRegistro] = useState([]);
    const [accion, setAccion] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        getMotivoRechazosActivos()

    }, []);

    const cambiarMotivoBaja = (row, dta) => {
        setOpen(true);
        let rowJson = JSON.parse(row)
      console.log('row=>',rowJson.idMvBandejaSol)
        setLlMotivoBaja(dta)
        setIdMvBandejaSol(rowJson.idMvBandejaSol)
        padronList.map(e => {
            if (e.id === rowJson.id) {
                e.idMotivoBaja = dta
                e.activo = true
            }
        })


    }

    useEffect(() => {


        let solcitudFilter = {
            'nombrebeneficiario': nombre === '' ? 'NULL' : nombre,
            'curp': curp === '' ? 'NULL' : curp,
            'idPrograma': idPrograma === '' ? 'NULL' : idPrograma,
            'idTipoApoyo': idTipoApoyo === '' ? 'NULL' : idTipoApoyo,
            'anioPrograma': anio === '' ? 'NULL' : anio,
            'motivoRechazo': idMotivoBaja === '' ? 'NULL' : idMotivoBaja
        }
        console.log('solcitudFilter', solcitudFilter)

        getPadronBeneficiarios(solcitudFilter);


    }, [nombre, curp, idPrograma, idTipoApoyo, anio, idMotivoBaja]);


    const redirectRegister = () => {


        let bandejaRechz = {
            'dsobservaciones': dsMotivoBaja,
            'motivo_rechazo_id': llMotivoBaja,
            'mv_bandeja_id': `${idMvBandejaSol}`
        }

        registrarBandejaRechazos(bandejaRechz).then(response => {
            setOpenSnackbar(true);

            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {

                setError(false);
                setOpen(false);

            }, 1500);
            return () => clearTimeout(timer);
        })
            .catch(err => {
                console.log('err', err)
                setOpenSnackbar(true);
                setError(true);
                setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
            });
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>

                    <CardBody>
                        <TableContainer>
                            <Table class="table table-striped" width="100%">
                                <TableHead>
                                    <TableRow>
                                        {padronList[0]?.map((b) => {
                                            return <TableCell align="center">
                                                {b.nombreColumna}
                                            </TableCell>
                                        })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {padronList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reg) => {
                                        return <TableRow>
                                            {
                                                reg.map((r) => {
                                                    if (r.isBoAccion) {
                                                        return <TableCell align="center">


                                                            {console.log('1', r.accionColumna)}
                                                            {console.log('2', r.accionColumna.parametros)}

                                                            <TextField
                                                                variant="outlined"
                                                                label="Seleccione"
                                                                select
                                                                disabled={r.accionColumna.parametros.activo}
                                                                fullWidth
                                                                name={r.accionColumna.parametros.idMotivoBaja}
                                                                value={r.accionColumna.parametros.idMotivoBaja}
                                                                onChange={(e) => cambiarMotivoBaja(r.accionColumna.parametros, e.target.value)}

                                                            >
                                                                <MenuItem value="0">
                                                                    <em>Ninguno</em>
                                                                </MenuItem>
                                                                {
                                                                    motivoRechazosList.map(
                                                                        item => (
                                                                            <MenuItem
                                                                                key={item.id}
                                                                                value={item.id}>
                                                                                {item.dsmotivorechazo}
                                                                            </MenuItem>
                                                                        )
                                                                    )
                                                                }
                                                            </TextField>





                                                        </TableCell>
                                                    } else {
                                                        return <FormatoFechaTabla valor={r.valorColumna} />

                                                    }


                                                })


                                            }
                                        </TableRow>
                                    })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        < TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={registros.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </CardBody>
                </Card>
            </GridItem>
            <Mensaje
                setOpen={setOpenSnackbar}
                open={openSnackbar}
                severity={error ? "error" : "success"}
                message={msjConfirmacion}
            />


            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg" fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                    <h2> Motivo de baja </h2>
                </DialogTitle>
                <DialogContent >
                    <DialogContent >
                        <TextField
                            id="dsMotivoBaja"
                            label="Motivo de baja"
                            variant="outlined"
                            fullWidth
                            name={dsMotivoBaja}
                            fullWidth
                            value={dsMotivoBaja}
                            onChange={(e) => setDsMotivoBaja(e.target.value)}
                        />

                    </DialogContent>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => redirectRegister()} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

        </GridContainer>
    );

    function FormatoFechaTabla(props) {
        const { valor } = props;
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("Valor de las fecha? ---> ", new Date(valor).toLocaleDateString([], options));
        var fecha = new Date(valor).toLocaleDateString([], options);
        if (fecha != 'Invalid Date') {
            console.log("fecha --> ", fecha);
            return (
                <TableCell align="center">{fecha}</TableCell>
            )
        } else {
            console.log("no fecha")
            return (
                <TableCell align="center">{valor}</TableCell>
            )
        }
    }

    function onSelect(acciones, registros) {
        clearState();
        setVerAccion(true);
        setRegistro(registros);
        setAccion(acciones);
    }

    function clearState() {
        setVerAccion(false);
        setRegistro(null);
        setAccion(null);
    }


}