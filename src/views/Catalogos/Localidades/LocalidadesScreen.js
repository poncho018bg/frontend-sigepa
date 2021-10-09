import React, { useContext, useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';

import { Grid,makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { Localidad } from './Localidad';

import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import { ModalContext } from 'contexts/modalContex';
import { LocalidadForm } from './LocalidadForm';
import { Modal } from 'commons/Modal';
import { MunicipiosContext } from 'contexts/catalogos/MunicipiosContext';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const LocalidadesScreen = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');

    const { 
            get,
            localidadesList,
            size,
            page,
            total,
            changePageSize,
            changePage
          } = useContext(LocalidadesContext);


    const {  setShowModal  } = useContext(ModalContext);

    const {getMunicipiosId } = useContext(MunicipiosContext);
  
    const handleChangePage = (event, newPage) => {
      changePage(newPage)
    };
  
    const handleChangeRowsPerPage = event => {
      changePageSize(+event.target.value);
      changePage(0)
    };

    const addDialog = () => {
      setShowModal(true);
    }
 
    useEffect(() => {
          get();
      }, []);

    useEffect(() => {
      getMunicipiosId();

    }, []);

    return (
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{t('pnl.localidades')}</h4>
            
            <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                      <Button
                          color="white"
                          aria-label="edit"
                          justIcon round
                          onClick={addDialog}
                        >
                              <Add />
                          </Button>
                  </Grid>
              <Grid item xs={6}>
                <SearchBar
                  placeholder={t('lbl.buscar')}
                  value={searched}
                  onChange={(searchVal) => setSearched(searchVal)}
                  onCancelSearch={() => setSearched('')}
                />
            </Grid>
            </Grid>
            </CardActions>
          </CardHeader>
          <CardBody>
              < Table stickyHeader aria-label="sticky table" >
                < TableHead >
                  < TableRow key="898as" >
                    < TableCell >{t('dgv.estatus')}</TableCell >
                    < TableCell >{t('dgv.clave')} </TableCell >
                    < TableCell >{t('dgv.localidad')}</TableCell >
                    < TableCell>{t('dgv.cp')}</TableCell >
                    < TableCell>{t('dgv.registro')}</TableCell >
                    < TableCell colSpan={2} align="center">{t('dgv.acciones')}</TableCell >
                  </TableRow >
                </TableHead >
                < TableBody >
                  {
                       (searched ?
                        localidadesList.filter(row => row.dslocalidad ?
                          row.dslocalidad.toLowerCase().includes(searched.toLowerCase()) : null)
                        : localidadesList
                      ).map(row => {
                        return (
                          <Localidad 
                             key={row.id}
                             localidad={row}
                          />
                        );
                      })
                    }
              </TableBody >
            </ Table>
            < TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                labelRowsPerPage="Registros por página"
                count={total}
                rowsPerPage={size}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </CardBody>

          <Modal>
                <LocalidadForm />
            </Modal>
        </Card>
      </GridItem>
    )
  }
  