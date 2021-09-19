import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Dialog, DialogTitle, FormControlLabel, FormHelperText, FormLabel, Grid, Input, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState, useContext } from 'react';
import Button from "components/CustomButtons/Button.js";
import DialogContent from '@material-ui/core/DialogContent';
import { useSelector } from 'react-redux';
import { stylesArchivo } from 'css/stylesArchivo';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik } from 'formik';
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
import { RegionMunicipiosContext } from 'contexts/catalogos/RegionMunicipiosContext';
import { ActividadesContinuarContext } from 'contexts/catalogos/ActividadesContinuarContext';
import { ApoyoContext } from 'contexts/catalogos/ApoyoContext';
import { ModalContextUpdate } from 'contexts/modalContexUpdate';

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

export const DialogTipoApoyoFormEdit = ({ personaSeleccionada }) => {

    const { setShowModalUpdate } = useContext(ModalContextUpdate);

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
    const { regionList, getRegionMunicipios } = useContext(RegionMunicipiosContext)
    const { actividadescontinuarList, getActividadesContinuar } = useContext(ActividadesContinuarContext)
    const { actualizarApoyo } = useContext(ApoyoContext)


    const [municipiosSelect, setMunicipiosSelect] = React.useState([]);
    const [tipoApoyoSelect, setTipoApoyoSelect] = React.useState([]);
    const [actividadesContinuarSelect, setActividadesContinuarSelect] = React.useState([]);
    const [documentslst, setDocumentslst] = React.useState([]);

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [state, setState] = React.useState({
        checkedA: false
    });


    const [selected, setSelected] = useState([]);
    const [selectedTipApoy, setSelectedTipApoy] = useState([]);
    const [selectedActividadesContinuar, setSelectedActividadesContinuar] = useState([]);

    useEffect(() => {
        getTiposApoyos();
        getActividadesContinuar();
        getEdadesBeneficiarios();
        getTipoBeneficiarios();
        getPeriodicidadApoyos();
        getDocumentos();
        get();
        getNumeroApoyos();
        getApoyoServicio();
        getMunicipios();
        getRegionMunicipios('a3de85a7-6c23-46a4-847b-d79b3a90963d')
        //setLeft(documentosList)

        setSelectedTipApoy(personaSeleccionada.idTipoApoyo)
        setSelected(personaSeleccionada.coberturaMunicipal)
        setSelectedActividadesContinuar(personaSeleccionada.idActividadContinuidadApoyo)

    }, []);

    useEffect(() => {
        const lstDocsRg = []
        const lstDocsLf = []
        personaSeleccionada.documentosRequisitos.map((dcs) => {
            documentosList.map((lstdcs) => {
                if (lstdcs.id === dcs) {
                    lstDocsRg.push(lstdcs)
                } else {
                    lstDocsLf.push(lstdcs)
                }
            })
        })

        console.log('lstDocsRg',lstDocsRg)
        console.log('lstDocsLf',lstDocsLf)

        setChecked(lstDocsRg)
        // handleCheckedRight();

        setRight(lstDocsRg);
        setLeft(lstDocsLf);
        setLeft(not(lstDocsLf, leftChecked))
        setChecked(not(checked, leftChecked))
  
        

    }, [documentosList]);

    useEffect(() => {
        var   docslst =[]
          right.map((mp)=>{
              docslst.push(mp.id)
          })
          setDocumentslst(docslst)
      }, [right]);


    useEffect(() => {
        //setLeft(documentosList)
    }, [documentosList]);

    useEffect(() => {
        const lstmun = []
        regionList.map((mn) => {
            lstmun.push({ label: mn.dsMunicipio, value: mn.idMunicipio })
        })
        setMunicipiosSelect(lstmun)
    }, [regionList]);

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
        console.log('agregarServicioFormik 1=>', props.values.enServicio)
    }

    const checkServicio = (apyo, props,index) => () => {
        personaSeleccionada.enServicio.map((ens)=>{
            if(apyo.id === ens.id ){
                props.values.enServicio[index] = ens
                return true
            }
        })
        
    }

    const agregarTipoApoy=(props)=>()=>{
        props.values.idTipoApoyo= selectedTipApoy
        console.log('TIPOAPOYO=>',props.values.idTipoApoyo)
    }

    const schemaValidacion = Yup.object({

        dsapoyo: Yup.string()
            .required('El nombre del apoyo es obligatorio'),
        idPrograma: Yup.string()
            .required('El programa es obligatorio'),
        dsdescripcion: Yup.string()
            .required('La descripción obligatorio'),
        estatus: Yup.string()
            .required('El estatus es obligatorio'),
        visita: Yup.string()
            .required('la visita es obligatorio'),
        fcvigenciainicio: Yup.string()
            .required('La vigencia desde obligatorio'),
        fcvigenciafin: Yup.string()
            .required('La vigencia hasta es obligatorio'),
        fcregistrowebinicio: Yup.string()
            .required('La vigencia desde obligatorio'),
        fcregistrowebfin: Yup.string()
            .required('La vigencia hasta es obligatorio'),
        fcregistropresencialinicio: Yup.string()
            .required('La vigencia desde obligatorio'),
        fcregistropresencialfin: Yup.string()
            .required('La vigencia hasta es obligatorio'),
        idRangoEdadBeneficiario: Yup.string()
            .required('El rango de edad es obligatorio'),
        idBeneficiario: Yup.string()
            .required('El tipo de beneficiario es obligatorio'),
        cantidadPesos: Yup.string()
            .required('La cantidad es obligatorio'),
        // descApoyoEspecie: Yup.string()
        //     .required('El apoyo en especie es obligatorio'),
        idPeriodicidad: Yup.string()
            .required('La periodicidad es obligatorio'),
        formaEntrega: Yup.string()
            .required('La forma de entrega es obligatorio'),
        numEntregas: Yup.string()
            .required('El número de entrega es obligatorio'),
    });

    const actualizarTipoApoyo = async valores => {
        valores.idTipoApoyo= selectedTipApoy
        valores.coberturaMunicipal= selected
        valores.idActividadContinuidadApoyo= selectedActividadesContinuar
        valores.documentosRequisitos= documentslst
        actualizarApoyo(valores);
        setShowModalUpdate(false);
    }

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
                        {console.log('EDIT =>', props.values)}
                        {console.log('Error =>', props.errors)}
                        <DialogContent >
                            <TextField
                                id="dsapoyo"
                                label="Nombre del Tipo de Apoyo"
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
                                label="Selecciona un programa"
                                select
                                fullWidth
                                name="idPrograma"
                                value={props.values.idPrograma}
                                onChange={props.handleChange}
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

                            {props.touched.idPrograma && props.errors.idPrograma ? (
                                <FormHelperText error={props.errors.idPrograma}>{props.errors.idPrograma}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="dsdescripcion"
                                label="Descripción del Tipo de Apoyo"
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
                            <FormLabel component="legend">Estatus </FormLabel>
                            <RadioGroup row aria-label="position" defaultValue="top" value={props.values.estatus} onChange={props.handleChange} >
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
                                        value={props.values.fcvigenciainicio}
                                        name="fcvigenciainicio"
                                        onChange={props.handleChange}
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
                                        value={props.values.fcvigenciafin}
                                        name="fcvigenciafin"
                                        onChange={props.handleChange}
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
                                        value={props.values.fcregistrowebinicio}
                                        name="fcregistrowebinicio"
                                        onChange={props.handleChange}
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
                                        value={props.values.fcregistrowebfin}
                                        name="fcregistrowebfin"
                                        onChange={props.handleChange}
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
                                        value={props.values.fcregistropresencialinicio}
                                        name="fcregistropresencialinicio"
                                        onChange={props.handleChange}
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
                                        value={props.values.fcregistropresencialfin}
                                        name="fcregistropresencialfin"
                                        onChange={props.handleChange}
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
                                value={props.values.idRangoEdadBeneficiario}
                                onChange={props.handleChange}
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
                            {props.touched.idRangoEdadBeneficiario && props.errors.idRangoEdadBeneficiario ? (
                                <FormHelperText error={props.errors.idRangoEdadBeneficiario}>{props.errors.idRangoEdadBeneficiario}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                variant="outlined"
                                label="Selecciona un tipo de beneficiario"
                                select
                                fullWidth
                                name="idBeneficiario"
                                value={props.values.idBeneficiario}
                                onChange={props.handleChange}
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
                            {props.touched.idBeneficiario && props.errors.idBeneficiario ? (
                                <FormHelperText error={props.errors.idBeneficiario}>{props.errors.idBeneficiario}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent style={{ overflowY: 'visible' }}>
                            <FormLabel component="legend">Selecciona un tipo de apoyo</FormLabel>
                            <MultiSelect
                                options={tipoApoyoSelect}
                                value={selectedTipApoy}
                                onChange={setSelectedTipApoy}
                                labelledBy="Select"
                                
                            />
                           
                            {/* {formik.touched.idTipoApoyo && formik.errors.idTipoApoyo ? (
                    <FormHelperText error={formik.errors.idTipoApoyo}>{formik.errors.idTipoApoyo}</FormHelperText>
                ) : null} */}
                        </DialogContent>

                        <DialogContent>
                            <CurrencyTextField
                                label="Cantidad en pesos"
                                name="cantidadPesos"
                                fullWidth
                                variant="standard"
                                value={props.values.cantidadPesos}
                                currencySymbol="$"
                                minimumValue="0"
                                outputFormat="string"
                                decimalCharacter="."
                                digitGroupSeparator=","
                                maximumValue="10000000000000"
                                onChange={props.handleChange}
                            />
                            {props.touched.cantidadPesos && props.errors.cantidadPesos ? (
                                <FormHelperText error={props.errors.cantidadPesos}>{props.errors.cantidadPesos}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="descApoyoEspecie"
                                label=" Descripción del apoyo en especie"
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
                                    // ESTE CODIGO AGREGA LOS DATOS DE LOS SERVICOS                                  
                                    personaSeleccionada.enServicio.map((ns) => {
                                        apoyoservicioList.map((mp, i) => {
                                            if (ns.id === mp.id) {
                                                props.values.enServicio[i] = ns
                                            }
                                        })
                                    })

                                    return (
                                        <Accordion expanded={checkServicio(apyo,props,i)}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-label="Expand"
                                                aria-controls="additional-actions1-content"
                                                id="additional-actions1-header"

                                            >
                                                <FormControlLabel
                                                    aria-label="Acknowledge"
                                                    onClick={agregarServicioFormik(apyo, i, props)}
                                                    control={<Checkbox checked={checkServicio(apyo,props,i)} />}
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
                                                                value={props.values.enServicio.fechaInicio}
                                                                onChange={props.handleChange}

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
                                                                value={props.values.enServicio.fechaFin}
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
                            <FormLabel component="legend">Requiere Visita Obligatoria</FormLabel>
                            <RadioGroup row aria-label="position" defaultValue="top" value={props.values.visita} onChange={props.handleChange} >
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
                                value={props.values.idPeriodicidad}
                                onChange={props.handleChange}
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
                            {props.touched.idPeriodicidad && props.errors.idPeriodicidad ? (
                                <FormHelperText error={props.errors.idPeriodicidad}>{props.errors.idPeriodicidad}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <FormControlLabel
                                control={<Checkbox value={true} onChange={props.handleChange} name="formaEntrega" />}
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
                                value={props.values.numEntregas}
                                onChange={props.handleChange}
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
                            {props.touched.numEntregas && props.errors.numEntregas ? (
                                <FormHelperText error={props.errors.numEntregas}>{props.errors.numEntregas}</FormHelperText>
                            ) : null}
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                id="numApoyos"
                                label="Número de entrega de Apoyos"
                                variant="outlined"
                                name="numApoyos"
                                value={props.values.numApoyos}
                                onChange={props.handleChange}
                                fullWidth
                                inputProps={{ maxLength: 500 }} />

                            {props.touched.numApoyos && props.errors.numApoyos ? (
                                <FormHelperText error={props.errors.numApoyos}>{props.errors.numApoyos}</FormHelperText>
                            ) : null}
                        </DialogContent>


                        <DialogContent style={{ overflowY: 'visible' }}>
                            <FormLabel component="legend">Cobertura municipal </FormLabel>
                            <MultiSelect
                                options={municipiosSelect}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            />
                        </DialogContent>


                        <DialogContent style={{ overflowY: 'visible' }}>
                            <FormLabel component="legend">Selecciona actividades por realizar para continuar con el apoyo </FormLabel>

                            <MultiSelect
                                options={actividadesContinuarSelect}
                                value={selectedActividadesContinuar}
                                onChange={setSelectedActividadesContinuar}
                                labelledBy="Select"
                            />

                            {/* {formik.touched.idTipoApoyo && formik.errors.idTipoApoyo ? (
                    <FormHelperText error={formik.errors.idTipoApoyo}>{formik.errors.idTipoApoyo}</FormHelperText>
                ) : null} */}
                        </DialogContent>


                        <DialogContent>
                            <TextField
                                id="outlined-multiline-static"
                                label="Observaciones"
                                multiline
                                rows={4}
                                variant="outlined"
                                name="observaciones"
                                value={props.values.observaciones}
                                fullWidth
                                inputProps={{ maxLength: 500 }}
                            />
                        </DialogContent>










                        <DialogContent >
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" type='submit'>
                                    Editar
                                </Button>
                            </Grid>


                        </DialogContent>














                    </form>
                )
            }}
        </Formik>

    


      
    
)

}