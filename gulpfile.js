var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    rigger      = require('gulp-rigger'),
    prefixer    = require('gulp-autoprefixer'),
    cssmin      = require('gulp-minify-css'),
    rimraf      = require('rimraf'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    express     = require('gulp-express');

var path = {
    app   : {
        html      : 'app/*.html',
        mainJs    : 'app/js/main.js',
        mainStyle : 'app/css/main.scss',
        img       : 'app/img/**/*.*',
        bower     : 'bower_components/**/*.js',
        fonts     : 'app/fonts/**/*.*'
    },

    clean : './dist',

    dist: {
        html   : 'dist/',
        js     : 'dist/js/',
        css    : 'dist/css/',
        img    : 'dist/img/',
        vendor : 'dist/vendor',
        fonts  : 'dist/fonts/'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/css/**/*.scss',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    }
};

var config = {
    server: {
        baseDir: "./dist"
    },
    host:   'localhost',
    port:   8080
};

gulp.task('express', function () {
    express.run(['server.js']);
});


gulp.task('html:build', function () {
    gulp.src(path.app.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.app.mainJs)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

gulp.task('scss:build', function () {
    gulp.src(path.app.mainStyle)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.app.img)
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.app.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('copy-bower', function () {
    gulp.src(path.app.bower)
        .pipe(gulp.dest(path.dist.vendor))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('scss:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'scss:build',
    'image:build',
    'fonts:build',
    'copy-bower'
]);

gulp.task('run', [
    'build',
    'express',
    'webserver'
]);

gulp.task('default', [
    'run',
    'watch'
]);

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});