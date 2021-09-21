import React, { useContext, useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';
import Button from "components/CustomButtons/Button.js";
import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { Programa } from './Programa';
import Add from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(stylesArchivo);

export const ProgramasScreen = () => {
  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);




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

  const showForm = () => {

  }

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Programas</h4>

          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Link to="../admin/nuevoPrograma">
                  <Button
                    color="white"
                    aria-label="edit"
                    justIcon round
                    onClick={showForm}
                  >

                    <Add style={{ color: "gray" }} />

                  </Button>
                </Link>
              </Grid>
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
                < TableCell> Vigencia Inicial</TableCell >
                <TableCell>Vigencia Final</TableCell>
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
            count={programasList.length}
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
