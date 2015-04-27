var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

var source = 'app';
var destination = 'dist';
var tmpDir = 'tmp';

var filteredSource = [source + '/img/**/*.{png,jpg,jpeg,gif}',
                      source + '/css/normalize.css',
                      source + '/index.html'];

var sourceCSS = source + '/css';
var filteredSourceCSS = sourceCSS + '/**/*.css';
var filteredSourceSCSS = sourceCSS + '/**/*.scss';
var destinationCSS = destination + '/css';

var sourceJS = source + '/js';
var filteredSourceJS = source + '/js/*.js';
var destinationJS = destination + '/js';

var srcComponents = 'bower_components';
var destComponents = 'dist/vendor';

gulp.task('watch-folder', function() {
  gulp.src(filteredSource, {base: source})
    .pipe(watch(filteredSource, {base: source}))
    .pipe(gulp.dest(destination));
});

gulp.task('watch-components-folder', function() {
  gulp.src(srcComponents, {base: srcComponents})
    .pipe(watch(srcComponents, {base: srcComponents}))
    .pipe(gulp.dest(destComponents));
});

// sass
gulp.task('sass-concat', function() {
    return gulp.src([sourceCSS + '/var.scss', sourceCSS + '/style.scss'], {base: sourceCSS})
    .pipe( concat('style.scss', {newLine: '/*start*/'}) )
    .pipe(gulp.dest(tmpDir));
});

gulp.task('sass', ['sass-concat'], function() {

    return sass(tmpDir, {style: 'expanded'})
    .on('error', function (err) {
        console.error('Error!', err.message);
        })
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(destinationCSS));
});

// return gulp.src(filteredSourceSCSS, {base: sourceCSS})
    // .pipe( concat('MY_style.scss', {newLine: '/*start*/'}) )
    // .pipe( sass(sourceCSS + '/MY_style.scss', {style: 'expanded'})
    // .on('error', function (err) {
    //   console.error('Error!', err.message);
    // }) )
    // .pipe(autoprefixer({
    //         browsers: ['last 3 versions'],
    //         cascade: false
    //     }))
    // .pipe(gulp.dest(destinationCSS));

gulp.task('watch-sass', function() {
  gulp.watch(filteredSourceSCSS, ['sass']);
});

// js
gulp.task('js', function() {
  return gulp.src( [sourceJS + '/script.js', filteredSourceJS] )
    .pipe( concat('script.js', {newLine: '/*start*/'}) )
    .pipe(gulp.dest(destinationJS));
});

gulp.task('watch-js', function() {
  gulp.watch(filteredSourceJS, ['js']);
});

gulp.task('watch-folders', ['sass', 'js', 'watch-sass', 'watch-js', 'watch-folder', 'watch-components-folder']);

gulp.task('webserver', ['sass', 'js'], function() {
  gulp.src(destination)
    .pipe(webserver({
      port: 8000,
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch-sass','watch-folders', 'webserver']);

