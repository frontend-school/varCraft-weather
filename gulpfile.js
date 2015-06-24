var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    bowerSrc = require('gulp-bower-src'),
    sass = require( 'gulp-sass' ),
    uglify = require( 'gulp-uglify' ),
    clean = require('gulp-clean'),
    rename = require( 'gulp-rename' ),
    jshint = require( 'gulp-jshint' ),
    concat = require('gulp-concat') ,
    autoprefixer = require('gulp-autoprefixer'),
    express = require('gulp-express'),
    watch  = require('gulp-watch'),
    reload = browserSync.reload;

var source = "app";
var destination = "dist";
var appComponents  = "bower_components";

var path = {
        src: {
            html: source + '/*.html',
            js: source + '/js/**/*.js',
            css: source + '/css/**/*.scss',
            fonts: source + '/css/fonts/*.*',
            img: source + '/img/**/*.js',
            appComponents: 'bower_components'
        },
        dest: {
            html: destination,
            js: destination + '/js',
            css: destination + '/css',
            fonts: destination + '/css/fonts',
            img: destination + '/img',
            appComponents: source + '/vendor'
        },
        watch: {
            html: source + '/*.*',
            js: source + '/js/**/*.js',
            css: source + '/css/**/*.*',
            fonts: source + '/css/fonts/*.*',
            img: source + '/img/*',
            appComponents: 'bower_components'
        }
};

var runningPage = "index.html";
var testAPI = "/pages/testAPI.html";
var expressServer = source + "/server/rest.js";


gulp.task('express', function () {
    express.run([expressServer]);
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
    .pipe(gulp.dest(destination))
        .pipe(reload({stream: true}));
});

gulp.task('mobile-html', function() {
    gulp.src(source + '/pages/*.html')
    .pipe(gulp.dest(destination + '/pages'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function() {
   return gulp.src(source + '/js/**/*.js')
    .pipe( concat("../js/script.js") )
    .pipe( jshint() )
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(destination + '/js')) // this code copy initiall script.js file to the "dist" folder
    .pipe( uglify() )
    .pipe( rename( { suffix: '.min' } ))
    .pipe(gulp.dest(destination + '/js'))
    .pipe(reload({stream: true}));
});

gulp.task( 'css', function() {
    gulp.src([source + '/css/*.*'])
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
    .pipe( gulp.dest( destination + '/css' ))
        .pipe(reload({stream: true})); //transform files from SCSS to CSS and copy them to "dist/css"

});

gulp.task("fonts", function() {
    gulp.src(source + '/css/fonts/*.*')
        .pipe(gulp.dest(destination + '/css/fonts'));
});

gulp.task('img', function() {
    gulp.src(source + '/img/**')
    .pipe(gulp.dest(destination + '/img'))
        .pipe(reload({stream: true}));
});

gulp.task('bower', function () {
    bowerSrc()
        .pipe(gulp.dest(destination + '/vendor'))
        .pipe(reload({stream: true}));
});

gulp.task('watch-s', function(){
    watch([path.watch.html], function (event, cb) {
        gulp.start('html');
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start('css');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('img');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts');
    });

});

gulp.task('build', ['html', 'css','fonts', 'js', 'img', 'mobile-html']);
gulp.task("default", ['server', 'build', 'watch-s', 'express']);
gulp.task('expbuild',['build', 'express', 'watch-s']);
gulp.task('testAPI', ['build', 'testAPIserver']);
