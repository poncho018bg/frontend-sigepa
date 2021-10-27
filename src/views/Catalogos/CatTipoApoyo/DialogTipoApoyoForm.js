
import { Accordion, AccordionDetails, AccordionSummary, Checkbox,  FormControlLabel,  FormHelperText, FormLabel, Grid,      makeStyles, MenuItem,  Radio, RadioGroup,  TextField } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react';
import Button from "components/CustomButtons/Button.js";
import { useSelector } from 'react-redux';
import { stylesArchivo } from 'css/stylesArchivo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import moment from 'moment';
import 'moment/locale/es';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { NumeroApoyosContext } from 'contexts/catalogos/numeroApoyosContext';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';
import { MultiSelect } from "react-multi-select-component";
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { ApoyoContext } from 'contexts/catalogos/ApoyoContext';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { useHistory } from "react-router";
const useStyles = makeStyles(stylesArchivo);

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "./styles.css";
import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { ModalContext } from 'contexts/modalContex';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }
  


export const DialogTipoApoyoForm = (props) => {
    const { t } = useTranslation();
    /**
     * estaba el dispatch
     */
    const classes = useStyles();
    const { tipoApoyoEditar } = useSelector(state => state.tipoApoyo);
    const { getTiposApoyos, tiposApoyosList } = useContext(TiposApoyosContext);

    const { getPeriodicidadApoyos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);
    const { programasList, get } = useContext(ProgramasContext);
    const { apoyoservicioList, getApoyoServicio } = useContext(ApoyoServicioContext);
    const { numeroApoyosList, getNumeroApoyos } = useContext(NumeroApoyosContext);

    const { actividadescontinuarList, getActividadesContinuar } = useContext(ActividadesContinuarContext)
    const { registrarApoyo } = useContext(ApoyoContext)


  
    const [tipoApoyoSelect, setTipoApoyoSelect] = React.useState([]);
    const [actividadesContinuarSelect, setActividadesContinuarSelect] = React.useState([]);


    let history = useHistory();



    const { setShowModal } = useContext(ModalContext);
    const [valores, setValores] = useState();
    const [selectedTipApoy, setSelectedTipApoy] = useState([]);
    const [selectedActividadesContinuar, setSelectedActividadesContinuar] = useState([]);
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    const [disabledCalendar, setDisabledCalendar] = useState(true);



    /**
     * abre el dialogo de confirmación
     * @param {valores} e 
     */
    const confirmacionDialog = (e) => {
        setShowModalConfirmacion(true);
        setValores(e)
    }


    useEffect(() => {
        getTiposApoyos();
        getActividadesContinuar();
        getPeriodicidadApoyos();
        get();
        getNumeroApoyos();
        getApoyoServicio();


    }, []);






    useEffect(() => {
        const lsttipAp = []
        tiposApoyosList.map((mn) => {
            lsttipAp.push({ label: mn.dstipoapoyo, value: mn.id })
        })
        setTipoApoyoSelect(lsttipAp)
    }, [tiposApoyosList]);

    useEffect(() => {
        const lstActividades = []
        actividadescontinuarList.map((mn) => {
            lstActividades.push({ label: mn.dsactividadcontinuidad, value: mn.id })
        })
        setActividadesContinuarSelect(lstActividades)
    }, [actividadescontinuarList]);

    function parseSelect(params) {
        const nombrs = []
        params.map((mp) => {
            var modules2 = tiposApoyosList.filter(word => word.id === mp);
            nombrs.push(modules2[0].dstipoapoyo)
        })
        return nombrs
    }

    const agregarServicioFormik = (value, index) => () => {
        const serv = {
            id: value.id,
            fechaInicio: '',
            fechaFin: ''
        }
        formik.values.enServicio[index] = serv
        console.log('agregarServicioFormik 1=>', formik.values.enServicio)
    }

    const formik = useFormik({
        initialValues: {
            dsapoyo: '',
            idPrograma: '',
            dsdescripcion: '',
            estatus: '',
            visita: false,
            idTipoApoyo: [],
            fcvigenciainicio: moment(new Date()).format("yyyy-MM-DD"),
            fcvigenciafin: moment(new Date()).format("yyyy-MM-DD"),
            cantidadPesos: '',
            enServicio: [],
            descApoyoEspecie: '',
            idPeriodicidad: '',
            observaciones: '',
            formaEntrega: false,
            numEntregas: '',
            idActividadContinuidadApoyo: '',
            idEstado: '',
            numApoyos: ''
        },
        validationSchema: Yup.object({
            dsapoyo: Yup.string()
                .required('El nombre del apoyo es obligatorio'),
            idPrograma: Yup.string()
                .required('El programa es obligatorio'),
            dsdescripcion: Yup.string()
                .required('La descripción obligatorio'),
            estatus: Yup.string()
                .required('El estatus es obligatorio'),
            fcvigenciainicio: Yup.string()
                .required('La vigencia desde obligatorio'),
            fcvigenciafin: Yup.string()
                .required('La vigencia hasta es obligatorio'),
            descApoyoEspecie: Yup.string()
                .required('El apoyo en especie es obligatorio'),
            idPeriodicidad: Yup.string()
                .required('La periodicidad es obligatorio'),
            formaEntrega: Yup.string()
                .required('La forma de entrega es obligatorio'),
            numEntregas: Yup.string()
                .required('El número de entrega es obligatorio'),

        }),

        onSubmit: async valores => {
            confirmacionDialog(valores);

        }
    })

    const handleRegistrar = () => {

        const { dsapoyo, idPrograma, dsdescripcion, estatus, visita, fcvigenciainicio, fcvigenciafin,
            cantidadPesos, enServicio,
            descApoyoEspecie, idPeriodicidad, observaciones, formaEntrega, numEntregas, numApoyos
        } = valores
        let nuevoApoyo = {
            dsapoyo: dsapoyo,
            idPrograma: idPrograma,
            dsdescripcion: dsdescripcion,
            estatus: estatus,
            visita: visita,
            idTipoApoyo: selectedTipApoy,
            fcvigenciainicio: fcvigenciainicio,
            fcvigenciafin: fcvigenciafin,
            cantidadPesos: cantidadPesos,
            enServicio: enServicio,
            descApoyoEspecie: descApoyoEspecie,
            idPeriodicidad: idPeriodicidad,
            observaciones: observaciones,
            formaEntrega: formaEntrega,
            numEntregas: numEntregas,
            idActividadContinuidadApoyo: selectedActividadesContinuar,
            idEstado: 'a3de85a7-6c23-46a4-847b-d79b3a90963d',
            numApoyos: numApoyos

        }


        registrarApoyo(nuevoApoyo).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);

            const timer = setTimeout(() => {
                setError(false);
                setShowModalConfirmacion(false);
                setShowModal(false);
                history.push("/admin/catapoyoservicio")

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        });

    }



    return (
        <Card>
            <form onSubmit={formik.handleSubmit}>
                <CardHeader color="primary">{(tipoApoyoEditar) ? 'Editar Tipo de apoyo' : 'Alta Tipo de apoyo'} </CardHeader>
                {console.log('ERRORES=>', formik.errors)}
                <CardBody>
                    <TextField
                        id="dsapoyo"
                        label="Nombre del Tipo de apoyo"
                        variant="outlined"
                        name="dsapoyo"
                        value={formik.values.dsapoyo}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 500 }} />

                    {formik.touched.dsapoyo && formik.errors.dsapoyo ? (
                        <FormHelperText error={formik.errors.dsapoyo}>{formik.errors.dsapoyo}</FormHelperText>
                    ) : null}
                </CardBody>
                <CardBody>
                    <TextField
                        variant="outlined"
                        label="Selecciona un programa"
                        select
                        fullWidth
                        name="idPrograma"
                        value={formik.values.idPrograma}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>{t('cmb.ninguno')}</em>
                        </MenuItem>
                        {
                            programasList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsclaveprograma} - {item.dsprograma}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idPrograma && formik.errors.idPrograma ? (
                        <FormHelperText error={formik.errors.idPrograma}>{formik.errors.idPrograma}</FormHelperText>
                    ) : null}
                </CardBody>
                <CardBody>

                    <TextField
                        id="dsdescripcion"
                        label="Descripción del Tipo de apoyo"
                        variant="outlined"
                        name="dsdescripcion"
                        value={formik.values.dsdescripcion}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 300 }}
                    />

                    {formik.touched.dsdescripcion && formik.errors.dsdescripcion ? (
                        <FormHelperText error={formik.errors.dsdescripcion}>{formik.errors.dsdescripcion}</FormHelperText>
                    ) : null}
                </CardBody>

                <CardBody>
                    <FormLabel component="legend">Estatus </FormLabel>
                    <RadioGroup row aria-label="position" defaultValue="top" value={formik.values.estatus} onChange={formik.handleChange} >
                        <FormControlLabel name="estatus" value="true" control={<Radio color="primary" />} label="Activo" />
                        <FormControlLabel name="estatus" value="false" control={<Radio color="primary" />} label="Inactivo" />
                    </RadioGroup>
                </CardBody>


                {/* FECHA VIGENCIA */}
                <CardBody>
                    <div><FormLabel component="legend">Vigencia del apoyo </FormLabel></div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                id="fcvigenciainicio"
                                label="Desde"
                                type="date"
                                fullWidth
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcvigenciainicio}
                                name="fcvigenciainicio"
                                onClick={(e)=> setDisabledCalendar(false)}
                                onChange={formik.handleChange}
                                InputProps={{
                                    inputProps: {
                                        min: moment(new Date()).format("yyyy-MM-DD")
                                    }
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>

                            <TextField
                                id="fcvigenciafin"
                                label="Hasta"
                                type="date"
                                fullWidth
                                disabled={disabledCalendar}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formik.values.fcvigenciafin}
                                name="fcvigenciafin"
                                onChange={formik.handleChange}
                                InputProps={{
                                    inputProps: {
                                        min: formik.values.fcvigenciainicio
                                    }
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </CardBody>




                <CardBody>
                    <FormLabel component="legend">Selecciona un tipo de apoyo</FormLabel>
                    <MultiSelect

                        options={tipoApoyoSelect}
                        value={selectedTipApoy}
                        onChange={setSelectedTipApoy}
                        labelledBy="Seleccionar"

                    />

                </CardBody>
                <CardBody>
             
                    <TextField
                        label="Cantidad en pesos"
                        value={formik.values.cantidadPesos}
                        onChange={formik.handleChange}
                        name="cantidadPesos"
                        id="formatted-numberformat-input"
                        fullWidth
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                            maxLength:7
                        }}
                        
                    />
                    {formik.touched.cantidadPesos && formik.errors.cantidadPesos ? (
                        <FormHelperText error={formik.errors.cantidadPesos}>{formik.errors.cantidadPesos}</FormHelperText>
                    ) : null}

                </CardBody>
                <CardBody>
                    <TextField
                        id="descApoyoEspecie"
                        label=" Descripción del apoyo en especie"
                        variant="outlined"
                        name="descApoyoEspecie"
                        value={formik.values.descApoyoEspecie}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />

                    {formik.touched.descApoyoEspecie && formik.errors.descApoyoEspecie ? (
                        <FormHelperText error={formik.errors.descApoyoEspecie}>{formik.errors.descApoyoEspecie}</FormHelperText>
                    ) : null}
                </CardBody>

                <CardBody>
                    {
                        apoyoservicioList.map((apyo, i) => {
                            const fechaInicioq = `enServicio[${i}].fechaInicio`;
                            const fechaFinq = `enServicio[${i}].fechaFin`;

                            return (
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={agregarServicioFormik(apyo, i)}
                                            control={<Checkbox />}
                                            label={apyo.dsservicio}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <CardBody>
                                            <div><FormLabel component="legend">Vigencia</FormLabel></div>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>

                                                    <TextField
                                                        label="Desde"
                                                        type="date"
                                                        fullWidth
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        name={fechaInicioq}
                                                        value={formik.values.enServicio.fechaInicio}
                                                        onChange={formik.handleChange}

                                                    />
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <TextField
                                                        label="Hasta"
                                                        type="date"
                                                        fullWidth
                                                        className={classes.textField}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        name={fechaFinq}
                                                        value={formik.values.enServicio.fechaFin}
                                                        onChange={formik.handleChange}

                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>

                                    </AccordionDetails>
                                </Accordion>
                            )


                        })
                    }
                </CardBody>
                <CardBody>
                    <FormLabel component="legend">Requiere Visita Obligatoria</FormLabel>
                    <RadioGroup row aria-label="position" defaultValue="top" value={formik.values.visita} onChange={formik.handleChange} >
                        <FormControlLabel name="visita" value="true" control={<Radio color="primary" />} label="SÍ" />
                        <FormControlLabel name="visita" value="false" control={<Radio color="primary" />} label="NO" />
                    </RadioGroup>
                </CardBody>




                <CardBody>
                    <TextField
                        variant="outlined"
                        label="Entregar el apoyo"
                        select
                        fullWidth
                        name="idPeriodicidad"
                        value={formik.values.idPeriodicidad}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="0">
                            <em>{t('cmb.ninguno')}</em>
                        </MenuItem>
                        {
                            periodicidadApoyosList.map(
                                item => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.dsperiodicidad}
                                    </MenuItem>
                                )
                            )
                        }

                    </TextField>
                    {formik.touched.idPeriodicidad && formik.errors.idPeriodicidad ? (
                        <FormHelperText error={formik.errors.idPeriodicidad}>{formik.errors.idPeriodicidad}</FormHelperText>
                    ) : null}
                </CardBody>

                <CardBody>

                    <FormControlLabel
                        control={<Checkbox value={true} onChange={formik.handleChange} name="formaEntrega" />}
                        label="Forma de entrega de apoyo por exhibición"
                    />
                </CardBody>



                <CardBody >

                    {

                        formik.values.formaEntrega ? (<TextField
                            variant="outlined"
                            label="Número de entrega de Apoyos"
                            select

                            fullWidth
                            name="numEntregas"
                            value={formik.values.numEntregas}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="0">
                                <em>{t('cmb.ninguno')}</em>
                            </MenuItem>
                            {
                                numeroApoyosList.map(
                                    item => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}>
                                            {item.noapoyo}
                                        </MenuItem>
                                    )
                                )
                            }

                        </TextField>) : (<></>)
                    }



                    {formik.touched.numEntregas && formik.errors.numEntregas ? (
                        <FormHelperText error={formik.errors.numEntregas}>{formik.errors.numEntregas}</FormHelperText>
                    ) : null}
                </CardBody>






                <CardBody >
                    <FormLabel component="legend">Selecciona actividades por realizar para continuar con el apoyo </FormLabel>
                    <MultiSelect

                        options={actividadesContinuarSelect}
                        value={selectedActividadesContinuar}
                        onChange={setSelectedActividadesContinuar}
                        labelledBy="Seleccionar"
                    />


                </CardBody>

                <CardBody>
                    <TextField
                        id="outlined-multiline-static"
                        label="Observaciones"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="observaciones"
                        value={formik.values.observaciones}
                        onChange={formik.handleChange}
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                    />

                </CardBody>

                <CardBody >
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" type='submit'>
                            {t('btn.guardar')}
                        </Button>
                    </Grid>
                </CardBody>

                <ModalConfirmacion
                    handleRegistrar={handleRegistrar} evento="Registrar"
                />

                <Mensaje
                    setOpen={setOpenSnackbar}
                    open={openSnackbar}
                    severity={error ? "error" : "success"}
                    message={msjConfirmacion}
                />

            </form>
        </Card>

    )

}