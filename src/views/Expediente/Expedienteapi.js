
import React, {  useState,useContext,useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import {DetalleExpDig} from './DetalleExpDig'
import { ExpedienteContext } from 'contexts/expedienteContext';

export const Expedienteapi = () => {


 
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
    getEtapasByPlantilla('ded0aebb-542e-48d8-91ad-917b8f592aba')
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
    
    console.log('p>',etapa)
    
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={3}>
          <div className="list__card">
            <Box display="flex" flexDirection="column" >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'green' }}
                size="large"
                onClick={() => onSelect(null)}
              >
                Datos generales
              </Button>
            </Box>
            <Box display="flex" flexDirection="column" >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'purple' }}
                size="large"
                onClick={() => onSelect(null)}
              >
                Información de la beneficiaria
              </Button>
            </Box>
          </div>
          {plantillas}
        </Grid>
        {console.log('ETAPASS=>>',etapasPlantilla)}
        <DetalleExpDig 
            etapaSeleccionada={etapa}></DetalleExpDig>

      </Grid>
    </div>
  );
}
