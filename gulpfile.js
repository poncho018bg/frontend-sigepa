const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function() {
  // this is to add Fabrica de Software 3 licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!
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
      */`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Fabrica de Software 3 in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

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
-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Fabrica de Software 3 licences in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!
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
      */`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
