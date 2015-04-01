var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),   
    rimraf      = require('rimraf'),
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


//*** for all source file ***

gulp.task('build', function() {
    gulp.src('app/**/*')
    // add call for plugins
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

//****************************


//**** Builds for  types ****

gulp.task('html:build', function () {
    gulp.src('app/*.html')

    // add call for plugins
        .pipe(gulp.dest('dist')) 
        .pipe(reload({stream: true})); 
});

gulp.task('js:build', function () {
    gulp.src('app/js/*.js') 
        // add call for plugins
        .pipe(gulp.dest('dist/js')) 
        .pipe(reload({stream: true})); 
});


gulp.task('style:build', function () {
    gulp.src('app/css/*.css') 

        // add call for plugins
        .pipe(gulp.dest('dist/css')) 
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src('app/img/') 
        //add img min
        .pipe(gulp.dest('dist/img')) 
        .pipe(reload({stream: true}));
});

//*********Build all for  types***********

gulp.task('build_all', [
    'html:build',
    'js:build',
    'style:build',
    'image:build'
]);

// ****************************


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

gulp.task('clean', function (cb) {
    rimraf('dist', cb);
});
