var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload;

var config = {
        server: {
            baseDir: "./dist"
        },
        tunnel: true,
        host:   'localhost',
        port:   9000,
        logPrefix: "Abramova"
};



gulp.task('build', function() {
    gulp.src('app/**/*')
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src('app/*.html') 
        .pipe(gulp.dest('dist')) 
        .pipe(reload({stream: true})); 
});

gulp.task('copy-bower', function() {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest('dist/vendor'))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
    watch('app/**/*', function(event, cb) {
        gulp.start('build');
    });
    watch('bower_components/**/*.js', function(event, cb) {
        gulp.start('copy-bower');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('run', function () {
    gulp.start('build');
    gulp.start('webserver');

});

gulp.task('default', ['build', 'copy-bower', 'webserver', 'watch']); // just for fun
