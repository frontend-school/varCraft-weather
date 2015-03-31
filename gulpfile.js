var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    var batch = require('gulp-batch');

gulp.task('minify', function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-sources', function() {
    gulp.src('app/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-bower', function()) {
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest('dist/vendor'));
});

gulp.task('watch', function () {
    watch('app/**/*', batch(function () {
        gulp.start('copy-sources');
    })
    watch('bower_components/**/*.js', batch(function () {
        gulp.start('copy-bower');
    }));
});
    