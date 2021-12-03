
import React, {  useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import {DetalleExpDig} from '../consultaExpDig/DetalleExpDig'

export const DetallePlantilla = () => {


  const { etapasPlantilla } = useSelector(state => state.etapa);
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
                Información General
              </Button>
            </Box>
          </div>
          {plantillas}
        </Grid>
        <DetalleExpDig 
            etapaSeleccionada={etapa}></DetalleExpDig>

      </Grid>
    </div>
  );
}
