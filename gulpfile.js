const { src, dest, watch, series, parallel } = require('gulp');

//CSS - SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes
/* const imagemin = require('gulp-imagemin'); */
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif'); 

function css( done ) {
  //compilar sass
  //pasos: 1- identificar archivos, 2-compilarla, 3-guardar el .css
  src('src/scss/app.scss')
    /* hay otros estilos que el compressed */ 
    /*.pipe( sass({ outputStyle:'compressed' }) ) */
    .pipe( sass() )
    .pipe( postcss([ autoprefixer() ]) )
    .pipe( dest('build/css') );
  done();
}

function imagenes( done ) {
  /* todos los formatos */ 
 src('src/img/**/*')
    .pipe( imagemin({ optimizationLevel: 3 }) )
    .pipe( dest('build/img') );
  done()
}

function versionWebp( done ) {
  const opciones = {
    quality: 50
  }
  src('src/img/**/*.{png,jpg}')
    .pipe( webp( opciones ) )
    .pipe( dest('build/img') );
  done();
}

function versionAvif( done ) {
  const opciones = {
    quality: 50
  }
  src('src/img/**/*.{png,jpg}')
    .pipe( avif( opciones ) )
    .pipe( dest('build/img') );
  done();
}

function dev() {
  /* archivo - funcion */ 
  watch('src/scss/**/*.scss', css);
  /* watch('src/scss/app.scss', css); */
  watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );

//series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
//parallel - Todas inician al mismo tiempo