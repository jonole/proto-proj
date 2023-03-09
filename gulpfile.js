const gulp = require('gulp');
const { src, dest, watch, parallel, series } = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const paths = {
  styles: {
    src: ['./sass/**/*.scss'],
    dist: './css',
  },
  scripts: {
    src: ['./js/**/*.js'],
    dist: './dist',
  }
};

function compileStyles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({ grid: true } ))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(paths.styles.dist));
}
function compileScripts() {
  return src(paths.scripts.src)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))    
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest(paths.scripts.dist));
}

function watcher() {
  watch(paths.styles.src, compileStyles);
  watch(paths.scripts.src, compileScripts);
  browserSync.reload
}

exports.compileStyles = compileStyles;
exports.babelScripts = compileScripts;

exports.default = series(
  parallel(compileStyles, compileScripts),
  watcher
);