var gulp        = require('gulp'),
    watch       = require('gulp-watch'),   
    rimraf      = require('rimraf'),
    sass = require('gulp-sass'),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload;

var path = {
    app   : {
        html  : 'app/*.html',
        js    : 'app/js/*.js',
        css   : 'app/css/*.css',
        scss   : 'app/css/*.scss',
        img   : 'app/img/**/*.*',
        bower : 'bower_components/**/*.js'
    },

    clean : './dist',

    dist: {
        html   : 'dist/',
        js     : 'dist/js/',
        css    : 'dist/css/',
        img    : 'dist/img/',
        vendor : 'dist/vendor'
    }
};

var config = {
    server: {
        baseDir: "./dist"
    },
    host:   'localhost'
};


gulp.task('html:build', function () {
    gulp.src(path.app.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.app.js)
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true})); 
});


gulp.task('style:build', function () {
    gulp.src(path.app.css)
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('scss:build'), function () {
    gulp.src(path.app.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
};



gulp.task('image:build', function () {
    gulp.src(path.app.img)
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({stream: true}));
});

gulp.task('copy-bower', function() {
    gulp.src(path.app.bower)
        .pipe(gulp.dest(path.dist.vendor))
        .pipe(reload({stream: true}));
});


gulp.task('watch', function(){
    watch([path.app.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.app.css], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.app.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.app.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'scss:build',
    'image:build',
    'copy-bower'
]);

gulp.task('run', [
    'build',
    'webserver'
]);

gulp.task('default', [
    'run',
    'watch'
]);

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
