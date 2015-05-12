var gulp = require('gulp');
var browserSync = require('browser-sync');
var bowerSrc = require('gulp-bower-src');
var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );
var clean = require('gulp-clean');
var rename = require( 'gulp-rename' );
var jshint = require( 'gulp-jshint' );
var concat = require('gulp-concat') ;
var autoprefixer = require('gulp-autoprefixer');
var express = require('gulp-express');

var source = "app";
var destination = "dist";
var filteredSource = [source + '/css/**/*.css',
                      source + '/css/**/*.scss',
                      source + '/css/fonts/*.*',
                      source + '/js/*.js',
                      source + '/img/**/*.*',
                      source + '/index.html',
                      source + '/pages/*.*'];

var filteredDestination = ['dist/css/*.css',
                            'dist/css/fonts/*.*',
                            'dist/js/*.js',
                            'dist/*.html',
                            'dist/img/*.*',
                            'dist/pages/*.html'];

var appComponents  = "bower_components";
var runningPage = "index.html";
var testAPI = "/pages/testAPI.html";


gulp.task('express', function () {
    express.run(['app.js'])
    });


gulp.task('server', function() {
    browserSync({
            port: 8080,
            server: {
            baseDir: destination,
            index: runningPage
        }
    })
});

gulp.task('testAPIserver',function() {
     browserSync({
            port: 8081,
            server: {
            baseDir: destination,
            index: testAPI
        }
    })
});

gulp.task('clean', function () {
    return gulp.src(destination, {read: false})
        .pipe(clean());
});


gulp.task('html', function() {
    gulp.src(source + '/*.html')
    .pipe(gulp.dest(destination));
})

gulp.task('mobile-html', function() {
    gulp.src(source + '/pages/*.html')
    .pipe(gulp.dest(destination + '/pages'));
})

gulp.task('js', function() {
   return gulp.src(source + '/js/*.js')
    .pipe( concat("../js/script.js") )
    .pipe( jshint() )
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(destination + '/js')) // this code copy initiall script.js file to the "dist" folder
    .pipe( uglify() )
    .pipe( rename( { suffix: '.min' } ))
    .pipe(gulp.dest(destination + '/js'));
})

gulp.task( 'css', function() {
    gulp.src([source + '/css/style.scss', source + '/css/normalize.css', source + '/css/style-mobile.scss' ])
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
    .pipe( gulp.dest( destination + '/css' )); //transform files from SCSS to CSS and copy them to "dist/css"

    gulp.src(source + '/css/fonts/*.*')
    .pipe(gulp.dest(destination + '/css/fonts'));
})

gulp.task('img', function() {
    gulp.src(source + '/img/**')
    .pipe(gulp.dest(destination + '/img'))
})

gulp.task('bower', function () {
    bowerSrc()
        .pipe(gulp.dest(destination + '/vendor'));
})

//watcher
gulp.task('watch-source', function() {
    gulp.watch(filteredSource, ['build']);
})

gulp.task('watch-components', function() {
    gulp.watch(appComponents, ['bower']);
})


gulp.task('livereload', function() {
            gulp.watch(filteredDestination).on('change', browserSync.reload);
})

gulp.task('watcher', ['watch-source', 'watch-components']);
gulp.task('build', ['html', 'css', 'js', 'img', 'mobile-html']);
//gulp.task("default", ['server', 'build', 'watcher', 'livereload']);
gulp.task("default", ['expbuild']);
gulp.task('expbuild',['build', 'express', 'watch-source']);
gulp.task('testAPI', ['build', 'testAPIserver']);
