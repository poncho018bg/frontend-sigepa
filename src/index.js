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

import { Provider } from "react-redux";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import { store } from "store/store";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { esES } from "@material-ui/core/locale";
import "./i18n";
import { PersonContextProvider } from "contexts/personContext";
import { ModalContextProvider } from "contexts/modalContex";
import { ModalContextDeleteProvider } from "contexts/modalContexDelete";

import Admin from "layouts/Admin";
import Auth from "layouts/Auth";
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
import { RegistroCargaDocumentosContextProvider } from "contexts/registroCargaDocumentosContext";
import { RegistroSolicitudContextProvider } from "contexts/registroSolicitudContext";
import { ComplementoFursContextProvider } from "contexts/complementoFurContext";
import { EstatusRegistroContextProvider } from "contexts/catalogos/EstatusRegistroContext";
import { EstadosCivilesContextProvider } from "contexts/catalogos/EstadosCivilesContext";
import { GenerosContextProvider } from "contexts/catalogos/GenerosContext";
import { IdentificacionesOficialesContextProvider } from "contexts/catalogos/IdentificacionesOficialesContext";
import { GradoEstudioContextProvider } from "contexts/catalogos/GradoEstudioContext";
import { OrigenSolicitudContextProvider } from "contexts/catalogos/OrigenSolicitudContext";
import { ExpedienteContextProvider } from "contexts/expedienteContext";
import { BeneficiariosContextProvider } from "contexts/BeneficiariosContext";
import { BandejaRechazosContextProvider } from "contexts/BandejaRechazosContext";
import { TipoRequisitosContextProvider } from "contexts/catalogos/TipoRequisitosContext";
import { EstatusSolicitudContextProvider } from "contexts/catalogos/EstatusSolicitudContext";
import { SolicitudEmbozoTarjetasContextProvider } from "contexts/solicitudEmbozoTarjetasContext";
import { TarjetasEmbozadasContextProvider } from "contexts/TarjetasEmbozadasContext";
import { MotivoSuspensionContextProvider } from "contexts/MotivoSuspensionContext";
import { BandejaSuspensionContextProvider } from "contexts/BandejaSuspensionContext";

const hist = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const theme = createTheme({}, esES);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={hist}>
      <Provider store={store}>
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
                                                                    <RegistroSolicitudContextProvider>
                                                                      <ComplementoFursContextProvider>
                                                                        <EstatusRegistroContextProvider>
                                                                          <EstadosCivilesContextProvider>
                                                                            <EstatusRegistroContextProvider>
                                                                              <GenerosContextProvider>
                                                                                <GradoEstudioContextProvider>
                                                                                  <IdentificacionesOficialesContextProvider>
                                                                                    <OrigenSolicitudContextProvider>
                                                                                      <ExpedienteContextProvider>
                                                                                        <BeneficiariosContextProvider>
                                                                                          <BandejaRechazosContextProvider>
                                                                                            <TipoRequisitosContextProvider>
                                                                                              <EstatusSolicitudContextProvider>
                                                                                                <SolicitudEmbozoTarjetasContextProvider>
                                                                                                  <TarjetasEmbozadasContextProvider>
                                                                                                    <MotivoSuspensionContextProvider>
                                                                                                      <BandejaSuspensionContextProvider>
                                                                                                        <Switch>
                                                                                                          <Route
                                                                                                            path="/admin"
                                                                                                            component={
                                                                                                              Admin
                                                                                                            }
                                                                                                          />
                                                                                                          <Route
                                                                                                            path="/public"
                                                                                                            component={
                                                                                                              Auth
                                                                                                            }
                                                                                                          />
                                                                                                          <Redirect
                                                                                                            from="/"
                                                                                                            to="/admin/dashboard"
                                                                                                          />
                                                                                                        </Switch>
                                                                                                      </BandejaSuspensionContextProvider>
                                                                                                    </MotivoSuspensionContextProvider>
                                                                                                  </TarjetasEmbozadasContextProvider>
                                                                                                </SolicitudEmbozoTarjetasContextProvider>
                                                                                              </EstatusSolicitudContextProvider>
                                                                                            </TipoRequisitosContextProvider>
                                                                                          </BandejaRechazosContextProvider>
                                                                                        </BeneficiariosContextProvider>
                                                                                      </ExpedienteContextProvider>
                                                                                    </OrigenSolicitudContextProvider>
                                                                                  </IdentificacionesOficialesContextProvider>
                                                                                </GradoEstudioContextProvider>
                                                                              </GenerosContextProvider>
                                                                            </EstatusRegistroContextProvider>
                                                                          </EstadosCivilesContextProvider>
                                                                        </EstatusRegistroContextProvider>
                                                                      </ComplementoFursContextProvider>
                                                                    </RegistroSolicitudContextProvider>
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
      </Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
