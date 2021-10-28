import {
  container,
  defaultFont,
  cardTitle,
  roseColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-pro-react.js";

const pricingPageStyle = (theme) => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px",
    },
  },
  title: {
    ...defaultFont,
    color: roseColor,
    marginTop: "5vh",
    marginBottom: "30px",
    textAlign: "center",
  },
  description: {
    fontSize: "18px",
    color: roseColor,
    textAlign: "center",
  },
  cardTitleWhite: {
    ...cardTitle,
    color: grayColor + " !important",
  },
  cardCategory: {
    color: grayColor[0],
    marginTop: "10px",
  },
  cardCategoryWhite: {
    color: roseColor,
    marginTop: "10px",
  },
  icon: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "5px solid " + grayColor[11],
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px",
    },
  },
  iconWhite: {
    color: whiteColor,
  },
  iconRose: {
    color: roseColor[0],
  },
  marginTop30: {
    marginTop: "30px",
  },
});

export default pricingPageStyle;
