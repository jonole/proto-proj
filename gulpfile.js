let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync').create();

// Compile sass into CSS, autoprefix & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("css/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

// Minify css-files
gulp.task('minify-css', function(){
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatability: 'ie9'}))
    .pipe(gulp.dest('css'))
});

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("css/*.scss", gulp.series(['sass', 'minify-css']));
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', gulp.series('serve'));