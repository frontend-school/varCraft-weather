var gulp = require('gulp');
var browserSync = require('browser-sync');
var bowerSrc = require('gulp-bower-src');
var sass = require( 'gulp-sass' );

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



gulp.task('html', function() {
    gulp.src(source + '/*.html')
    .pipe(gulp.dest(destination));
})

gulp.task('mobile-html', function() {
    gulp.src(source + '/pages/*.html')
    .pipe(gulp.dest(destination + '/pages'));
})

gulp.task('js', function() {
    gulp.src(source + '/js/**')
    .pipe(gulp.dest(destination + '/js'));
})

gulp.task( 'css', function() {
    gulp.src(source + '/css/*.scss')
    .pipe(sass())
    .pipe( gulp.dest( destination + '/css' )); //transform files from SCSS to CSS and copy them to "dist/css"
})

gulp.task( 'fonts', function() {
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
gulp.task('build', ['html', 'css', 'fonts', 'js', 'img', 'mobile-html']);
gulp.task("default", ['server', 'build', 'watcher', 'livereload']);
gulp.task('testAPI', ['build', 'testAPIserver']);
