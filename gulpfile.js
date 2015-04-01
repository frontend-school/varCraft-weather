var gulp = require('gulp');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

var source = 'app';
var filters = ['css/**/*.css', 'js/**/*.js', 'img/**/*.{png,jpg,jpeg,gif}', 'index.html'];
var destination = 'dist';

var srcComponents = 'bower_components';
var destComponents = 'dist/vendor';

gulp.task('watch-folder', function() { return watchToCopy(source, destination, filters)});
gulp.task('watch-components-folder', function() { return watchToCopy(srcComponents, destComponents)});

gulp.task('watch-folders', ['watch-folder', 'watch-components-folder']);

gulp.task('webserver', function() {
  gulp.src(source)
    .pipe(webserver({
      port: 8000,
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch-folders', 'webserver']);


function watchToCopy(src, dest, srcFilters){

  var filteredSource = getFilteredSource(src, srcFilters);

  gulp.src(filteredSource, {base: src})
    .pipe(watch(filteredSource, {base: src}))
    .pipe(gulp.dest(dest));

};

function getFilteredSource(src, filters){
  var filteredSource = [];
  src = src || './';
  filters = filters || ['**/*'];
  for (var i = 0; i < filters.length; i++) {
    filteredSource.push(src 
                   + ((src.slice(-1) === '/' || filters[i][0] === '/') ? '' : '/')
                   + filters[i]);
  };

  return filteredSource;
};
