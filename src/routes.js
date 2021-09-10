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
import Dashboard from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";
import FolderIcon from '@material-ui/icons/Folder';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DescriptionIcon from '@material-ui/icons/Description';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

// core components/views for Admin layout
import { ModuloScreen } from "views/Modulos/ModuloScreen";
import { RolesScreen } from "views/Roles/RolesScreen";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import { SubModuloScreen } from "views/SubModulos/SubModuloScreen";
import { TipoApoyoScreen } from "views/Catalogos/TipoApoyo/TipoApoyoScreen"
import { TipoBeneficiarioScreen } from "views/Catalogos/TiposBeneficiarios/TipoBeneficiarioScreen";


import { ComiteSecretariasScreen } from "views/Catalogos/ComiteSecretarias/ComiteSecretariasScreen";
import { EdadesBeneficiariosScreen } from "views/Catalogos/EdadesBeneficiarios/EdadesBeneficiariosScreen";
import { MotivoRechazosScreen } from "views/Catalogos/MotivoRechazos/MotivoRechazosScreen";
//import { NumeroApoyosScreen } from "views/Catalogos/NumeroApoyos/numeroApoyosScreen";
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



const dashboardRoutes = [

  {
    collapse: true,
    name: "Administración General",
    rtlName: "ag",
    icon: FolderIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/catalogos",
        name: "Catálogos",
        rtlName: "cat",
        mini: "M",
        rtlMini: "m",
        component: CatalogosScreen,
        layout: "/admin"
      },
      {
        path: "/roles",
        name: "Administración de perfiles",
        rtlName: "roles",
        mini: "R",
        rtlMini: "r",
        component: RolesScreen,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "Catálogos administrativos",
    rtlName: "ag",
    icon: FolderIcon,
    state: "pageCollapse",
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
      {
        path: "/comitessecretarias",
        name: "Comites Secretarías",
        rtlName: "comitesecretarias",
        mini: "CS",
        rtlMini: "cs",
        component: ComiteSecretariasScreen,
        layout: "/admin"
      },
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
    name: "Bandeja General de Solicitudes ",
    rtlName: "bgs",
    icon: MoveToInboxIcon,
    state: "pageCollapse",
    views: [
      {
      }
    ]
  }
  , {
    collapse: true,
    name: "Entrega de Apoyos",
    rtlName: "صفحات",
    icon: LocalShippingIcon,
    state: "pageCollapse",
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
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },
  {
    collapse: true,
    name: "Bitácora",
    rtlName: "صفحات",
    icon: DescriptionIcon,
    state: "pageCollapse",
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
    state: "pageCollapse",
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
    state: "pageCollapse",
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
    state: "pageCollapse",
    views: [
      {
      }
    ]
  },

  //CATALOGOS
  {
    collapse: true,
    name: "Catalogos",
    rtlName: "صفحات",
    icon: Image,
    state: "pageCollapse",
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
        name: "Bitacora Actividades",
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
        path: "/padronBeneficiarios",
        name: "Padron Beneficiarios",
        rtlName: "padronBeneficiarios",
        mini: "AS",
        rtlMini: "AS",
        component: PadronBeneficiariosScreen,
        layout: "/admin"
      },{
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

    ]
  }
];

export default dashboardRoutes;
