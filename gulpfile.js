var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-sources', function() {
    gulp.src('app/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-bower_components_js', function()) {
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest('dist/vendor'));
});

ggg