var gulp = require('gulp');
var webserver = require('gulp-webserver');

// A start  implementation of copy-from-to with watcher
// gulp.task('watch-folder', function() {  
//   gulp.watch('app/**/*', ['copy-folder']);
// });
// gulp.task('copy-folder', function() {  
//   gulp.src('app/**/*')
//     .pipe(gulp.dest('dist'));
// });

var watch = require('gulp-watch');

var source = 'app';
var destination = 'dist';
var srcComponents = 'bower_components';
var destComponents = 'dist/vendor';

gulp.task('watch-folder', function() { return watchToCopy(source, destination)});
gulp.task('watch-components-folder', function() { return watchToCopy(srcComponents, destComponents)});

gulp.task('watch-folders', ['watch-folder', 'watch-components-folder']);

gulp.task('webserver', function() {
  gulp.src('./' + source)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch-folders', 'webserver']);


function watchToCopy(src, dest){

	gulp.src(src + '/**/*', {base: src})
    .pipe(watch(src, {base: src}))
    .pipe(gulp.dest(dest));

};
