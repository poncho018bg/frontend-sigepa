import React, { useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardActions from '@material-ui/core/CardActions';

import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Grid } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

export const PadronBeneficiariosScreen = () => {
  const { t } = useTranslation();
    const classes = useStyles();
    const [searched, setSearched] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);     
    const [paginas, setPaginas] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  

    return (
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Padrón de beneficiarios</h4>
            <p className={classes.cardCategoryWhite}>
              Pantalla que permite ver el padrón de beneficiarios
            </p>
            <CardActions>
            <Grid container spacing={3}>
          
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
                    < TableCell align="center"> Beneficiario</TableCell >
                    < TableCell align="center"> CURP  </TableCell >
                    < TableCell align="center"> Apoyo otorgado</TableCell >
                    <TableCell align="center">Tipo de apoyo</TableCell>
                    < TableCell align="center"> Año registro programa</TableCell >
                    < TableCell align="center">Periocidad</TableCell >
                    < TableCell align="center">Nùmero de veces</TableCell >
                  </TableRow >
                </TableHead >
                < TableBody >
                  {
                       (searched ?
                        paginas.filter(row => row.dsPagina ?
                          row.dsPagina.toLowerCase().includes(searched.toLowerCase()) : null)
                        : paginas
                      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                        return (
                          <Pagina 
                             key={row.id}
                            pagina={row}
                          />
                        );
                      })
                    }
              </TableBody >
            </ Table>
            < TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                labelRowsPerPage={t('dgv.registrospaginas')}
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
