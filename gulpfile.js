const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

gulp.task('scss', function(){
    return gulp.src('./app/scss/style.scss', {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css', {sourcemaps: '.'}));
})

gulp.task('css', function () {
    return gulp.src('./app/css/*.css', {sourcemaps: true})
        .pipe(uglifycss({
        "uglyComments": true
        }))
        .pipe(gulp.dest('./app/dist/', {sourcemaps: '.'}));
});


gulp.task('js', function () {
    return gulp.src('./app/js/script.js', {sourcemaps: true})
    .pipe(terser())
    .pipe(gulp.dest('./app/dist/', {sourcemaps: '.'}))
});

function browsersyncServe(cb){
    browsersync.init({
        server:{
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}


gulp.task('run', gulp.series('scss', 'css', 'js'));

gulp.task('watch', function () {
    gulp.watch('./app/scss/*.scss', gulp.parallel('scss', browsersyncServe, browsersyncReload));
    gulp.watch('./app/css/*.css', gulp.parallel('css', browsersyncServe, browsersyncReload));
});

gulp.task('default', gulp.series('run', 'watch'));