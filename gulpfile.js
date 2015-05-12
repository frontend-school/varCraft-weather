var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

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
        js: source + '/js/*.js',
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

    return sass(tmpDir, {style: 'expanded'})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
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
    return gulp.src([sourceJS + '/script.js', path.source.js])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script.js', {newLine: '/*start*/'}))
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

gulp.task('default', ['watch-sass', 'watch-folders', 'webserver']);

