var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    open = require('gulp-open'),
    server = require('./server/server');

var source = "app/**",
    destination = "dist";

gulp.task('default', function(){
    gulp.start(['build', 'runServer', 'runIndex', 'watch']);
});

gulp.task('runServer', function (cb) {
    //server.runServer();
    var exec = require('child_process').exec;

    //gulp.task('task', function (cb) {
        exec('node server/server.js', function (err){//, stdout, stderr) {
            //console.log(stdout);
            //console.log(stderr);
            cb(err);
        });
    //})
});

gulp.task('runIndex', function(){
    var port = process.env.PORT || 3000;
    var options = {
        url: 'http://localhost:' + port
    };
    gulp.src('./dist/index.html')
        .pipe(open('', options));
});

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
            outputStyle: 'nested',
            sourceComments: 'map',
            includePaths: [source],
            errLogToConsole: true
        }))
        .pipe(gulp.dest(destination));

    source = "app/**";
    destination = "dist";
});

gulp.task('watch', function(){
    gulp.watch('app/**', function (event) {
        gulp.start(['build']);

        //server.reload();
    });
});