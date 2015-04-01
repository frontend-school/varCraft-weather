"use strict";

// plugins
var gulp = require('gulp');
var webServer = require('gulp-webserver');
var watch = require('gulp-watch');

var source = 'app',
    destination = 'dist/',
    sourceComp = 'bower_components',
    destinationComp = 'dist/vendor';

// CSS
gulp.task('css', function() {
    return gulp.src(source + '/css**', {base: source})
        .pipe(watch(source, {base: source}))
        .pipe(gulp.dest(destination));
});

// JS
gulp.task('js', function() {
    return gulp.src(source + '/js**', {base: source})
        .pipe(watch(source, {base: source}))
        .pipe(gulp.dest(destination));
});

// HTML
gulp.task('html', ['css', 'js'], function() {
    return gulp.src(source + '**.html', {base: source})
        .pipe(watch(source, {base: source}))
        .pipe(gulp.dest(destination));
});

// Images
gulp.task('images', function() {
    return gulp.src(source + '/img**', {base: source})
        .pipe(watch(source, {base: source}))
        .pipe(gulp.dest(destination));
});

// Bower_components
gulp.task('bower', function() {
    return gulp.src(sourceComp, {base: sourceComp})
        .pipe(watch(sourceComp, {base: sourceComp}))
        .pipe(gulp.dest(destinationComp));
});

// Build into dist folder
gulp.task('build', ['html', 'images', 'bower']);

// Add livereload
gulp.task('webserver', function() {
    gulp.src(source)
        .pipe(webServer({
            host:             'localhost',
            port:             '8000',
            open:             true,
            livereload:       true
        }));
});

// Default task
gulp.task('default', ['build', 'webserver']);



