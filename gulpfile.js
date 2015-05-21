var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');

var server = require('gulp-express');

gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['server/app.js']);

    // Restart the server when file changes
    //Event object won't pass down to gulp.watch's callback if there's more than one of them.
    //So the correct way to use server.notify is as following:
    /*gulp.watch(['app/scripts/!**!/!*.js'], ['jshint']);
    gulp.watch(['app/images/!**!/!*'], server.notify);
    gulp.watch(['app.js', 'routes/!**!/!*.js'], [server.run]);*/
});

var source = 'app';
var destination = 'dist';
var tmpDir = 'tmp';

var sourceCSS = source + '/css';
var sourceJS = source + '/js';

var path = {
    source: {
        html: source + '/index.html',
        img: source + '/img/**/*.{png,jpg,jpeg,gif}',
        css: [sourceCSS + '/var.scss', sourceCSS + '/style.scss'],
        cssNormalize: source + '/css/normalize.css',
        scss: sourceCSS + '/**/*.scss',
        js: source + '/js/**/*.js',
        jsMain: source + '/js/script.js',
        srcComponents: 'bower_components'
    },

    destination: {
        // html: '',
        // img: '',
        css: destination + '/css',
        js: destination + '/js',
        destComponents: 'dist/vendor'
    }
};

gulp.task('watch-folder', function () {
    var filteredSource = [path.source.html, path.source.img, path.source.cssNormalize];

    gulp.src(filteredSource, {base: source})
        .pipe(watch(filteredSource, {base: source}))
        .pipe(gulp.dest(destination));
});

gulp.task('watch-components-folder', function () {
    gulp.src(path.source.srcComponents, {base: path.source.srcComponents})
        .pipe(watch(path.source.srcComponents, {base: path.source.srcComponents}))
        .pipe(gulp.dest(path.destination.destComponents));
});

// sass
gulp.task('sass-concat', function () {
    return gulp.src(path.source.css, {base: sourceCSS})
        .pipe(concat('style.scss', {newLine: '/*start*/'}))
        .pipe(gulp.dest(tmpDir));
});

gulp.task('sass', ['sass-concat'], function () {

    return gulp.src(tmpDir + '/**/*.scss')
        .pipe(sass().on('error', function (err) {
            console.error('Error!', err.message);
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path.destination.css));
});

gulp.task('watch-sass', function () {
    gulp.watch(path.source.scss, ['sass']);
});

// js
gulp.task('js', function () {
    return gulp.src(path.source.jsMain)
        .pipe(rigger())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(path.destination.js));
});

gulp.task('watch-js', function () {
    gulp.watch(path.source.js, ['js']);
});

gulp.task('watch-folders', ['sass', 'js', 'watch-sass', 'watch-js', 'watch-folder', 'watch-components-folder']);

gulp.task('webserver', ['sass', 'js'], function () {
    gulp.src(destination)
        .pipe(webserver({
            port: 8000,
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['watch-sass', 'watch-folders', 'webserver', 'server']);

