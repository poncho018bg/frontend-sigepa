import { bandejaStartLoading } from 'actions/bandejaAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { axiosGet } from 'helpers/axios';
import { DialogShowDetalleBandeja } from './DialogShowDetalleBandeja';

const useStyles = makeStyles(styles);



export const BandejaScreen = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [showDialogForm, setShowDialogForm] = useState(false);

    const [endPoint, setEndPoint] = useState();
    const [descripcion, setDescripcion] = useState()

    const defaultColumnProperties = {
        width: 300
    };

    
    const onSelect = (id) => {
        axiosGet(`bandejas/${ id }` ).then(data => {
          setEndPoint(data.tipoBandeja.endPoint);
          setDescripcion(data.tipoBandeja.descripcion);
       });
       setShowDialogForm(true);
    }
    
    const columns = [
        {
            field: 'id',
            headerName: 'Id bandeja',
        },
        {
            field: 'fechaRegistro',
            headerName: 'Fecha Registro'
            
        },
        {
            field: 'editar',
            headerName: 'Detalle',
            renderCell: (params) => (
                <strong>
                    {params.value}
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 16 }}
                        onClick={() => onSelect(params.id)}
                    >
                       Detalle
                    </Button>
                </strong>
            ),
        },
    ].map(c => ({ ...c, ...defaultColumnProperties }));

    
    useEffect(() => {
        dispatch(bandejaStartLoading());
    }, [dispatch]);

    const  {bandeja}  = useSelector( state => state.bandeja );
    const rows = bandeja;
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                Lista de Bandejas
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Bandejas disponibles en el sistema a los cuales se les asignará una bandeja
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid key="bandeja_grid" rows={rows} columns={columns} />
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>

                <DialogShowDetalleBandeja 
                    showDialogForm={showDialogForm}
                    setShowDialogForm={setShowDialogForm}
                    endPoint={endPoint}
                    descripcion={descripcion}
                />
            </GridContainer>
        </div>
    );
}
