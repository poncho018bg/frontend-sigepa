
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, DialogTitle, FormControlLabel, FormHelperText, FormLabel, Grid, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react';
import Button from "components/CustomButtons/Button.js";
import DialogContent from '@material-ui/core/DialogContent';
import { useSelector } from 'react-redux';
import { stylesArchivo } from 'css/stylesArchivo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TiposApoyosContext } from 'contexts/catalogos/tiposApoyosContext';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { PeriodicidadApoyosContext } from 'contexts/catalogos/periodicidadApoyosContext';
import { DocumentosContext } from 'contexts/catalogos/documentosContext';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import moment from 'moment';
import 'moment/locale/es';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { NumeroApoyosContext } from 'contexts/catalogos/numeroApoyosContext';
import { ApoyoServicioContext } from 'contexts/catalogos/ApoyoServicioContext';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { MultiSelect } from "react-multi-select-component";
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

export const DialogTipoApoyoForm = (props) => {

    /**
     * estaba el dispatch
     */
    const classes = useStyles();
    const { tipoApoyoEditar } = useSelector(state => state.tipoApoyo);
    const { getTiposApoyos, tiposApoyosList } = useContext(TiposApoyosContext);
    const { getEdadesBeneficiarios, edadesBeneficiariosList } = useContext(EdadesBeneficiariosContext);
    const { getTipoBeneficiarios, tiposBeneficiariosList } = useContext(TiposBeneficiariosContext);
    const { getPeriodicidadApoyos, periodicidadApoyosList } = useContext(PeriodicidadApoyosContext);
    const { getDocumentos, documentosList } = useContext(DocumentosContext);
    const { programasList, get } = useContext(ProgramasContext);
    const { apoyoservicioList, getApoyoServicio } = useContext(ApoyoServicioContext);
    const { numeroApoyosList, getNumeroApoyos } = useContext(NumeroApoyosContext);
    const { municipiosList, getMunicipios } = useContext(MunicipiosContext);

    
    const [municipiosSelect, setMunicipiosSelect] = React.useState([]);



    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [state, setState] = React.useState({
        checkedA: false
    });


    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        getTiposApoyos();
        getEdadesBeneficiarios();
        getTipoBeneficiarios();
        getPeriodicidadApoyos();
        getDocumentos();
        get();
        getNumeroApoyos();
        getApoyoServicio();
        getMunicipios();
        setLeft(documentosList)
    }, []);

    useEffect(() => {
        setLeft(documentosList)
    }, [documentosList]);

    useEffect(() => {
        const lstmun = []
        municipiosList.map((mn)=>{
            mn
            lstmun.push({ label: mn.dsmunicipio, value: mn.id })
            
            
        })
        setMunicipiosSelect(lstmun)
        
    }, [municipiosList]);

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
            visita: '',
            idTipoApoyo: [],
            fcvigenciainicio: moment(new Date()).format("yyyy-MM-dd"),
            fcvigenciafin: moment(new Date()).format("yyyy-MM-dd"),
            fcregistrowebinicio: moment(new Date()).format("yyyy-MM-dd"),
            fcregistrowebfin: moment(new Date()).format("yyyy-MM-dd"),
            fcregistropresencialinicio: moment(new Date()).format("yyyy-MM-dd"),
            fcregistropresencialfin: moment(new Date()).format("yyyy-MM-dd"),
            idRangoEdadBeneficiario: '',
            idBeneficiario: '',
            cantidadPesos: '',
            enServicio: [{
                id: '',
                fechaInicio: '',
                fechaFin: ''
            }],
            descApoyoEspecie: '',
            idPeriodicidad: '',
            observaciones: null,
            formaEntrega: false,
            numEntregas: '',
            documentosRequisitos: [],
            idActividadContinuidadApoyo: '',
            cobertura: '',
            coberturaMunicipal: [],
            idEstado: ''
        },
        validationSchema: Yup.object({
            // dsapoyo: Yup.string()
            //     .required('El nombre del apoyo es obligatorio'),
            // idPrograma: Yup.string()
            //     .required('El programa es obligatorio'),
            // dsdescripcion: Yup.string()
            //     .required('La descripción obligatorio'),
            // estatus: Yup.string()
            //     .required('El estatus es obligatorio'),
            // visita: Yup.string()
            //     .required('la visita es obligatorio'),
            // // idTipoApoyo: Yup.string()
            // //     .required('El tipo apoyo  es obligatorio'),
            // fcvigenciainicio: Yup.string()
            //     .required('La vigencia desde obligatorio'),
            // fcvigenciafin: Yup.string()
            //     .required('La vigencia hasta es obligatorio'),
            // fcregistrowebinicio: Yup.string()
            //     .required('La vigencia desde obligatorio'),
            // fcregistrowebfin: Yup.string()
            //     .required('La vigencia hasta es obligatorio'),
            // fcregistropresencialinicio: Yup.string()
            //     .required('La vigencia desde obligatorio'),
            // fcregistropresencialfin: Yup.string()
            //     .required('La vigencia hasta es obligatorio'),
            // idRangoEdadBeneficiario: Yup.string()
            //     .required('El rango de edad es obligatorio'),
            // idBeneficiario: Yup.string()
            //     .required('El tipo de beneficiario es obligatorio'),
            // cantidadPesos: Yup.string()
            //     .required('La cantidad es obligatorio'),
            // enServicio: Yup.string()
            //     .required('EL servicio es obligatorio'),
            // descApoyoEspecie: Yup.string()
            //     .required('El apoyo en especie es obligatorio'),
            // idPeriodicidad: Yup.string()
            //     .required('La periodicidad es obligatorio'),
            // formaEntrega: Yup.string()
            //     .required('La forma de entrega es obligatorio'),
            // numEntregas: Yup.string()
            //     .required('El número de entrega es obligatorio'),
            // // documentosRequisitos: Yup.string()
            // //     .required('La documentación es obligatorio'),
            // idActividadContinuidadApoyo: Yup.string()
            //     .required('La actividad es obligatorio'),
            // cobertura: Yup.string()
            //     .required('La cobertura es obligatorio'),
            // // coberturaMunicipal: Yup.string()
            // //     .required('La cobertura es obligatorio'),
        }),

        onSubmit: async valores => {
            console.log('VALORES=>', valores)
            console.log('VALORES mun=>', selected)

            setShowModal(false);

        }
    })



    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };



    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };


    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.dsdocumento}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );



    return (

        <form onSubmit={formik.handleSubmit}>
            <DialogTitle id="form-dialog-title">{(tipoApoyoEditar) ? 'Editar Tipo de Apoyo' : 'Alta Tipo de Apoyo'} </DialogTitle>
            {console.log('ERRORES=>', formik.errors)}
            <DialogContent>

                <TextField
                    id="dsapoyo"
                    label="Nombre del Tipo de Apoyo"
                    variant="outlined"
                    name="dsapoyo"
                    value={formik.values.dsapoyo}
                    onChange={formik.handleChange}
                    fullWidth
                    inputProps={{ maxLength: 500 }} />

                {formik.touched.dsapoyo && formik.errors.dsapoyo ? (
                    <FormHelperText error={formik.errors.dsapoyo}>{formik.errors.dsapoyo}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
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
                        <em>Ninguno</em>
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
            </DialogContent>





            <DialogContent>

                <TextField
                    id="dsdescripcion"
                    label="Descripción del Tipo de Apoyo"
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
            </DialogContent>

            <DialogContent>
                <FormLabel component="legend">Estatus </FormLabel>
                <RadioGroup row aria-label="position" defaultValue="top" value={formik.values.valueStatus} onChange={formik.handleChange} >
                    <FormControlLabel name="estatus" value="true" control={<Radio color="primary" />} label="Activo" />
                    <FormControlLabel name="estatus" value="false" control={<Radio color="primary" />} label="Inactivo" />
                </RadioGroup>
            </DialogContent>


            {/* FECHA VIGENCIA */}
            <DialogContent>
                <div><FormLabel component="legend">Vigencia del tipo apoyo </FormLabel></div>
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
                            onChange={formik.handleChange}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            id="fcvigenciafin"
                            label="Hasta"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.fcvigenciafin}
                            name="fcvigenciafin"
                            onChange={formik.handleChange}
                        />
                    </GridItem>
                </GridContainer>
            </DialogContent>
            {/* FECHA VIGENCIA WEB */}
            <DialogContent>
                <div><FormLabel component="legend">Periodo de registro WEB </FormLabel></div>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            id="fcregistrowebinicio"
                            label="Desde"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.fcregistrowebinicio}
                            name="fcregistrowebinicio"
                            onChange={formik.handleChange}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            id="fcregistrowebfin"
                            label="Hasta"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.fcregistrowebfin}
                            name="fcregistrowebfin"
                            onChange={formik.handleChange}
                        />
                    </GridItem>
                </GridContainer>

            </DialogContent>


            {/* FECHA VIGENCIA PRESENCIAL */}
            <DialogContent>
                <div><FormLabel component="legend">Periodo de registro Presencial </FormLabel></div>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            id="fcregistropresencialinicio"
                            label="Desde"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.fcregistropresencialinicio}
                            name="fcregistropresencialinicio"
                            onChange={formik.handleChange}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField
                            id="fcregistropresencialfin"
                            label="Hasta"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formik.values.fcregistropresencialfin}
                            name="fcregistropresencialfin"
                            onChange={formik.handleChange}
                        />
                    </GridItem>
                </GridContainer>


            </DialogContent>


            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona un rango de edad"
                    select
                    fullWidth
                    name="idRangoEdadBeneficiario"
                    value={formik.values.idRangoEdadBeneficiario}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        edadesBeneficiariosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dsedadbeneficiario}
                                </MenuItem>
                            )
                        )
                    }

                </TextField>
                {formik.touched.idRangoEdadBeneficiario && formik.errors.idRangoEdadBeneficiario ? (
                    <FormHelperText error={formik.errors.idRangoEdadBeneficiario}>{formik.errors.idRangoEdadBeneficiario}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>
                <TextField
                    variant="outlined"
                    label="Selecciona un tipo de beneficiario"
                    select
                    fullWidth
                    name="idBeneficiario"
                    value={formik.values.idBeneficiario}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
                    </MenuItem>
                    {
                        tiposBeneficiariosList.map(
                            item => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.dstipobeneficiario}
                                </MenuItem>
                            )
                        )
                    }

                </TextField>
                {formik.touched.idBeneficiario && formik.errors.idBeneficiario ? (
                    <FormHelperText error={formik.errors.idBeneficiario}>{formik.errors.idBeneficiario}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>

                <FormLabel component="legend">Selecciona un tipo de apoyo</FormLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={formik.values.idTipoApoyo}
                    name="idTipoApoyo"
                    fullWidth
                    variant="outlined"
                    onChange={formik.handleChange}
                    input={<Input />}
                    //renderValue={(selected) => selected.join(', ')}
                    renderValue={() => parseSelect(selected).join(', ')}
                    MenuProps={MenuProps}
                >
                    {tiposApoyosList.map((name) => (
                        <MenuItem key={name.id} value={name.id} >
                            <Checkbox checked={formik.values.idTipoApoyo.indexOf(name.id) > -1} />
                            <ListItemText primary={name.dstipoapoyo} />
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched.idTipoApoyo && formik.errors.idTipoApoyo ? (
                    <FormHelperText error={formik.errors.idTipoApoyo}>{formik.errors.idTipoApoyo}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent>



                <CurrencyTextField
                    label="Cantidad en pesos"
                    name="cantidadPesos"
                    fullWidth
                    variant="standard"
                    value={formik.values.cantidadPesos}
                    currencySymbol="$"
                    minimumValue="0"
                    outputFormat="string"
                    decimalCharacter="."
                    digitGroupSeparator=","
                    maximumValue="10000000000000"
                    onChange={formik.handleChange}
                />
                {formik.touched.cantidadPesos && formik.errors.cantidadPesos ? (
                    <FormHelperText error={formik.errors.cantidadPesos}>{formik.errors.cantidadPesos}</FormHelperText>
                ) : null}

            </DialogContent>
            <DialogContent>

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
            </DialogContent>

            <DialogContent>
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

                                    <DialogContent>
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
                                    </DialogContent>

                                </AccordionDetails>
                            </Accordion>
                        )


                    })
                }




            </DialogContent>

            <DialogContent>
                <FormLabel component="legend">Requiere Visita Obligatoria</FormLabel>
                <RadioGroup row aria-label="position" defaultValue="top" value={formik.values.visita} onChange={formik.handleChange} >
                    <FormControlLabel name="visita" value="true" control={<Radio color="primary" />} label="SÍ" />
                    <FormControlLabel name="visita" value="false" control={<Radio color="primary" />} label="NO" />
                </RadioGroup>
            </DialogContent>


            <DialogContent>
                <FormLabel component="legend">Documentación y formatos requeridos para el tipo de apoyo</FormLabel>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    className={classes.root}
                    fullWidth
                >
                    <Grid item>{customList(left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">

                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>

                        </Grid>
                    </Grid>
                    <Grid item>{customList(right)}</Grid>
                </Grid>
            </DialogContent>

            <DialogContent>
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
                        <em>Ninguno</em>
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
            </DialogContent>

            <DialogContent>

                <FormControlLabel
                    control={<Checkbox value={true} onChange={formik.handleChange} name="formaEntrega" />}
                    label="Forma de entrega de apoyo por exhibición"
                />
            </DialogContent>

            <DialogContent>

                <TextField
                    variant="outlined"
                    label="Número de entrega de Apoyos"
                    select
                    fullWidth
                    name="numEntregas"
                    value={formik.values.numEntregas}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="0">
                        <em>Ninguno</em>
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

                </TextField>

                {formik.touched.numEntregas && formik.errors.numEntregas ? (
                    <FormHelperText error={formik.errors.numEntregas}>{formik.errors.numEntregas}</FormHelperText>
                ) : null}
            </DialogContent>

            <DialogContent  style={{ overflowY: 'visible' }}>
                <MultiSelect
                    options={municipiosSelect}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </DialogContent>

            <DialogContent>


                <TextField
                    id="outlined-multiline-static"
                    label="Observaciones"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="observaciones"
                    value={formik.values.observaciones}
                    fullWidth
                    inputProps={{ maxLength: 500 }}
                />

            </DialogContent>

            <DialogContent >
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" type='submit'>
                        Enviar
                    </Button>
                </Grid>
            </DialogContent>

        </form>

    )

}