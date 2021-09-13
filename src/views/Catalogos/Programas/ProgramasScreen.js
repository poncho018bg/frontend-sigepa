import React, { useContext, useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';

import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Grid } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { Programa } from './Programa';
const useStyles = makeStyles(stylesArchivo);

export const ProgramasScreen = () => {
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

  const { programasList, get } = useContext(ProgramasContext);



  useEffect(() => {
   
    get();
}, []);

  return (
      <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Programas</h4>
          
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
                  < TableCell > Activo</TableCell >
                  < TableCell > Programa  </TableCell >
                  < TableCell > Clave  </TableCell >
                  < TableCell> Vigencia I</TableCell >
                  <TableCell>Vigencia F</TableCell>
                  < TableCell> Descripción</TableCell >
                  < TableCell colSpan={2} align="center"> Acciones</TableCell >
                </TableRow >
              </TableHead >
              < TableBody >
                {
                     (searched ?
                      programasList.filter(row => row.dsprograma ?
                        row.dsprograma.toLowerCase().includes(searched.toLowerCase()) : null)
                      : programasList
                    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      return (
                        <Programa 
                           key={row.id}
                           programa={row}
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
