import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export const CarouselProgramas = () => {

    const classes = useStyles();
    const [priceImage1, setPriceImage1] = React.useState(
        require("assets/img/card-1.jpeg").default
      );

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
                itemClass="carousel-item-padding-40-px"
                style={{ paddingTop: "10%",  }}
            >
                <div>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={10}>
                            <Card product className={classes.cardHover}>
                                <CardHeader image className={classes.cardHeaderHover}>
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img src={priceImage1} alt="..."  />
                                    </a>
                                </CardHeader>
                                <CardBody>
                                    <div className={classes.cardHoverUnder}>
                                        <Tooltip
                                            id="tooltip-top"
                                            title="View"
                                            placement="bottom"
                                            classes={{ tooltip: classes.tooltip }}
                                        >
                                            <Button color="transparent" simple justIcon>
                                                <ArtTrack className={classes.underChartIcons} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            id="tooltip-top"
                                            title="Edit"
                                            placement="bottom"
                                            classes={{ tooltip: classes.tooltip }}
                                        >
                                            <Button color="success" simple justIcon>
                                                <Refresh className={classes.underChartIcons} />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            id="tooltip-top"
                                            title="Remove"
                                            placement="bottom"
                                            classes={{ tooltip: classes.tooltip }}
                                        >
                                            <Button color="danger" simple justIcon>
                                                <Edit className={classes.underChartIcons} />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <h4 className={classes.cardProductTitle}>
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            Cozy 5 Stars Apartment
                                        </a>
                                    </h4>
                                    <p className={classes.cardProductDesciprion}>
                                        The place is close to Barceloneta Beach and bus stop just 2 min
                                        by walk and near to {'"'}Naviglio{'"'} where you can enjoy the
                                        main night life in Barcelona.
                                    </p>
                                </CardBody>
                                <CardFooter product>
                                    <div className={classes.price}>
                                        <h4>$899/night</h4>
                                    </div>
                                    <div className={`${classes.stats} ${classes.productStats}`}>
                                        <Place /> Barcelona, Spain
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>

                </div>

            </Carousel>
        </div>
    )
}