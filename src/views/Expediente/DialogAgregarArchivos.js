import 'date-fns';
import { DialogTitle, makeStyles, FormHelperText } from '@material-ui/core'
import axios from 'axios';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React, { useEffect, useState } from 'react';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
//import { expDigDocuments } from 'actions/expediente/expedienteAction';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import 'moment/locale/es';



const baseUrl = process.env.REACT_APP_API_EXPEDIENTE_URL;
const useStyles = makeStyles(styles);
moment.locale('es');

const initExpDig = {
    numHoja: '',
    fechaCreacion: moment().toDate(),
    subClasificacion: '',
    nombreDoc: '',
    fechaDocumento: moment().toDate(),
    observaciones: ''

}

const dataModel = {
    id: '',
    dsruta: '',
    dsmime: '',
    dsnombredocumento: '',
    dsobservaciones: '',
    fcfechadocumento: '',
    llexpedienteboveda: 0,
    nohoja: 0,
    nohojapdf: 0,
    idEtapa: '',
    idTipoDocumento: '',
    document: ''

}
export const DialogAgregarArchivos = (props, { etapaSeleccionada }) => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState(initExpDig);
    const { activeExpDig } = useSelector(state => state.expDig);
    const dispatch = useDispatch();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [selectedDate, setSelectedDate] = React.useState(moment().toDate());
    const [numHojas, setNumHojas] = useState();
    const [etapasHija, setEtapasHija] = useState([]);
    const [estapaHi, setEstapaHi] = React.useState('');
    const [nombreDocs, setNombreDocs] = useState();
    const [errors, setErrors] = useState({});
    const [observaciones, setObservaciones] = useState();
    const urlEndpointNumHojas = baseUrl + `/documentosExpediente/obtenerUltimaHoja/`;
    const urlEndpointEtapasHija = baseUrl + `/etapas/etapasPadre/`;
    const urlEndpointTipoDoc = baseUrl + `/etapas/etapasDocumentosByEtapa/`;
    const [tipoDocument, setTipoDocument] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [bas64, setBas64] = useState();
    const formData = new FormData();
    const [etapaHija, setEtapaHija] = useState();
    const [msjConfirmacion, setMsjConfirmacion] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState(false);



    useEffect(() => {


        if (props.etapaSeleccionada != undefined) {
            setEtapaHija(props.etapaSeleccionada);

            const GetNumHojas = async () => {
                try {
                    const result = await axios({
                        method: 'get',
                        url: urlEndpointNumHojas + props.idExpediente,
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        }
                    })
                    setNumHojas(result.data + 1);
                    initExpDig.numHoja = result.data + 1;
                } catch (error) {
                    console.error('There was an error!', error);
                    return Promise.reject(error)
                }
            }

            const GetSubEtapas = async () => {

                try {
                    const result = await axios({
                        method: 'get',
                        url: urlEndpointEtapasHija + props.etapaSeleccionada.idEtapa,
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        }
                    })

                    setEtapasHija(result.data);
                } catch (error) {
                    console.error('There was an error!', error);
                    return Promise.reject(error)
                }


            }
            GetNumHojas();
            GetSubEtapas();
        }



    }, [props.showDialogForm])

    useEffect(() => {
        if (activeExpDig) {
            setFormValues(activeExpDig);
        } else {
            setFormValues(initExpDig);
            initvalues();
        }









    }, [props.showDialogForm]);

    const initvalues = () =>{
        setEstapaHi('');
        setNombreDocs('');
        setObservaciones();
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleClose = () => {
        props.setShowDialogForm(false);
        setFormValues(initExpDig);
    }




    const handleDateChange = (date) => {
        setSelectedDate(date);
        initExpDig.fechaDocumento = date
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value);
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const GetTipoDocumento = async (eHija) => {
        console.log('Etapa hija =>', eHija)
        try {
            const result = await axios({
                method: 'get',
                url: urlEndpointTipoDoc + eHija,
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                }
            })

            setTipoDocument(result.data);
            console.log('TIPO DOC =>', tipoDocument)
        } catch (error) {
            console.error('There was an error!', error);
            return Promise.reject(error)
        }
    }

    const handleChangeEtapa = (event) => {
        setEstapaHi(event.target.value);
        initExpDig.subClasificacion = event.target.value
        GetTipoDocumento(event.target.value)

    };

    const handleInputNombre = (event) => {
        setNombreDocs(event.target.value);
        initExpDig.nombreDoc = event.target.value
    };


    const handleChangeObservaciones = (event) => {
        setObservaciones(event.target.value);
        initExpDig.observaciones = event.target.value
    };

    const onFileUpload = () => {
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        var rd = JSON.stringify(reader.readAsDataURL(selectedFile));
        setBas64(reader.result)


    }

    const handleChangeFileAdd = (event) => {

        const errors = {};
        if (event.target.files[0].type == tipoDocument.extension) {
            setSelectedFile(event.target.files[0])
            setErrors(errors);

            setBas64(event.target.files[0]);


            formData.append('file', event.target.files[0])

        } else {
            setSelectedFile(null)
            errors.selectedFile = "El tipo de archivo requerido es " + tipoDocument.extension;
            console.log('archivo invalido', event.target.files[0].type, tipoDocument.extension)
            if (!isObjEmpty(errors)) {
                setErrors(errors);
                console.log(errors);
                return;
            }

        }



    }

    const isObjEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    const handleAgregar = (e) => {
        e.preventDefault();
        const errors = {};




        if (initExpDig.subClasificacion == '') {
            errors.subClasificacion = "Subclasificación es requerido";
            console.log("Subclasificación es requerido");
        }

        if (initExpDig.nombreDoc == '') {
            errors.nombreDoc = "Nombre del documento es requerido";
            console.log("Nombre del documento es requerido");
        }

        if (initExpDig.fechaDocumento == '') {
            errors.fechaDocumento = "Fecha de documento es requerido";
            console.log("Fecha de documento es requerido");
        }

        if (initExpDig.observaciones == '') {
            errors.observaciones = "Observaciones es requerido";
            console.log("Observaciones es requerido");
        }




        console.log(initExpDig);
        if (!isObjEmpty(errors)) {
            setErrors(errors);
            console.log(errors);
            return;
        }

        //llamar metodo para agregar file



        dataModel.id = null,
            dataModel.dsruta = '',
            dataModel.idExpediente = props.idExpediente
        dataModel.dsmime = tipoDocument.extension,
            dataModel.dsnombredocumento = initExpDig.nombreDoc,
            dataModel.dsobservaciones = initExpDig.observaciones,
            dataModel.fcfechadocumento = initExpDig.fechaDocumento,
            dataModel.llexpedienteboveda = null,
            dataModel.nohoja = numHojas,
            dataModel.nohojapdf = 0,
            dataModel.idTipoDocumento = tipoDocument.id,
            dataModel.idEtapa = initExpDig.subClasificacion
        dataModel.document = ''

     //   dispatch(expDigDocuments(dataModel, bas64));

        props.setShowDialogForm(false);
        setFormValues(initExpDig);
    }



    return (
        <>
            <Dialog
                classes={{ paper: classes.paper }}
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                aria-labelledby="customized-dialog-title"
                open={props.showDialogForm}
            > <form onSubmit={handleAgregar}>

                    <DialogTitle id="form-dialog-title">Registrar Información de expediente </DialogTitle>
                    <DialogContent>
                        <TextField disabled id="numHoja" label="Número de hoja" defaultValue={numHojas} fullWidth />
                    </DialogContent>

                    <DialogContent>
                        <TextField disabled id="fechaCreacion" label="Fecha de creación" defaultValue={moment(initExpDig.fechaCreacion).format("DD MMMM YYYY, h:mm:ss a")} fullWidth />
                    </DialogContent>

                    <DialogContent>



                        <TextField
                            variant="outlined"
                            label="Sub clasificación"
                            select
                            fullWidth
                            name="subClasificacion"
                            error={errors.subClasificacion}
                            value={estapaHi}
                            onChange={handleChangeEtapa}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {
                                etapasHija.map(
                                    item => (<MenuItem key={item.idEtapa} value={item.idEtapa}>{item.dsetapa}</MenuItem>)
                                )
                            }

                        </TextField>


                        {errors.subClasificacion && <FormHelperText error={errors.subClasificacion}>{errors.subClasificacion}</FormHelperText>}

                    </DialogContent>


                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="nombreDoc"
                            label="Nombre de documento"
                            type="text"
                            name="nombreDoc"
                            value={nombreDocs}
                            error={errors.nombreDoc}
                            onChange={handleInputNombre}
                            fullWidth
                        />
                        {errors.nombreDoc && <FormHelperText error={errors.nombreDoc}>{errors.nombreDoc}</FormHelperText>}
                    </DialogContent>
                    <DialogContent>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MMMM/dd/yyyy"
                                margin="normal"
                                fullWidth
                                id="date-picker-inline"
                                label="Fecha de documento"
                                value={selectedDate}
                                error={errors.fechaDocumento}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        {errors.fechaDocumento && <FormHelperText error={errors.fechaDocumento}>{errors.fechaDocumento}</FormHelperText>}
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            id="outlined-multiline-static"
                            label="Observaciones"
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="outlined"
                            fullWidth
                            value={observaciones}
                            error={errors.observaciones}
                            onChange={handleChangeObservaciones}
                        />
                        {errors.observaciones && <FormHelperText error={errors.observaciones}>{errors.observaciones}</FormHelperText>}
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="fileUp"
                            label="Subir archivos"
                            type="file"
                            name="fileUp"

                            error={errors.selectedFile}
                            onChange={handleChangeFileAdd}
                            fullWidth
                        />
                        {errors.selectedFile && <FormHelperText error={errors.selectedFile}>{errors.selectedFile}</FormHelperText>}


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
            </Button>
                        <Button type="submit" color="primary">
                            {(activeExpDig) ? 'Guardar' : 'Agregar'}
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>

         

        </>
    )

}
