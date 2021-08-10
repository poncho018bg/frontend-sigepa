import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import Keycloak from 'keycloak-js';
import { useSelector } from 'react-redux'

let ps;

const keyCloakConfig = process.env.REACT_APP_KEYCLOAK_CONFIG;

let keyck;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  
  const [keycloak, setKeycloak] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(false);
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  
  const kcc = useSelector(state => state.auth)
 
  React.useEffect(() => {

    const keycloak = Keycloak(keyCloakConfig);
    
    keycloak.init({onLoad: 'login-required', checkLoginIframeInterval: 1, enableLogging: true}).then(authenticated => {
      if (keycloak.authenticated) {
        sessionStorage.setItem('token', keycloak.token);
        console.log("token ", keycloak.token)

        setKeycloak(keycloak);
        setAuthenticated(authenticated);
        kcc.keycloak = keycloak;
        kcc.authenticated = authenticated;

        setInterval(() => {
          keycloak.updateToken(30).then(function(refreshed) {
            if (refreshed) {
              sessionStorage.setItem('token', keycloak.token);
              console.log("token ", keycloak.token)
        
              kcc.keycloak = keycloak;
              kcc.authenticated = authenticated;
            } else {
              console.log("Token todavia válido")
            }
          }).catch(function() {
            console.log(error);
            keycloak.logout()
          })
        }, 15000);

      } else {
        keycloak.login();
      }
    })

    
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if(kcc.keycloak) {
      if(authenticated){
        if (navigator.platform.indexOf("Win") > -1) {
          ps = new PerfectScrollbar(mainPanel.current, {
            suppressScrollX: true,
            suppressScrollY: false
          });
          document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
          if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
          }
          window.removeEventListener("resize", resizeFunction);
        };
      }
    }
  }, [mainPanel]);

  if(keycloak) {
    if(authenticated){

      return (
        <div className={classes.wrapper}>
          <Sidebar
            routes={routes}
            logoText={"Fabrica de Software"}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={routes}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
            {getRoute() ? <Footer /> : null}          
          </div>
        </div>
      );
    }
  }
  return (
    <div>Initializing Keycloak...</div>
  );
}
