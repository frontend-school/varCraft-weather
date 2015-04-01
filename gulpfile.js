var gulp = require('gulp');
var browserSync = require('browser-sync');
var bowerSrc = require('gulp-bower-src');

gulp.task('server', function() {
    browserSync({
            server: {
            baseDir: "dist"
        }
    });
});


gulp.task('html', function() {
    gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('js', function() {
    gulp.src('app/js/**')
    .pipe(gulp.dest('dist/js'))
})

gulp.task('css', function() {
    gulp.src('app/css/**')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('img', function() {
    gulp.src('app/img/**')
    .pipe(gulp.dest('dist/img'))
})

gulp.task('build', ['html', 'css', 'js', 'img']);


;

gulp.task('bower', function () {
    bowerSrc()
        .pipe(gulp.dest('dist/vendor'));
});

//watcher

gulp.task( 'watch', function() {

    gulp.watch('app/*.html', ['html'] );
    gulp.watch('app/js/**', ['js']);
    gulp.watch('app/css/**', ['css']);
    gulp.watch('app/img/**', ['img']);
    gulp.watch('bower_components/**', ['bower']);

    gulp.watch(['dist/css/*.css', 'dist/js/*.js', 'dist/*.html', 'dist/img/*.*']).on('change', browserSync.reload);
    

});


gulp.task('build', ['html', 'css', 'js', 'img', 'bower']);

gulp.task("default", ['server', 'build', 'watch']);

