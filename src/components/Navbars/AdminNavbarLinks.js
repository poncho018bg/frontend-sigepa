import React , { useEffect, useState }from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import { useDispatch,useSelector } from 'react-redux'

import UserService from "../../servicios/UserService";
import { DialogLogOut } from "views/Dialogs/DialogLogOut";
import { cerrarSesion } from "actions/SesionAction";


const useStyles = makeStyles(styles);


export default function AdminNavbarLinks() {
  const logout = () => {
    setOpenProfile(null);
    setOpenDialog(true);
  }
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [logo, setLogo] = React.useState(
    require("assets/img/edomexLogo.png").default
  );
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleDeshabilitar = () => {
    dispatch(cerrarSesion());
    UserService.doLogout();
    setOpenDialog(false);
}
  return (
    <div>
      <div className={classes.searchWrapper}>
      
      </div>
      
      <div className={classes.manager}>
      
      </div>
      <div className={classes.manager}>
      <img src={logo} alt="EDOMEX" style={{width:'230px', height:'60px'}} />
      </div>
              
      <DialogLogOut
openDialog={openDialog}
setOpenDialog={setOpenDialog}
handleDeshabilitar={handleDeshabilitar}
/>
    </div>


  );
}
