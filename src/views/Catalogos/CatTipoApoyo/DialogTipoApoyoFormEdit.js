import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormHelperText, FormLabel, Grid,      makeStyles, MenuItem,  Radio, RadioGroup,  TextField } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react';
import Button from "components/CustomButtons/Button.js";
import DialogContent from '@material-ui/core/DialogContent';
import { stylesArchivo } from 'css/stylesArchivo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import 'moment/locale/es';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { NumeroApoyosContext } from 'contexts/catalogos/numeroApoyosContext';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';
import { MultiSelect } from "react-multi-select-component";
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { ApoyoContext } from 'contexts/catalogos/ApoyoContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';
import "./styles.css";
import { ModalConfirmacion } from 'commons/ModalConfirmacion';
import { Mensaje } from 'components/Personalizados/Mensaje';
import { ModalContextConfirmacion } from 'contexts/modalContextConfirmacion';
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
const useStyles = makeStyles(stylesArchivo);


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

export const DialogTipoApoyoFormEdit = ({ personaSeleccionada }) => {
    const { t } = useTranslation();
    let history = useHistory();
    const { setShowModalUpdate } = useContext(ModalContextUpdate);

    const classes = useStyles();   
    const { getTiposApoyosActivos, tiposApoyosList } = useContext(TiposApoyosContext);
    const { getPeriodicidadApoyosActivos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);
    const { programasList, getCien } = useContext(ProgramasContext);
    const { apoyoservicioList, getApoyoServicioActivos } = useContext(ApoyoServicioContext);
    const { numeroApoyosList, getNumeroApoyos } = useContext(NumeroApoyosContext);
    const { actividadescontinuarList, getActividadesContinuarActivos } = useContext(ActividadesContinuarContext)
    const { actualizarApoyo } = useContext(ApoyoContext)

    const [tipoApoyoSelect, setTipoApoyoSelect] = React.useState([]);
    const [actividadesContinuarSelect, setActividadesContinuarSelect] = React.useState([]);

 
    const [selectedTipApoy, setSelectedTipApoy] = useState([]);
    const [selectedActividadesContinuar, setSelectedActividadesContinuar] = useState([]);
  

    //dialog confirmacion
    const [valores, setValores] = useState();
    const { setShowModalConfirmacion } = useContext(ModalContextConfirmacion);
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msjConfirmacion, setMsjConfirmacion] = useState('');

    useEffect(() => {
        getTiposApoyosActivos();
        getActividadesContinuarActivos();
        getPeriodicidadApoyosActivos();
        getCien();
        getNumeroApoyos();
        getApoyoServicioActivos();

        setSelectedTipApoy(personaSeleccionada.idTipoApoyo)
        setSelectedActividadesContinuar(personaSeleccionada.idActividadContinuidadApoyo)
        console.log('personaSeleccionada', personaSeleccionada)
    }, []);


    /**
 * abre el dialogo de confirmaci??n
 * @param {valores} e 
 */
    const confirmacionDialog = (e) => {
        setShowModalConfirmacion(true);
        setValores(e)
    }



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

    const agregarServicioFormik = (value, index, props) => () => {
        const serv = {
            id: value.id,
            fechaInicio: '',
            fechaFin: ''
        }
        props.values.enServicio[index] = serv

    }



    const schemaValidacion = Yup.object({

        dsapoyo: Yup.string()
            .required(`${t('msg.nombreapoyoobligatorio')}`),
        idPrograma: Yup.string()
            .required(`${t('msg.programaobligatorio')}`),
        dsdescripcion: Yup.string()
            .required(`${t('msg.descripcionobligatorio')}`),
        estatus: Yup.string()
            .required(`${t('msg.estatusobligatorio')}`),
 
        fcvigenciainicio: Yup.string()
            .required(`${t('msg.vigenciaobligatorio')}`),
        fcvigenciafin: Yup.string()
            .required(`${t('msg.vigenciahastaobligatorio')}`),


        cantidadPesos: Yup.string()
            .required(`${t('lbl.lacantidadesobligatorio')}`),
        // descApoyoEspecie: Yup.string()
        //     .required('El apoyo en especie es obligatorio'),
        idPeriodicidad: Yup.string()
            .required(`${t('msg.laperiodicidadobligatorio')}`),
        formaEntrega: Yup.string()
            .required(`${t('msg.laformaentregaobligatorio')}`),
        numEntregas: Yup.string()
            .required(`${t('msg.numeroentregaobligatorio')}`),
    });

    const actualizarTipoApoyo = async valores => {
        valores.idTipoApoyo = selectedTipApoy
        valores.idActividadContinuidadApoyo = selectedActividadesContinuar

        confirmacionDialog(valores);
    }

    const handleRegistrar = () => {

        actualizarApoyo(valores).then(response => {
            setOpenSnackbar(true);
            setMsjConfirmacion(`${t('msg.registroguardadoexitosamente')}`);
            const timer = setTimeout(() => {
                setError(false);
                history.push("/admin/catapoyoservicio")
                setShowModalConfirmacion(false);
                setShowModalUpdate(false);

            }, 1000);
            return () => clearTimeout(timer);
        }).catch(err => {
            setOpenSnackbar(true);
            setError(true);
            setMsjConfirmacion(`${t('msg.ocurrioerrorcalidarinfo')}`);
        })
    }


    function isActiveOption(apoyo) {
        var apy = personaSeleccionada?.enServicio?.filter(ab => ab.id === apoyo.id)
         return  (apy.length > 0)
             }

    return (


        <Formik
            enableReinitialize
            initialValues={personaSeleccionada}
            validationSchema={schemaValidacion}
            onSubmit={(valores) => {
                actualizarTipoApoyo(valores)
            }}

        >

            {props => {

                return (
                    <form
                        onSubmit={props.handleSubmit}
                    >
                        {console.log('PROPS=>', props)}
                        <DialogContent >
                            <TextField
                                id="dsapoyo"
                                label={t('lbl.nombredeltipoapoyo')}
                                variant="outlined"
                                name="dsapoyo"
                                fullWidth
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dsapoyo}
                            />
                            {props.touched.dsapoyo && props.errors.dsapoyo ? (
                                <FormHelperText error={props.errors.dsapoyo}>{props.errors.dsapoyo}</FormHelperText>
                            ) : null}
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                variant="outlined"
                                label={t('lbl.seleccionaunprograma')}
                                select
                                fullWidth
                                name="idPrograma"
                                value={props.values.idPrograma}
                                onChange={props.handleChange}
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

                            {props.touched.idPrograma && props.errors.idPrograma ? (
                                <FormHelperText error={props.errors.idPrograma}>{props.errors.idPrograma}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dsdescripcion"
                                label={t('lbl.descripciondeltipodeapoyo')}
                                variant="outlined"
                                name="dsdescripcion"
                                value={props.values.dsdescripcion}
                                onChange={props.handleChange}
                                fullWidth
                                inputProps={{ maxLength: 300 }}
                            />

                            {props.touched.dsdescripcion && props.errors.dsdescripcion ? (
                                <FormHelperText error={props.errors.dsdescripcion}>{props.errors.dsdescripcion}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <FormLabel component="legend">{t('lbl.estatus')} </FormLabel>
                            <RadioGroup row aria-label="position" defaultValue="top" value={props.values.estatus} onChange={props.handleChange} >
                                <FormControlLabel name="estatus" value="true" control={<Radio color="primary" />} label={t('lbl.activo')} />
                                <FormControlLabel name="estatus" value="false" control={<Radio color="primary" />} label={t('lbl.inactivo')} />
                            </RadioGroup>
                        </DialogContent>

                        {/* FECHA VIGENCIA */}
                        <DialogContent>
                            <div><FormLabel component="legend">{t('lbl.vigenciadelapoyo')} </FormLabel></div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <TextField
                                        id="fcvigenciainicio"
                                        label={t('lbl.Desde')}
                                        type="date"
                                        fullWidth
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={props.values.fcvigenciainicio}
                                        name="fcvigenciainicio"
                                        onChange={props.handleChange}
                                        InputProps={{
                                            inputProps: {
                                                
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <TextField
                                        id="fcvigenciafin"
                                        label={t('lbl.hasta')}
                                        type="date"

                                        fullWidth
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={props.values.fcvigenciafin}
                                        name="fcvigenciafin"
                                        onChange={props.handleChange}
                                        InputProps={{
                                            inputProps: {
                                                min: props.values.fcvigenciainicio
                                            }
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </DialogContent>


                        <DialogContent style={{ overflowY: 'visible' }}>
                            <FormLabel component="legend">{t('lbl.seleccionauntipodeapoyo')}</FormLabel>
                              <MultiSelect
                                options={tipoApoyoSelect}
                                value={selectedTipApoy}
                                onChange={setSelectedTipApoy}
                                labelledBy={t('cmb.seleccionar')}

                            />  


                        </DialogContent>

                        <DialogContent>

                            <TextField
                                label={t('lbl.cantidadenpesos')}
                                value={props.values.cantidadPesos}
                                onChange={props.handleChange}
                                name="cantidadPesos"
                                id="formatted-numberformat-input"
                                fullWidth
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    maxLength: 7
                                }}
                                
                            />
                            {props.touched.cantidadPesos && props.errors.cantidadPesos ? (
                                <FormHelperText error={props.errors.cantidadPesos}>{props.errors.cantidadPesos}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="descApoyoEspecie"
                                label={t('bl.descripciondelapoyoenespecie')}
                                variant="outlined"
                                name="descApoyoEspecie"
                                value={props.values.descApoyoEspecie}
                                onChange={props.handleChange}
                                fullWidth
                                inputProps={{ maxLength: 100 }}
                            />
                            {props.touched.descApoyoEspecie && props.errors.descApoyoEspecie ? (
                                <FormHelperText error={props.errors.descApoyoEspecie}>{props.errors.descApoyoEspecie}</FormHelperText>
                            ) : null}
                        </DialogContent>


                        <DialogContent>

                            {

                                apoyoservicioList.map((apyo, i) => {
                                    const fechaInicioq = `enServicio[${i}].fechaInicio`;
                                    const fechaFinq = `enServicio[${i}].fechaFin`;
                                    const expandedfrm = `enServicio[${i}].expanded`;

                                    return (
                                        <Accordion expanded={isActiveOption(apyo)}  >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-label="Expand"
                                                aria-controls="additional-actions1-content"
                                                id="additional-actions1-header"

                                            >
                                                <FormControlLabel
                                                    aria-label="Acknowledge"
                                                    onClick={agregarServicioFormik(apyo, i, props)}
                                                    control={<Checkbox checked={props.values.enServicio[i]?.expanded} name={expandedfrm} onChange={props.handleChange} value={props.values.enServicio[i]?.expanded}/>}
                                                    label={apyo.dsservicio}
                                                />
                                            </AccordionSummary>
                                            <AccordionDetails>

                                                <DialogContent>
                                                    <div><FormLabel component="legend">{t('lbl.vigencia')}</FormLabel></div>
                                                    <GridContainer>
                                                        <GridItem xs={12} sm={12} md={6}>

                                                            <TextField
                                                                label={t('lbl.Desde')}
                                                                type="date"
                                                                fullWidth
                                                                className={classes.textField}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                name={fechaInicioq}
                                                                value={props.values.enServicio[i]?.fechaInicio}
                                                                onChange={props.handleChange}

                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={6}>
                                                            <TextField
                                                                label={t('lbl.hasta')}
                                                                type="date"
                                                                fullWidth
                                                                className={classes.textField}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                name={fechaFinq}
                                                                value={props.values.enServicio[i]?.fechaFin}
                                                                onChange={props.handleChange}

                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                </DialogContent>

                                            </AccordionDetails>
                                        </Accordion>
                                    )


                                })
                            }
                        </DialogContent>






                        <DialogContent>
                            <TextField
                                variant="outlined"
                                label={t('lbl.entregarelapoyo')}
                                select
                                fullWidth
                                name="idPeriodicidad"
                                value={props.values.idPeriodicidad}
                                onChange={props.handleChange}
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
                            {props.touched.idPeriodicidad && props.errors.idPeriodicidad ? (
                                <FormHelperText error={props.errors.idPeriodicidad}>{props.errors.idPeriodicidad}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <FormControlLabel
                                control={<Checkbox value={props.values.formaEntrega} defaultChecked={props.values.formaEntrega} onChange={props.handleChange} name="formaEntrega" />}
                                label={t('lbl.formaentregaapoyoexhibicion')}
                            />
                        </DialogContent>

                        <DialogContent>
                            {
                                props.values.formaEntrega ? (<TextField
                                    variant="outlined"
                                    label={t('lbl.numeroentregaapoyos')}
                                    select
                                    fullWidth
                                    name="numEntregas"
                                    value={props.values.numEntregas}
                                    onChange={props.handleChange}
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

                            {props.touched.numEntregas && props.errors.numEntregas ? (
                                <FormHelperText error={props.errors.numEntregas}>{props.errors.numEntregas}</FormHelperText>
                            ) : null}
                        </DialogContent>



                        <DialogContent style={{ overflowY: 'visible' }}>
                            <FormLabel component="legend">{t('lbl.seleccionactividadesrealizarparacontinuarapoyo')}</FormLabel>

                              <MultiSelect
                                options={actividadesContinuarSelect}
                                value={selectedActividadesContinuar}
                                onChange={setSelectedActividadesContinuar}
                                labelledBy={t('cmb.seleccionar')}
                            />  


                        </DialogContent>


                        <DialogContent>
                            <TextField
                                id="outlined-multiline-static"
                                label={t('lbl.expObservaciones')}
                                multiline
                                rows={4}
                                variant="outlined"
                                name="observaciones"
                                value={props.values.observaciones}
                                onChange={props.handleChange}
                                fullWidth
                                inputProps={{ maxLength: 500 }}
                            />
                        </DialogContent>


                        <DialogContent >
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" type='submit'>
                                    {t('btn.guardar')}
                                </Button>
                            </Grid>
                        </DialogContent>


                        <ModalConfirmacion
                            handleRegistrar={handleRegistrar} evento="Editar"
                        />

                        <Mensaje
                            setOpen={setOpenSnackbar}
                            open={openSnackbar}
                            severity={error ? "error" : "success"}
                            message={msjConfirmacion}
                        />












                    </form>
                )
            }}
        </Formik>






    )

}