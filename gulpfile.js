var gulp = require('gulp');
var browserSync = require('browser-sync');
var bowerSrc = require('gulp-bower-src');
var sass = require( 'gulp-sass' );

var source = "app";
var destination = "dist";
var filteredSource = [source + '/css/**/*.css',
                      source + '/css/**/*.scss',
                      source + '/js/**/*.js',
                      source + '/img/**/*.*',
                      source + '/index.html'];

var filteredDestination = ['dist/css/*.css',
                            'dist/js/*.js',
                            'dist/*.html',
                            'dist/img/*.*'];

var appComponents  = "bower_components";


gulp.task('server', function() {
    browserSync({
            port: 8080,
            server: {
            baseDir: destination
        }
    });
});


gulp.task('html', function() {
    gulp.src(source + '/*.html')
    .pipe(gulp.dest(destination));
})

gulp.task('js', function() {
    gulp.src(source + '/js/**')
    .pipe(gulp.dest(destination + '/js'))
})

gulp.task( 'css', function() {

    gulp.src(source + '/css/*.css')
        .pipe(gulp.dest(destination + '/css'));  //copy common CSS files, usefull during aprobation period with SASS

    gulp.src(source + '/css/*.scss')
    .pipe(sass())
    .pipe( gulp.dest( destination + '/css' ) ); //transform files from SCSS to CSS and copy them to "dist/css"
})

gulp.task('img', function() {
    gulp.src(source + '/img/**')
    .pipe(gulp.dest(destination + '/img'))
})


gulp.task('bower', function () {
    bowerSrc()
        .pipe(gulp.dest(destination + '/vendor'));
});

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

gulp.task('build', ['html', 'css', 'js', 'img']);

gulp.task("default", ['server', 'build', 'watcher', 'livereload']);
