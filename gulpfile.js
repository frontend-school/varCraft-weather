var gulp        = require('gulp'),
    watch       = require('gulp-watch'),   
    rimraf      = require('rimraf'),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload;

var config = {
        server: {
            baseDir: "./dist"
        },
        host:   'localhost'
};


var path = {
    watch : {
        html : 'app/**/*.html',
        js   : 'app/js/**/*.js',
        css  : 'app/css/**/*.css',
        img  : 'app/img/**/*.*'
    },

    app   : {
        html : 'app/*.html',
        js   : 'app/js/*.js',
        css  : 'app/css/*.css',
        img  : 'app/img/**/*.*'
    },

    clean : './dist'
};

//**** Builds for  types ****

gulp.task('html:build', function () {
    gulp.src(path.app.html)

    // add call for plugins
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.app.js)
        // add call for plugins
        .pipe(gulp.dest('dist/js')) 
        .pipe(reload({stream: true})); 
});


gulp.task('style:build', function () {
    gulp.src(path.app.css)

        // add call for plugins
        .pipe(gulp.dest('dist/css')) 
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.app.img)
        //add img min
        .pipe(gulp.dest('dist/img')) 
        .pipe(reload({stream: true}));
});

//*********Build all for  types***********

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'copy-bower'
]);

// ****************************


gulp.task('copy-bower', function() {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest('dist/vendor'))
        .pipe(reload({stream: true}));
});


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('run', [
    'build',
    'webserver'
]);

gulp.task('default', [
    'build',
    'webserver', 
    'watch'
]);

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
