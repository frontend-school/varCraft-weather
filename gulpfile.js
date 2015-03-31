var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('app/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});


watch = require('gulp-watch');

gulp.task('copyAppFiles', function() {
    gulp.src('./app/**')
        .pipe(gulp.dest('./dist/'));
})


var bowerSrc = require('gulp-bower-src');

gulp.task('copyBowerFiles', function () {
    bowerSrc()
        .pipe(gulp.dest('dist/vendor'));
});


gulp.task('copyToDistWatch', ['copyAppFiles', 'copyBowerFiles']);









