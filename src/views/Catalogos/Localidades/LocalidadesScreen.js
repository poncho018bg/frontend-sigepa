import React, { useContext, useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';
import { Grid } from '@material-ui/core';
import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { LocalidadesContext } from 'contexts/catalogos/Localidades/localidadesContext';
import { Localidad } from './Localidad';
const useStyles = makeStyles(stylesArchivo);

export const LocalidadesScreen = () => {
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showDialogForm, setShowDialogForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [paginas, setPaginas] = useState([]);
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const { get, eliminar, localidadesList } = useContext(LocalidadesContext);
 
    useEffect(() => {
      get();
  }, []);
    return (
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Localidades</h4>
            
            <CardActions>
            <Grid container spacing={3}>
          
            <Grid item xs={6}>
              <SearchBar
                placeholder="Buscar"
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
                    < TableCell > Beneficiario</TableCell >
                    < TableCell > CURP  </TableCell >
                    < TableCell> Apoyo Otorgado</TableCell >
                    <TableCell>Tipo de Apoyo</TableCell>
                    < TableCell> Año Registro Programa</TableCell >
                    < TableCell>Periocidad</TableCell >
                    < TableCell>Nùmero de veces</TableCell >
                  </TableRow >
                </TableHead >
                < TableBody >
                  {
                       (searched ?
                        localidadesList.filter(row => row.dsPagina ?
                          row.dsPagina.toLowerCase().includes(searched.toLowerCase()) : null)
                        : localidadesList
                      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
                count={paginas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </CardBody>
        </Card>
      </GridItem>
    )
  }
  