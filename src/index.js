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

import { Provider } from 'react-redux';
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
import { SubmodulosByPerfilContexProvider } from "contexts/submodulosByPerfilContex";

import { ComiteSecretariasContextProvider } from "contexts/catalogos/comiteSecretariasContext";
import { EdadesBeneficiariosContextProvider } from "contexts/catalogos/edadesBeneficiariosContext";
import { MotivoRechazosContextProvider } from "contexts/catalogos/motivoRechazosContext";
import { NumeroApoyosContextProvider } from "contexts/catalogos/numeroApoyosContext";
import { PeriodicidadApoyosContextProvider } from "contexts/catalogos/periodicidadApoyosContext";
import { CursosCapacitacionesContextProvider } from "contexts/catalogos/CursosCapacitaciones/cursosCapacitacionesContext";
import { ActividadesContinuarContextProvider } from "contexts/catalogos/ActividadesContinuarContext";
import { BtActividadesContextProvider } from "contexts/catalogos/BtActividadesContext";
import { ApoyoServicioContextProvider } from "contexts/catalogos/ApoyoServicioContext";
import { DocumentosContextProvider } from "contexts/catalogos/documentosContext";
import { EstadosContextProvider } from "contexts/catalogos/EstadosContext";
import { MunicipiosContextProvider } from "contexts/catalogos/MunicipiosContext";
import { FirmasContextProvider } from "contexts/catalogos/firmasContext";
import { RegionMunicipiosContextProvider } from "contexts/catalogos/RegionMunicipiosContext";
import { ProgramasContextProvider } from "contexts/catalogos/Programas/programasContext";
import { ApoyoContextProvider } from "contexts/catalogos/ApoyoContext";
import { ClasificacionServiciosContextProvider } from "contexts/catalogos/clasificacionServiciosContext";
import { LocalidadesContextProvider } from "contexts/catalogos/Localidades/localidadesContext";

import { ModalContextConfirmacionProvider } from "contexts/modalContextConfirmacion";

import { RegistroCargaDocumentosContextProvider } from "contexts/registroCargaDocumentosContext"


const hist = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const theme = createMuiTheme({
}, esES);

const renderApp = () => ReactDOM.render(

  <ThemeProvider theme={theme}>


    <Router history={hist}>
      <Provider store={store}>
        <AppState>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
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
    <ModalContextConfirmacionProvider>
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
                                                    <RegionMunicipiosContextProvider>
                                                      <ProgramasContextProvider>
                                                        <ApoyoContextProvider>
                                                          <ClasificacionServiciosContextProvider>
                                                            <LocalidadesContextProvider>
                                                              <RegistroCargaDocumentosContextProvider>
                                                                {children}
                                                              </RegistroCargaDocumentosContextProvider>
                                                            </LocalidadesContextProvider>
                                                          </ClasificacionServiciosContextProvider>
                                                        </ApoyoContextProvider>
                                                      </ProgramasContextProvider>
                                                    </RegionMunicipiosContextProvider>
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
    </ModalContextConfirmacionProvider>
  )
}
