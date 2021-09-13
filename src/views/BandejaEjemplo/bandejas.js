import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
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
import TablePagination from "@material-ui/core/TablePagination"
import TextField from '@material-ui/core/TextField';

const baseUrl = process.env.REACT_APP_API_URL;


export default function BandejaExample() {

    const [bandejas, setBandejas] = useState([]);
    const [showBandeja, setShowBandeja] = useState([]);
    const [selectedIdBandeja, setSelectedIdBandeja] = useState([]);
    const [selectedEndPoint, setSelectedEndPoint] = useState([]);

    /**
     * consumimos el endpoint que trae todas las bandejas
     */
    const urlBandejas = baseUrl + 'tipoBandejas';

    useEffect(() => {
      

        const GetBandejas = async () => {
            
            try {
                const result = await axios({
                    method: 'get',
                    url: urlBandejas,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    }
                })

                setBandejas(result.data);
            } catch (error) {
                console.error('There was an error!', error);
                return Promise.reject(error)
            }


        }

        GetBandejas();
        console.log();
    }, [urlBandejas]);

    function clearState() {
        setShowBandeja(false);
        setSelectedIdBandeja(null);
    }

    function onCancel() {
        clearState();
    }

    function onSelect(idBandeja, endpoint) {
        clearState();
        setShowBandeja(true);
        setSelectedIdBandeja(idBandeja);
        setSelectedEndPoint(endpoint)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /**
     * retorna la vista de la tabla
     */
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>Bandejas</h4>
                        <strong>muestra todas las bandejas disponibles en el sistema</strong>
                    </CardHeader>
                    <CardBody>
                        <TableContainer>
                            <Table class="table table-striped" width="100%">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Fecha de Registros</TableCell>
                                        <TableCell align="center">Activo</TableCell>
                                        <TableCell align="center">Descripcion</TableCell>
                                        <TableCell align="center">EndPoint</TableCell>
                                        <TableCell align="center">Ver Bandeja</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        bandejas.map((b) => {
                                            return <TableRow>
                                                <TableCell align="center">{b.id}</TableCell>
                                                <TableCell align="center">{b.fechaRegistro}</TableCell>
                                                <TableCell align="center">{b.activo}</TableCell>
                                                <TableCell align="center">{b.descripcion}</TableCell>
                                                <TableCell align="center">{b.endPoint}</TableCell>
                                                <TableCell align="center">
                                                    <Button color='info' onClick={() => onSelect(b.id, b.endPoint)}>
                                                        Ver
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            </GridItem>
            {showBandeja === true &&
                <>
                    <GridItem xs={12} sm={12} md={12}>
                        <BandejaPersonalizada idBandeja={selectedIdBandeja} endPoint={selectedEndPoint} />
                    </GridItem>
                    <div align="right">
                        <Button
                            variant="contained"
                            color="danger"
                            size="small"
                            onClick={() => onCancel()}><Close />Cerrar</Button>
                    </div>
                </>
            }
        </GridContainer>
    );
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50%',
        },
    },
}));

/**
 * Muestra la construccion de la bandeja personalizada
 * @param { idBandeja, endPoint } props 
 * @returns 
 */
function BandejaPersonalizada(props) {
    
    const { idBandeja, endPoint } = props;
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    var respuesta = <div></div>
    const [bandeja, setBandeja] = useState([]);
    console.log()
    const urlConstruirBandeja = endPoint;
    
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

    useEffect(() => {
   
        const GetBandeja = async () => {
          
            try {
                const result = await axios({
                    method: 'get',
                    url: urlConstruirBandeja,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    }
                })

                setBandeja(result.data[0]);
                setRegistros(result.data);
            } catch (error) {
                console.error('There was an error!', error);
                return Promise.reject(error)
            }


        }

        GetBandeja();
        console.log();
    }, [urlConstruirBandeja]);

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <Card>
                    <CardHeader color="primary">
                        <h4>Bandeja</h4>
                        <strong>Se construyer la bandeja del sistema</strong>
                    </CardHeader>
                    <CardBody>
                        <TableContainer>
                            <Table class="table table-striped" width="100%">
                                <TableHead>
                                    <TableRow>
                                        {bandeja.map((b) => {
                                            return <TableCell align="center">
                                                {b.nombre}
                                            </TableCell>
                                        })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reg) => {
                                        return <TableRow>
                                            {
                                                reg.map((r) => {
                                                    if (r.accion) {
                                                        return <TableCell align="center">
                                                            <Tooltip title={r.acciones.tooltip}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className={classes.button}
                                                                    endIcon={<Icon>{r.acciones.icon}</Icon>}
                                                                    onClick={() => onSelect(r.acciones, reg)}
                                                                >
                                                                </Button>
                                                            </Tooltip>


                                                        </TableCell>
                                                    } else {
                                                        return <FormatoFechaTabla valor={r.valor} />
                                                       
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
            { verAccion === true &&
                <GridItem xs={12} sm={12} md={6}>
                    <AccionEndpoint acciones={accion} registro={registro} />
                </GridItem>
            }
        </GridContainer>
    );

    function FormatoFechaTabla(props) {
        const { valor } = props;
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("Valor de las fecha? ---> ", new Date(valor).toLocaleDateString([],options));
        var fecha = new Date(valor).toLocaleDateString([],options);
        if(fecha != 'Invalid Date'){
            console.log("fecha --> ", fecha);
            return (
            <TableCell align="center">{fecha}</TableCell>
            )
        }else{
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

    /**
     * Aqui se muestra la acción que deberia de hacer el boton
     */
    function AccionEndpoint(props) {
        const { acciones, registro } = props;
        var obj = JSON.parse(acciones.parametros);

       
        function formatDate() {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };

            return (
                <TextField
                    id="filled-basic"
                    label="Fecha de Registro"
                    variant="filled"
                    value={new Date(registro[3].valor).toLocaleDateString([], options)} />
            )
        }

        return (
            <Card>
                <CardHeader color="primary">
                    <h4>Registro de la tabla</h4>
                    <strong>Muestra el registro de la tabla</strong>
                </CardHeader>
                <CardBody>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="filled-basic"
                            label="ID"
                            variant="filled"
                            aria-readonly
                            value={registro[0].valor} />
                        <TextField
                            id="filled-basic"
                            label="Destinatario"
                            variant="filled"
                            value={registro[1].valor} />
                        <TextField
                            id="filled-basic"
                            label="Remitente"
                            variant="filled"
                            value={registro[2].valor} />
                        {formatDate()}
                        <TextField
                            id="filled-basic"
                            label="Monto"
                            variant="filled"
                            value={registro[4].valor} />
                        <Button>Guardar</Button>
                    </form>
                   
                </CardBody>
            </Card>
        )
    }
}