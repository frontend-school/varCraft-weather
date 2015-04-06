var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var sass = require('gulp-ruby-sass');

var source = 'app';
var filteredSource = [source + '/css/**/*.css',
                      source + '/js/**/*.js',
                      source + '/img/**/*.{png,jpg,jpeg,gif}',
                      source + '/index.html'];
var destination = 'dist';

var sourceCSS = source + '/css';
var filteredSourceSCSS = sourceCSS + '/**/*.scss';


var srcComponents = 'bower_components';
var destComponents = 'dist/vendor';

gulp.task('watch-folder', function() { 
  gulp.src(filteredSource, {base: source})
    .pipe(watch(filteredSource, {base: source}))
    .pipe(gulp.dest(destination));
});

gulp.task('watch-components-folder', function() {
  gulp.src(srcComponents, {base: srcComponents})
    .pipe(watch(srcComponents, {base: srcComponents}))
    .pipe(gulp.dest(destComponents));
});

gulp.task('watch-folders', ['watch-folder', 'watch-components-folder']);

// Sass Compile Task
gulp.task('sass', function() {
    sass(sourceCSS, {style: 'expanded'}) 
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(sourceCSS));
});

gulp.task('watch-sass', function() { 
  watch(sourceCSS + '/**/*.scss', function() {
    gulp.run('sass');
  });
});

gulp.task('webserver', function() {
  gulp.src(source)
    .pipe(webserver({
      port: 8000,
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['webserver', 'watch-sass','watch-folders']);

