import React, { useContext, useEffect, useState } from 'react'
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import CardActions from '@material-ui/core/CardActions';
import Button from "components/CustomButtons/Button.js";
import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,Grid } from '@material-ui/core';
import { stylesArchivo } from 'css/stylesArchivo';
import SearchBar from 'material-ui-search-bar';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { Programa } from './Programa';
import Add from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { Loading } from "components/Personalizados/Loading";
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
const useStyles = makeStyles(stylesArchivo);

export const ProgramasScreen = () => {
  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(0);

  const { programasList, get ,
    sizeP,
    pageP,
    totalP,
    changePageSize,
    changePage,changePageNumber} = useContext(ProgramasContext);

  const { getTipoBeneficiarios } = useContext(TiposBeneficiariosContext);
  const { getEdadesBeneficiarios } = useContext(EdadesBeneficiariosContext);



  const handleChangePage = (event, newPage) => {
    setLoading(true);
    changePage(newPage)
    setPagina(newPage);
  };

  useEffect(() => {

    get().then (data => {
      setTimeout(() => setLoading(false), 500);
      
    });
    getTipoBeneficiarios();
    getEdadesBeneficiarios();

  }, [pagina])

  const handleChangeRowsPerPage = event => {
    changePageSize(+event.target.value);
     changePage(0)
  };


  useEffect(() => {
    
    get().then (data => {
      setTimeout(() => setLoading(false), 500);
    
    });;

}, []);

  const showForm=()=>{

  }

  return (
    <>        
     {loading ? (
        <Loading
          loading={loading}
        />
      ) : (
      <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Programas</h4>
          
          <CardActions>
          <Grid container spacing={3}>
            <Grid item xs={6}>
                                  <Button
                                      color="white"
                                      aria-label="edit"
                                      justIcon round
                                      onClick={showForm}
                                  >
                                     <Link to="../admin/nuevoPrograma">
                                        <Add />
                                      </Link>
                                  </Button>
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
                  < TableCell > Estatus</TableCell >
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
                    ).map(row => {
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
                count={totalP}
                rowsPerPage={sizeP}
                page={pageP}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
        </CardBody>
      </Card>
    
    </GridItem> 
       )}
    </>
     
     
  )
}
