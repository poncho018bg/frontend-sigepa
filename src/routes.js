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
// @material-ui/icons
import Image from "@material-ui/icons/Image";
import FolderIcon from '@material-ui/icons/Folder';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import { Home } from "@material-ui/icons";

// core components/views for Admin layout
import { ModuloScreen } from "views/Modulos/ModuloScreen";
import { RolesScreen } from "views/Roles/RolesScreen";

// core components/views for RTL layout
import { SubModuloScreen } from "views/SubModulos/SubModuloScreen";
import { TipoApoyoScreen } from "views/Catalogos/TipoApoyo/TipoApoyoScreen"

import { EdadesBeneficiariosScreen } from "views/Catalogos/EdadesBeneficiarios/EdadesBeneficiariosScreen";
import { MotivoRechazosScreen } from "views/Catalogos/MotivoRechazos/MotivoRechazosScreen";
import { PeriodicidadApoyosScreen } from "views/Catalogos/PeriodicidadApoyos/PeriodicidadApoyosScreen";
import { NumeroApoyosScreen } from "views/Catalogos/NumeroApoyos/NumeroApoyosScreen";
import { CursosCapacitacionesScreen } from "views/Catalogos/CursosCapacitaciones/CursosCapacitacionesScreen";
import { CatalogosScreen } from "views/Catalogos/CatalogosScreen";
import { ContinuidadActividadesScreen } from "views/Catalogos/ContinuidadActividades/ContinuidadActividadesScreen";
import { BitacoraActividadesScreen } from "views/Catalogos/BitacoraActividades/BitacoraActividadesScreen";
import { ApoyoServicioScreen } from "views/Catalogos/ApoyoServicio/ApoyoServicioScreen";
import { CatTipoApoyoScreen } from "views/Catalogos/CatTipoApoyo/CatTipoApoyoScreen";
import { ProgramasScreen } from "views/Catalogos/Programas/ProgramasScreen";

import { DocumentosScreen } from "views/Catalogos/DocumentosRequisitos/DocumentosScreen";
import { PadronBeneficiariosScreen } from "views/Catalogos/PadronBeneficiarios/PadronBeneficiariosScreen";
import { EstadosScreen } from "views/Catalogos/Estados/EstadosScreen";
import { MunicipiosScreen } from "views/Catalogos/Municipios/MunicipiosScreen";
import { RegionMunicipioScreen } from "views/Catalogos/RegionMunicipio/RegionMunicipioScreen";

import { FirmasScreen } from "views/Catalogos/Firmas/FirmasScreen";
import { ClasificacionServiciosScreen } from "views/Catalogos/ClasificacionServicios/ClasificacionServiciosScreen";
import { DialogTipoApoyoForm } from "views/Catalogos/CatTipoApoyo/DialogTipoApoyoForm";

import { ProgramasForm } from "views/Catalogos/Programas/ProgramasForm";
import { ProgramasEdit } from "views/Catalogos/Programas/ProgramasEdit";
import { DialogTipoApoyoFormEdit } from "views/Catalogos/CatTipoApoyo/DialogTipoApoyoFormEdit";
import { SubCatalogsBaseScreen } from "views/Catalogos/SubCatalogsBaseScreen";
import { TipoBeneficiarioScreen } from "views/Catalogos/TiposBeneficiarios/TipoBeneficiarioScreen";
import WidgetsIcon from "@material-ui/icons/Widgets";
import { RegistroProgramasApoyoScreen } from "views/RegistroProgramasApoyo/RegistroProgramasApoyoScreen";

import { CarouselProgramas } from "views/CarouselProgramas/CarouselProgramas";
import { RegistroSolicitud } from "views/RegistroSolicitudContacto/RegistroSolicitud";
import { LocalidadScreen } from "views/Catalogos/Localidad/LocalidadScreen";
import { RegistroPrueba } from "views/Formio/RegistroPrueba";
import { RegistroProgramas } from "views/UsuarioPublico/RegistroProgramas.js"
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import { BandejaSolicitudes } from "views/BandejaGeneral/BandejaSolicitudes";
import { EstadoCivilScreen } from "views/Catalogos/EstadosCiviles/EstadoCivilScreen";
import { EstatusRegistroScreen } from "views/Catalogos/EstatusRegistro/EstatusRegistroScreen";
import { GeneroScreen } from "views/Catalogos/Generos/GeneroScreen";
import { GradoEstudioScreen } from "views/Catalogos/GradoEstudios/GradoEstudioScreen";
import { IdentificacioneScreen } from "views/Catalogos/Identificaciones/IdentificacioneScreen";
import { BitacoraScreen } from "views/Catalogos/BitacoraActividades/BitacoraScreen";
import { BandejaSolicitudesRegistradas } from "views/BandejaGeneral/BandejaSolicitudesRegistradas";
import { BandejaSolicitudesValidadas } from "views/BandejaGeneral/BandejaSolicitudesValidadas";
import { BandejaAutorizaSolicitudes } from "views/BandejaGeneral/BandejaAutorizaSolicitudes";
import { ConsultaExpediente } from "views/Expediente/ConsultaExpediente"
import { PadronBeneficiariasScreen } from "views/PadronBeneficiarios/PadronBeneficiariasScreen";
import { Expediente } from "views/Expediente/Expediente"
import { Expedienteapi } from "views/Expediente/Expedienteapi";
import { PrintPdfScreen } from "views/TestPrintPdf/PrintPdfScreen";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Home,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Administración General",
    rtlName: "ag",
    icon: FolderIcon,
    state: "adminCollapse",
    views: [
      {
        path: "/roles",
        name: "Administración de perfiles",
        rtlName: "roles",
        mini: "R",
        rtlMini: "r",
        component: RolesScreen,
        layout: "/admin",
      },
      {
        path: "/catalogos",
        name: "Catálogos administrables",
        rtlName: "cat",
        mini: "M",
        rtlMini: "m",
        component: CatalogosScreen,
        layout: "/admin"
      },
      {
        path: "/subcatalogosbase",
        name: "Subcatálogos base",
        rtlName: "scat",
        mini: "sM",
        rtlMini: "sm",
        component: SubCatalogsBaseScreen,
        layout: "/admin"
      },

      {
        path: "/registroProgramasApoyo",
        name: "Widgets",
        rtlName: "الحاجيات",
        icon: WidgetsIcon,
        component: RegistroProgramasApoyoScreen,
        layout: "/admin",
      },
      {
        path: "/bitacora",
        name: "Bitácora",
        rtlName: "bit",
        mini: "bit",
        rtlMini: "bit",
        component: BitacoraScreen,
        layout: "/admin"
      },

    ]
  },
  {
    collapse: true,
    name: "Catálogos administrativos",
    rtlName: "ag",
    icon: FolderIcon,
    state: "catalogosAdminCollapse",
    views: [
      {
        path: "/modulos",
        name: "Modulos",
        rtlName: "modulos",
        mini: "M",
        rtlMini: "m",
        component: ModuloScreen,
        layout: "/admin"
      },
      {
        path: "/submodulos",
        name: "Submódulos",
        rtlName: "submodulos",
        mini: "SB",
        rtlMini: "sb",
        component: SubModuloScreen,
        layout: "/admin"
      },

      {
        path: "/tiposApoyos",
        name: "Tipos de Apoyo",
        rtlName: "tipoapoyo",
        mini: "TA",
        rtlMini: "ta",
        component: TipoApoyoScreen,
        layout: "/admin"
      },

      {
        path: "/tiposBeneficiario",
        name: "Tipos de Beneficiarios",
        rtlName: "tipobeneficiario",
        mini: "TB",
        rtlMini: "tb",
        component: TipoBeneficiarioScreen,
        layout: "/admin"
      },
      /*
      {
        path: "/comitessecretarias",
        name: "Comites Secretarías",
        rtlName: "comitesecretarias",
        mini: "CS",
        rtlMini: "cs",
        component: ComiteSecretariasScreen,
        layout: "/admin"
      },
*/
      {
        path: "/edadesBeneficiarios",
        name: "Edades Beneficiarios",
        rtlName: "edadesbeneficiarios",
        mini: "EB",
        rtlMini: "eb",
        component: EdadesBeneficiariosScreen,
        layout: "/admin"
      },
      {
        path: "/numeroApoyos",
        name: "Número de Apoyos",
        rtlName: "numapoyos",
        mini: "NA",
        rtlMini: "na",
        component: NumeroApoyosScreen,
        layout: "/admin"
      },
      {
        path: "/periodicidadApoyos",
        name: "Periodicidad Apoyos",
        rtlName: "periodicidadapoyos",
        mini: "PA",
        rtlMini: "pa",
        component: PeriodicidadApoyosScreen,
        layout: "/admin"
      },

      {
        path: "/periodicidadApoyos",
        name: "Loclidades",
        rtlName: "periodicidadapoyos",
        mini: "PA",
        rtlMini: "pa",
        component: PeriodicidadApoyosScreen,
        layout: "/admin"
      },
      {
        path: "/estados",
        name: "Estados",
        rtlName: "estados",
        mini: "ES",
        rtlMini: "ES",
        component: EstadosScreen,
        layout: "/admin"
      },
      {
        path: "/municipios",
        name: "Municipios",
        rtlName: "municipios",
        mini: "MUN",
        rtlMini: "MUN",
        component: MunicipiosScreen,
        layout: "/admin"
      },
      {
        path: "/regionmunicip",
        name: "Regiones",
        rtlName: "Regiones",
        mini: "regmun",
        rtlMini: "regmun",
        component: RegionMunicipioScreen,
        layout: "/admin"
      },

    ]
  },
  {
    collapse: true,
    name: "Bandeja general de solicitudes",
    rtlName: "bgs",
    icon: MoveToInboxIcon,
    state: "bandejaSolgrlCollapse",
    views: [
      {
        path: "/busquedasolicitudes",
        name: "Búsqueda de solicitudes",
        rtlName: "Búsqueda de solicitudes",
        mini: "bs",
        rtlMini: "bs",
        component: BandejaSolicitudes,
        layout: "/admin"
      },
      {
        path: "/bandejasolicitudesregistradas",
        name: "Bandeja de solicitudes registradas",
        rtlName: "Bandeja de solicitudes registradas",
        mini: "bsr",
        rtlMini: "bsr",
        component: BandejaSolicitudesRegistradas,
        layout: "/admin"
      },
      {
        path: "/bandejasolicitudesvalidadas",
        name: "Bandeja de solicitudes validadas",
        rtlName: "Bandeja de solicitudes validadas",
        mini: "bsr",
        rtlMini: "bsr",
        component: BandejaSolicitudesValidadas,
        layout: "/admin"
      },
      {
        path: "/bandejaautorizasolicitudes",
        name: "Bandeja general autorización de solicitudes",
        rtlName: "Bandeja general autorización de solicitudes",
        mini: "bsr",
        rtlMini: "bsr",
        component: BandejaAutorizaSolicitudes,
        layout: "/admin"
      }
    ]
  }
  , {
    collapse: true,
    name: "Entrega de Apoyos",
    rtlName: "صفحات",
    icon: LocalShippingIcon,
    state: "entrgApoyosCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Módulos de dispersión",
    rtlName: "صفحات",
    icon: CreditCardIcon,
    state: "modDispCollapse",
    views: [
      {
      }
    ]
  },

  {
    collapse: true,
    name: "Dashboard",
    rtlName: "صفحات",
    icon: EqualizerIcon,
    state: "dashCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Reportes",
    rtlName: "صفحات",
    icon: TimelineIcon,
    state: "reportesCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Buzón de Notificaciones",
    rtlName: "صفحات",
    icon: MarkunreadMailboxIcon,
    state: "buzoNotificacionesCollapse",
    views: [
      {
      }
    ]
  },

  {
    collapse: true,
    name: "Módulo de atención",
    rtlName: "mda",
    icon: MarkunreadMailboxIcon,
    state: "modAtencionCollapse",
    views: [

      {
        path: "/consultaProgramas",
        name: "Consulta de programas",
        rtlName: "scat",
        mini: "sM",
        rtlMini: "sm",
        component: CarouselProgramas,
        layout: "/admin"
      },

      {
        path: "/padron",
        name: "Padrón de beneficiarias",
        rtlName: "pbf",
        mini: "pbf",
        rtlMini: "pbf",
        component: PadronBeneficiariasScreen,
        layout: "/admin"
      },

      {
        path: "/consultaExpediente",
        name: "Consulta de expedientes",
        rtlName: "ce",
        mini: "sM",
        rtlMini: "sm",
        component: ConsultaExpediente,
        layout: "/admin"
      },
      {
        path: "/expediente",
        name: "Expediente",
        rtlName: "ce",
        mini: "sM",
        rtlMini: "sm",
        component: Expediente,
        layout: "/admin"
      },

      {
        path: "/expedienteapi",
        name: "Expediente api",
        rtlName: "ce",
        mini: "sM",
        rtlMini: "sm",
        component: Expedienteapi,
        layout: "/admin"
      },
    ]
  },

  //CATALOGOS
  {
    collapse: true,
    name: "Catalogos",
    rtlName: "صفحات",
    icon: Image,
    state: "catCollapse",
    views: [
      {
        path: "/motivosRechazos",
        name: "Motivos Rechazos",
        rtlName: "motivosrechazos",
        mini: "MR",
        rtlMini: "mr",
        component: MotivoRechazosScreen,
        layout: "/admin"
      },


      {
        path: "/continuidadActividades",
        name: "Continuidad Actividades",
        rtlName: "ContinuidadActividades",
        mini: "CA",
        rtlMini: "CA",
        component: ContinuidadActividadesScreen,
        layout: "/admin"
      },
      {
        path: "/bitacoraActividades",
        name: "Bitácora Actividades",
        rtlName: "BitacoradActividades",
        mini: "BA",
        rtlMini: "BA",
        component: BitacoraActividadesScreen,
        layout: "/admin"
      },

      {
        path: "/apoyoservicio",
        name: "Apoyo servicios",
        rtlName: "apoyoservicio",
        mini: "AS",
        rtlMini: "AS",
        component: ApoyoServicioScreen,
        layout: "/admin"
      },
      {
        path: "/catapoyoservicio",
        name: "Apoyo servicios",
        rtlName: "apoyoservicio",
        mini: "AS",
        rtlMini: "AS",
        component: CatTipoApoyoScreen,
        layout: "/admin"
      },
      {
        path: "/programas",
        name: "Programas",
        rtlName: "programas",
        mini: "AS",
        rtlMini: "AS",
        component: ProgramasScreen,
        layout: "/admin"
      },

      {
        path: "/nuevoPrograma",
        name: "Nuevo Programa",
        rtlName: "programas",
        mini: "AS",
        rtlMini: "AS",
        component: ProgramasForm,
        layout: "/admin"
      },
      {
        path: "/editarPrograma",
        name: "Editar Programa",
        rtlName: "programas",
        mini: "AS",
        rtlMini: "AS",
        component: ProgramasEdit,
        layout: "/admin"
      },
      {
        path: "/padronBeneficiarios",
        name: "Padron Beneficiarios",
        rtlName: "padronBeneficiarios",
        mini: "AS",
        rtlMini: "AS",
        component: PadronBeneficiariosScreen,
        layout: "/admin"
      }, {
        path: "/documentoRequisito",
        name: "Documentos",
        rtlName: "Documentos",
        mini: "DR",
        rtlMini: "DR",
        component: DocumentosScreen,
        layout: "/admin"
      },
      {
        path: "/cursosCapacitaciones",
        name: "Cursos Capacitaciones",
        rtlName: "cursoscapacitaciones",
        mini: "PA",
        rtlMini: "pa",
        component: CursosCapacitacionesScreen,
        layout: "/admin"
      },
      {
        path: "/firmas",
        name: "Catalogo Firmas",
        rtlName: "Firmas",
        mini: "CF",
        rtlMini: "CF",
        component: FirmasScreen,
        layout: "/admin"
      },
      {
        path: "/nuevoApoyo",
        name: "Registro de apoyos",
        rtlName: "rapoyo",
        mini: "RP",
        rtlMini: "RP",
        component: DialogTipoApoyoForm,
        layout: "/admin"
      },
      {
        path: "/clasificacionServicios",
        name: "Clasificacion de Servicios",
        rtlName: "Firmas",
        mini: "CF",
        rtlMini: "CF",
        component: ClasificacionServiciosScreen,
        layout: "/admin"
      },
      {
        path: "/localidades",
        name: "Localidades",
        rtlName: "Localidades",
        mini: "CF",
        rtlMini: "CF",
        component: LocalidadScreen,
        layout: "/admin"
      },
      {
        path: "/editarTipoApoyo",
        name: "Tipo Apoyo",
        rtlName: "Tipo Apoyo",
        mini: "TAPY",
        rtlMini: "TAPY",
        component: DialogTipoApoyoFormEdit,
        layout: "/admin"
      },
      {
        path: "/registroSolicitud",
        name: "Registro de Solicitud",
        rtlName: "Registro de Solicitud",
        mini: "TAPY",
        rtlMini: "TAPY",
        component: RegistroSolicitud,
        layout: "/admin"
      },
      {
        path: "/registroPrueba",
        name: "Registro de prueba",
        rtlName: "Registro de Prueba",
        mini: "TAPY",
        rtlMini: "TAPY",
        component: RegistroPrueba,
        layout: "/admin"
      },

      {
        path: "/estadoCivil",
        name: "Estado civil",
        rtlName: "Estado civil",
        mini: "ec",
        rtlMini: "ec",
        component: EstadoCivilScreen,
        layout: "/admin"
      },
      {
        path: "/estatusRegistro",
        name: "Estatus Registro",
        rtlName: "Estatus Registro",
        mini: "erg",
        rtlMini: "erg",
        component: EstatusRegistroScreen,
        layout: "/admin"
      },
      {
        path: "/genero",
        name: "Género",
        rtlName: "Género",
        mini: "gn",
        rtlMini: "gn",
        component: GeneroScreen,
        layout: "/admin"
      },
      {
        path: "/gradoEstudio",
        name: "Grado Estudio",
        rtlName: "Grado Estudio",
        mini: "gres",
        rtlMini: "gres",
        component: GradoEstudioScreen,
        layout: "/admin"
      },
      {
        path: "/identificacione",
        name: "Identificacione",
        rtlName: "Identificacione",
        mini: "IDT",
        rtlMini: "IDT",
        component: IdentificacioneScreen,
        layout: "/admin"
      },
      //aqui ponemos la ruta que quiere poncho pero cambiamos el componete porque el que pone no existe
      //funcionaria con esta ruta http://localhost:3000/public/registroProgramas
      {
        path: "/registroProgramas",
        name: "Widgets",
        rtlName: "الحاجيات",
        icon: WidgetsIcon,
        component: RegistroProgramas,
        layout: "/public",
      },
      {
        path: "/testprintpdf",
        name: "Widgets",
        rtlName: "الحاجيات",
        icon: WidgetsIcon,
        component: PrintPdfScreen,
        layout: "/admin",
      },
    ]
  },


];

export default dashboardRoutes;
