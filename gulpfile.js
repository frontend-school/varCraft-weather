// plugins
var gulp = require('gulp');
var webServer = require('gulp-webserver');
var watch = require('gulp-watch');
var less = require('gulp-less');

var source = 'app/',
    destination = 'dist/',
    sourceComp = 'bower_components',
    destinationComp = 'dist/vendor';

// CSS
gulp.task('css', function() {
    return gulp.src(source + '/css/*.css', {base: source})
        .pipe(watch(source  + '/css/*.css', {base: source}))
        .pipe(gulp.dest(destination));
});

// LESS
gulp.task('less', function() {
    return gulp.src(source + 'css/*.less', {base: source+'css'})
        .pipe(watch(source + 'css/*.less', {base: source+'css'}))
        .pipe(less())
        .pipe(gulp.dest(destination+'css'));
});
// JS
gulp.task('js', function() {
    return gulp.src(source + 'js/*.js', {base: source})
        .pipe(watch(source + 'js/*.js', {base: source}))
        .pipe(gulp.dest(destination));
});

// HTML
gulp.task('html', function() {
    return gulp.src(source + '*.html', {base: source})
        .pipe(watch(source + '*.html', {base: source}))
        .pipe(gulp.dest(destination));
});

// Images
gulp.task('images', function() {
    return gulp.src(source + 'img/*.png', {base: source})
        .pipe(watch(source + 'img/*.png', {base: source}))
        .pipe(gulp.dest(destination));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(source + 'fonts/*.otf', {base: source})
        .pipe(watch(source + 'fonts/*.otf', {base: source}))
        .pipe(gulp.dest(destination));
});

// Bower_components
gulp.task('bower', function() {
    return gulp.src(sourceComp, {base: sourceComp})
        .pipe(watch(sourceComp, {base: sourceComp}))
        .pipe(gulp.dest(destinationComp));
});

// Build into dist folder
gulp.task('build', ['html', 'css', 'less',  'js', 'images', 'fonts', 'bower']);

// Add livereload
gulp.task('webserver', function() {
    gulp.src(destination)
        .pipe(webServer({
            host:             'localhost',
            port:             '8000',
            open:             true,
            livereload:       true
        }));
});

// Default task
gulp.task('default', ['build', 'webserver']);


