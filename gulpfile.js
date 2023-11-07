//Import all necessary toolkits
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

//SCSS task - converts CSS into SCSS
gulp.task('scss', function(){
    return gulp.src('./app/scss/style.scss', {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css', {sourcemaps: '.'}));
})

//CSS task - Converts CSS into minified CSS
gulp.task('css', function () {
    return gulp.src('./app/css/*.css', {sourcemaps: true})
        .pipe(uglifycss({
        "uglyComments": true
        }))
        .pipe(gulp.dest('./app/dist/', {sourcemaps: '.'}));
});

//JS task - Converts JS into minified JS file
gulp.task('js', function () {
    return gulp.src('./app/js/script.js', {sourcemaps: true})
    .pipe(terser())
    .pipe(gulp.dest('./app/dist/', {sourcemaps: '.'}))
});

//Start Browsersync 
function browsersyncServe(cb){
    browsersync.init({
        server:{
            baseDir: '.'
        }
    });
    cb();
}

//Reload Browsersync 
function browsersyncReload(cb){
    browsersync.reload();
    cb();
}


//Run all static tasks at the same time
gulp.task('run', gulp.series('scss', 'css', 'js'));

//Dynamic watch task - watch change in SCSS files
gulp.task('watch', function () {
    gulp.watch('./app/scss/*.scss', gulp.parallel('scss', browsersyncServe, browsersyncReload));
});

//Run all tasks
gulp.task('default', gulp.series('run', 'watch'));