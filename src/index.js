/*!
=========================================================
* Template Fabrica de Software 3 - v1.0
=========================================================

* Template Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Fabrica de Software 3 (https://www.casystem.com)
* Template para diversos proyectos
* Elaborado  por C&A Systems.
* Se prohibe la reproducción total y/o parcial.
* Coded by Fabrica de Software 3
=========================================================
*/

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
//import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import { Provider, useDispatch, useSelector } from 'react-redux';
import "assets/css/material-dashboard-react.css?v=1.9.0";
import { store } from "store/store";


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';
import { PersonContextProvider } from "contexts/personContext";
import { ModalContextProvider } from "contexts/modalContex";
import { ModalContextDeleteProvider } from "contexts/modalContexDelete";

import HttpService from "./servicios/HttpService";
import UserService from "./servicios/UserService";
import Admin from "./views/Admin";
import { ModuloContextProvider } from "contexts/moduloContext";
import { ModalContextUpdateProvider } from "contexts/modalContexUpdate";
import { SubModuloContextProvider } from "contexts/subModuloContext";
import { ModuloSubContextProvider } from "contexts/moduloSubContext";
import { TiposApoyosContextProvider } from "contexts/catalogos/tiposApoyosContext";
import { TiposBeneficiariosContextProvider } from "contexts/catalogos/tiposBeneficiariosContext";
import RenderGroup from "components/RenderGroup"
import { SubmodulosByPerfilContexProvider } from "contexts/submodulosByPerfilContex";

import { ComiteSecretariasContextProvider } from "contexts/catalogos/comiteSecretariasContext";
import { EdadesBeneficiariosContextProvider } from "contexts/catalogos/edadesBeneficiariosContext";
import { MotivoRechazosContextProvider } from "contexts/catalogos/motivoRechazosContext";
import { NumeroApoyosContextProvider } from "contexts/catalogos/numeroApoyosContext";
import { PeriodicidadApoyosContextProvider } from "contexts/catalogos/periodicidadApoyosContext";
import { obtenerRolesAction } from "actions/rolesKeycloakAction";
import { getSubmodulosByperfil } from "actions/perfilSubmoduloAction";
import { CursosCapacitacionesContextProvider } from "contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext";
import { ActividadesContinuarContextProvider } from "contexts/catalogos/ActividadesContinuarContext";
import { BtActividadesContextProvider } from "contexts/catalogos/BtActividadesContext";
import { ApoyoServicioContextProvider } from "contexts/catalogos/ApoyoServicioContext";
import { DocumentosContextProvider } from "contexts/catalogos/documentosContext";
import { EstadosContextProvider } from "contexts/catalogos/EstadosContext";
import { MunicipiosContextProvider } from "contexts/catalogos/MunicipiosContext";
import { FirmasContextProvider } from "contexts/catalogos/firmasContext";

//const hist = createBrowserHistory();

const hist = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const theme = createMuiTheme({
}, esES);

const renderApp = () => ReactDOM.render(

  <ThemeProvider theme={theme}>
    {console.log("grupos {}", UserService.getGroups())}

    <Router history={hist}>
      <Provider store={store}>
        <AppState>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
            {/* <Route path="/rtl" component={RTL} />
                              {RenderGroup("/administrador") === true ?
                                <Redirect from="/" to="/admin/dashboard" /> :
                                <Redirect from="/" to="/admin/dashboardPublic" />
                              } */}
          </Switch>
        </AppState>
      </Provider>
    </Router></ThemeProvider>,
  document.getElementById("root")
);

HttpService.configure();
UserService.initKeycloak(renderApp);


const AppState = ({ children }) => {
  return (
    <ModalContextProvider>
      <ModalContextDeleteProvider>
        <ModalContextUpdateProvider>
          <PersonContextProvider>
            <ModuloContextProvider>
              <SubModuloContextProvider>
                <ModuloSubContextProvider>
                  <SubmodulosByPerfilContexProvider>
                    <TiposApoyosContextProvider>
                      <TiposBeneficiariosContextProvider>
                        <ComiteSecretariasContextProvider>
                          <EdadesBeneficiariosContextProvider>
                            <MotivoRechazosContextProvider>
                              <NumeroApoyosContextProvider>
                                <PeriodicidadApoyosContextProvider>
                                  <CursosCapacitacionesContextProvider>
                                    <ActividadesContinuarContextProvider>
                                      <BtActividadesContextProvider>
                                        <ApoyoServicioContextProvider>
                                          <DocumentosContextProvider>
                                            <EstadosContextProvider>
                                              <MunicipiosContextProvider>
                                                <FirmasContextProvider>
                                                  {children}
                                                </FirmasContextProvider>
                                              </MunicipiosContextProvider>
                                            </EstadosContextProvider>
                                          </DocumentosContextProvider>
                                        </ApoyoServicioContextProvider>
                                      </BtActividadesContextProvider>
                                    </ActividadesContinuarContextProvider>
                                  </CursosCapacitacionesContextProvider>
                                </PeriodicidadApoyosContextProvider>
                              </NumeroApoyosContextProvider>
                            </MotivoRechazosContextProvider>
                          </EdadesBeneficiariosContextProvider>
                        </ComiteSecretariasContextProvider>
                      </TiposBeneficiariosContextProvider>
                    </TiposApoyosContextProvider>
                  </SubmodulosByPerfilContexProvider>
                </ModuloSubContextProvider>
              </SubModuloContextProvider>
            </ModuloContextProvider>
          </PersonContextProvider>
        </ModalContextUpdateProvider>
      </ModalContextDeleteProvider>
    </ModalContextProvider>
  )
}

/*
const hist = createBrowserHistory();

const theme = createMuiTheme({
}, esES);
*/
/*
ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Router history={hist}>
     <Provider store={store}>
       <ModalContextProvider>
         <ModalContextDeleteProvider>
          <PersonContextProvider>
              <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/rtl" component={RTL} />
                <Redirect from="/" to="/admin/dashboard" />
              </Switch>
            </PersonContextProvider>
            </ModalContextDeleteProvider>
        </ModalContextProvider>
    </Provider>
  </Router></ThemeProvider>,
  document.getElementById("root")
);
*/
