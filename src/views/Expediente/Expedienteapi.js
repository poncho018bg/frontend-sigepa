
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { DetalleExpDig } from './DetalleExpDig'
//context
import { ExpedienteContext } from 'contexts/expedienteContext';
import { RegistroSolicitudContext } from 'contexts/registroSolicitudContext';

export const Expedienteapi = () => {

  /**
   * datos para obtener beneficiario
   */
  let query = useLocation();
  const { beneficiario, direccion,
    registrarDireccionBeneficiario, getBeneficiario, actualizarBeneficiario,
    obtenerDireccionBeneficiario, actualizarDireccionBeneficiario } = useContext(RegistroSolicitudContext);
  const [identPrograma, setIdentPrograma] = useState();
  //idBeneficiario
  const [idBeneficiario, setIdBeneficiario] = useState();
  //idPrograma de ultimo al que se inscribio el beneficiario
  const [idProgramaExpediente, setIdProgramaExpediente] = useState();
  const [curp, setCurp] = useState();
  /**
   * se terminan datos del beneficiario
   */



  const { etapasPlantilla, getEtapasByPlantilla } = useContext(ExpedienteContext);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [showDialogForm, setShowDialogForm] = useState(false);
  const [etapa, setEtapa] = useState();

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }),
  );
  const classes = useStyles();

  function onSelect(e) {
    console.log('Etapa selecionada=>', e)
    setEtapa(e)
  }


  useEffect(() => {
    getEtapasByPlantilla('829c38d6-a46d-4534-91a9-3bd6e88b2ba2')
  }, []);

  useEffect(() => {
    console.log("expediente ==>", query.state);
    if (query.state?.curp) {
      setCurp(query.state?.curp);
      setIdBeneficiario(query.state?.id)
      obtenerDireccionBeneficiario(query.state?.id);
      getBeneficiario(query.state?.curp)
    }
  }, []);

  const plantillas = etapasPlantilla.map((item) => (
    <div className="list__card">
      <Box display="flex" flexDirection="column" >
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: item.dscolor }}
          size="large"
          onClick={() => onSelect(item)}
        >{item.dsetapa}

        </Button>
      </Box>
    </div>
  ));

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const addDialog = () => {
    console.log('abriendo');
    setShowDialogForm(true);
    //setEtapa(etapa)

    console.log('p>', etapa)

  }

  return (
    <div className={classes.root} style={{ paddingTop: '7%' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <div className="list__card">
            <Box display="flex" flexDirection="column" >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#8cc706' }}
                size="large"
                onClick={() => onSelect('00000000-0000-0000-0000-000000000000')}
              >
                Datos generales
              </Button>
            </Box>
            <Box display="flex" flexDirection="column" >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#ff9f05' }}
                size="large"
                onClick={() => onSelect('00000000-0000-0000-0000-000000000001')}
              >
                Información de la beneficiaria
              </Button>
            </Box>
          </div>
          {plantillas}
        </Grid>
        {console.log('ETAPASS=>>', etapasPlantilla)}
        <Grid item xs={9}>
          <DetalleExpDig
            idBeneficiario={idBeneficiario}
            etapaSeleccionada={etapa}
            beneficiarioPadre={beneficiario}
            setIdentPrograma={setIdentPrograma}
            setIdProgramaExpediente={setIdProgramaExpediente}
            direccionBeneficiario={direccion}
            idProgramaExpediente={idProgramaExpediente}></DetalleExpDig>
        </Grid>

      </Grid>
    </div>
  );
}
