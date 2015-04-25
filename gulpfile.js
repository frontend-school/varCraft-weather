var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');

var source = 'app';
var filteredSource = [source + '/css/**/*.css',
                      source + '/img/**/*.{png,jpg,jpeg,gif}',
                      source + '/index.html'];
var destination = 'dist';

var sourceCSS = source + '/css';
var filteredSourceSCSS = sourceCSS + '/**/*.scss';

var sourceJS = source + '/js/';
var filteredSourceJS = source + '/js/*.js';

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

// Concat js
gulp.task('js-concat', function() {
  return gulp.src( [sourceJS + 'script.js', filteredSourceJS] )
    .pipe( concat('script.js', {newLine: '/*start*/'}) )
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch-js-concat', function() {
  gulp.watch(filteredSourceJS, ['js-concat']);
});


gulp.task('watch-folders', ['js-concat', 'watch-js-concat', 'watch-folder', 'watch-components-folder']);

// Sass Compile Task
gulp.task('sass', function() {
    sass(sourceCSS, {style: 'expanded'})
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(sourceCSS));
});

gulp.task('watch-sass', function() {
  watch(filteredSourceSCSS, function() {
    gulp.run('sass');
  });
});

gulp.task('webserver', function() {
  gulp.src(destination)
    .pipe(webserver({
      port: 8000,
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch-sass','watch-folders', 'webserver']);

