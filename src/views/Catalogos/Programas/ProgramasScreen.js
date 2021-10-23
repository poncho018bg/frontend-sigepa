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
import Add from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { Loading } from "components/Personalizados/Loading";
import { TiposBeneficiariosContext } from 'contexts/catalogos/tiposBeneficiariosContext';
import { EdadesBeneficiariosContext } from 'contexts/catalogos/edadesBeneficiariosContext';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(stylesArchivo);

/**
 * Los siguientes imports se utilizan para el deshabilitar y editar programa
 */
import moment from 'moment';
import 'moment/locale/es';
import { ModalDelete } from 'commons/ModalDelete';
import { ModalContextDelete } from 'contexts/modalContexDelete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import BlockIcon from '@material-ui/icons/Block';
import { useHistory } from 'react-router';

export const ProgramasScreen = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(0);

  const { programasList, get,
    sizeP,
    pageP,
    totalP,
    changePageSize,
    changePage, changePageNumber,getByParametros} = useContext(ProgramasContext);

  const { getTipoBeneficiarios } = useContext(TiposBeneficiariosContext);
  const { getEdadesBeneficiarios } = useContext(EdadesBeneficiariosContext);



  const handleChangePage = (event, newPage) => {
    setLoading(true);
    changePage(newPage)
    setPagina(newPage);
  };

  useEffect(() => {

    get().then(data => {
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

    get().then(data => {
      setTimeout(() => setLoading(false), 500);

    });;

  }, []);

  const showForm = () => {

  }




  /**
   * consstantes para el deshabilitar
   */
  const [idEliminar, setIdEliminar] = useState();
  const { setShowModalDelete } = useContext(ModalContextDelete);
  const { eliminar } = useContext(ProgramasContext);
  const [objetoActualizar, setObjetoActualizar] = useState();
  let history = useHistory();


  /**
   * Aqui se abre el modal para deshabilitar y se llena el dato a eliminar
   * @param {programa} programa 
   */
  const onClick = programa => {
    setShowModalDelete(true);
    console.log("seleccionado ", programa.id);
    setIdEliminar(programa);
  }

  /**
   * Se deshabilita usando el jsonEliminar
   */
  const handleDeshabilitar = () => {
    setShowModalDelete(false);
    console.log('entro el deshabilitar idEliminar ---->', idEliminar);
    eliminar(idEliminar);
  }

  /**
   * Este es para abrir el editar; revisar funcionalidad del objeto actualizar
   * @param {objeto} e 
   */
  const onSelect = (e) => {
    console.log("on select del programa -->\n", e);
    console.log("id editar", e.id);
    setObjetoActualizar(e);
    //history.push(`/admin/editarPrograma/${e.id}`)
    history.push("/admin/editarPrograma", { mobNo: e.id })
  }

  const buscaPorParametros = (search) => {
    if(search === ''){
      get();
    }else{
      getByParametros(search)
    }
   
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
                    <Link to="../admin/nuevoPrograma">
                      <Button
                        color="white"
                        aria-label="edit"
                        justIcon round
                        onClick={showForm}
                      >
                        <Add />
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <SearchBar
                      placeholder={t('lbl.buscar')}
                      value={searched}
                      onChange={(searchVal) => buscaPorParametros(searchVal)}
                      onCancelSearch={() => buscaPorParametros('')}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </CardHeader>
            <CardBody>
              < Table stickyHeader aria-label="sticky table" >
                < TableHead >
                  < TableRow key="898as" >
                    < TableCell align="center"> Estatus</TableCell >
                    < TableCell align="center"> Programa  </TableCell >
                    < TableCell align="center"> Clave  </TableCell >
                    < TableCell align="center"> Vigencia del Programa</TableCell >
                    < TableCell align="center">Periodo de Registro Web</TableCell>
                    < TableCell align="center">Periodo de Registro Presencial</TableCell>

                    < TableCell colSpan={2} align="center"> Acciones</TableCell >
                  </TableRow >
                </TableHead >
                < TableBody >
                  {
                    programasList.map(row => {
                      return (
                        <>
                          < TableRow key={row.id} >
                            <TableCell align="center">
                              {row.activo ? 'Activo' : 'Inactivo'}
                            </TableCell>
                            <TableCell align="center">{row.dsprograma}</TableCell>
                            <TableCell align="center">{row.dsclaveprograma}</TableCell >
                            <TableCell align="center">{moment(row.fcvigenciainicio).format("DD MMMM")} - {moment(row.fcvigenciafin).format(" DD MMMM YYYY")}</TableCell>
                            <TableCell align="center">{moment(row.fcregistrowebinicio).format("DD MMMM")} - {moment(row.fcregistrowebfin).format(" DD MMMM YYYY")}</TableCell>
                            <TableCell align="center">{moment(row.fcregistropresencialinicio).format("DD MMMM")} - {moment(row.fcregistropresencialfin).format(" DD MMMM YYYY")}</TableCell>


                            <TableCell align="center">
                              <IconButton aria-label="create" onClick={() => onSelect(row)}>

                                <CreateIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                name="deshabilitar"
                                aria-label="create"
                                onClick={() => onClick(row)}>
                                <BlockIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow >
                          <ModalDelete
                            handleDeshabilitar={handleDeshabilitar}
                          />
                        </>
                      );
                    })
                  }
                </TableBody>
              </ Table>
              < TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                labelRowsPerPage={t('dgv.registrospaginas')}
                count={totalP}
                rowsPerPage={sizeP}
                page={pageP}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardBody>
          </Card>

        </GridItem>
      )
      }
    </>


  )
}
