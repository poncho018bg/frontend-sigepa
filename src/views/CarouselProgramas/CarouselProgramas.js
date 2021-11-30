import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useTranslation } from 'react-i18next';
import { ProgramasContext } from 'contexts/catalogos/Programas/programasContext';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import { useHistory } from "react-router";
import HTMLRenderer from 'react-html-renderer'



const useStyles = makeStyles(styles);

export const CarouselProgramas = () => {
    const { t } = useTranslation();
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [programDetail, setProgramDetail] = useState();
    const { programasList, getProgramasActivos } = useContext(ProgramasContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);




    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {

        getProgramasActivos('1').then(data => {
            setTimeout(() => setLoading(false), 500);

        })

    }, []);



    const detallePrograma = (e) => {
        setOpen(true);
        setProgramDetail(e)
        console.log('detallePrograma=>', e)
    }


    const handleClose = () => {
        setOpen(false);
    };

    const redirectRegister = (programDetail) => {
        console.log("deatalle del programa  ====>", programDetail);
        setOpen(false);
        history.push("/admin/registroSolicitud", { mobNo: programDetail.id })
    };
    return (
        <div style={{ paddingTop: "10%" }}>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={8000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-10-px"
                style={{ paddingTop: "10%", }}
            >

                {programasList.map(prog => {
                    return (
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={10}>
                                    <Card product className={classes.cardHover}>

                                        <CardBody>

                                            <h4 className={classes.cardProductTitle}>
                                                {prog.dsprograma}
                                            </h4>
                                            <p className={classes.cardProductDesciprion} >
                                                {prog.dsdescripcion}
                                            </p>
                                        </CardBody>
                                        <CardFooter>
                                            <Link color="inherit" onClick={() => detallePrograma(prog)} variant="body2">
                                                <h4>Ver más</h4>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </div>
                    )
                })}

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg" fullWidth={true}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {console.log('x=>', programDetail)}
                        <h2> {programDetail?.dsclaveprograma} - {programDetail?.dsprograma} </h2>
                    </DialogTitle>
                    <DialogContent >

                        <p>{programDetail?.dsdescripcion}</p>
                        <p>
                            <HTMLRenderer
                                html={programDetail?.dsobjetivo}
                                components={{
                                }}
                            />
                        </p>
                        <p>Vigencia del Programa del {moment(programDetail?.fcvigenciainicio).format(" DD [de] MMMM ")}
                            al {moment(programDetail?.fcvigenciafin).format(" DD [de] MMMM  YYYY ")}</p>
                        <p>Periodo de registro presencial del {moment(programDetail?.fcregistropresencialinicio).format(" DD [de] MMMM ")}
                            al {moment(programDetail?.fcregistropresencialfin).format(" DD [de] MMMM  YYYY ")}</p>
                        <p>Periodo de registro Web del {moment(programDetail?.fcregistrowebinicio).format(" DD [de] MMMM ")}
                            al  {moment(programDetail?.fcregistrowebfin).format(" DD [de] MMMM  YYYY ")}</p>
                        {programDetail?.existeTipoApoyoPrograma === true ?
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>URL del programa {programDetail?.existeTipoApoyoPrograma}</h4>
                                </CardHeader>
                                <CardBody>
                                    <h5>{window.location.origin}/frontend-sigepa/public/registroProgramas?programa={programDetail?.dsurl}</h5>
                                </CardBody>
                            </Card>
                            : <h5>No se guardo el tipo de apoyo del programa</h5>
                        }
                    </DialogContent>
                    <DialogActions>
                        {programDetail?.existeTipoApoyoPrograma === true ?
                            <Button autoFocus onClick={() => redirectRegister(programDetail)} color="primary" disabled={!programDetail?.registroPresencial}>
                                Registro solicitud de apoyo
                            </Button>
                            : <Button color="primary" disabled='True'>
                                Registro solicitud de apoyo
                            </Button>}
                    </DialogActions>
                </Dialog>




            </Carousel>
        </div>
    )
}