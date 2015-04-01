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
var detailSrcSet = ['!' + source + '/' + 'Appeared Questions.txt',
                    '!' + source + '/' + 'Dev Comments.txt',
                    '!' + source + '/' + 'Project notes/',
                    '!' + source + '/' + 'Project notes/**/*'];

gulp.task('watch-folder', function() { return watchToCopy(source, destination, detailSrcSet)});
gulp.task('watch-components-folder', function() { return watchToCopy(srcComponents, destComponents, detailSrcSet)});

gulp.task('watch-folders', ['watch-folder', 'watch-components-folder']);

gulp.task('webserver', function() {
  gulp.src('./' + source)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch-folders', 'webserver']);


function watchToCopy(src, dest, detailSrcSet){

    detailSrcSet = detailSrcSet || [];
    var srcSettings = [src + '/**/*'];
    for (var i = 0; i < detailSrcSet.length; i++){
        srcSettings.push( detailSrcSet[i] );
    };

	gulp.src(srcSettings, {base: src})
    .pipe(watch(srcSettings, {base: src}))
    .pipe(gulp.dest(dest));

};
