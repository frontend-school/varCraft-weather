var gulp = require('gulp'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

var source = "app/**",
    destination = "dist";

gulp.task('default', ['build', 'watch']);

gulp.task('copy', function () {
    gulp.src(source)
        .pipe(gulp.dest(destination));

    source = "app/**";
    destination = "dist";
});

gulp.task('clean', function() {
    del(destination);
    destination = "dist";
});

gulp.task('bc-vendor', function(){
    source = "bower_components/**/*.js";
    destination = "dist/vendor";
    gulp.start(['copy']);
});

gulp.task('concatScripts',function(){
    return gulp.src(['./app/**/*.js', '!./app/*.js'])
        .pipe(concat('general.js'))
        .pipe(gulp.dest('./dist/block/'));
});

gulp.task('build', function(){
    destination = 'dist';

    source = 'app\\index.html';
    runTask('copy');

    source = 'app\\block\\general.scss';
    runTask('sass');

    gulp.start(['concatScripts']);

    source = 'app/*.js';
    runTask('copy');

    source = 'app/**/*.html';
    runTask('copy');

    source = 'app/block/image';
    runTask('copy');

    source = 'app/block/icons';
    runTask('copy');

    source = 'app/icons*/**';
    runTask('copy');

    source = 'app/font*/**';
    runTask('copy');

    function runTask(task){
        if(!source.match(/[*]/)) {
            destination = source.replace("app\\", "dist\\");
            destination = destination.slice(0, destination.lastIndexOf('\\'));
        }
        gulp.start([task]);
        console.log(task + 'ing of ' + source + ' executed at ' + new Date());
    }
});

gulp.task('sass',function(){
    gulp.src(source)
        .pipe(sass({
            outputStyle: 'nested', //compressed for uglification
            sourceComments: 'map',
            includePaths: [source],
            errLogToConsole: true
        }))
        //.onError(function(){
        //    gulp.start(['watch'])
        //})
        .pipe(gulp.dest(destination));

    source = "app/**";
    destination = "dist";
});

gulp.task('watch', function(){
    gulp.watch('app/**', function (event) {
        gulp.start(['build']);
    });
});

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
    //gulp.start(['watch']);
});