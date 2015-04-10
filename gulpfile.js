var gulp = require('gulp'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass');

var source = "app/**",
    destination = "dist";

gulp.task('default', ['watch']);

gulp.task('copy', function () {
    gulp.src(source)
        .pipe(gulp.dest(destination));

    source = "app/**";
    destination = "dist";
});

gulp.task('clean', function() {
    del(destination);
    destination = "dist";
});

gulp.task('bc-vendor', function(){
    source = "bower_components/**/*.js";
    destination = "dist/vendor";
    gulp.start(['copy']);
});

gulp.task('sass',function(){
    gulp.src(source)
        .pipe(sass({
            outputStyle: 'nested', //compressed for uglification
            sourceComments: 'map',
            includePaths: [source]
        }))
        .pipe(gulp.dest(destination));
});

gulp.task('watch', function(){
    try {
        gulp.watch('app/**', function (event) {
            source = event.path.toString();
            destination = source.replace("\\app\\", "\\dist\\");
            if (event.type == 'deleted') {
                gulp.start(['clean']);
            }
            else {
                destination = destination.slice(0, destination.lastIndexOf('\\'));
                var fileExtension = source.slice(source.lastIndexOf('.'));
                if (fileExtension == '.scss') {
                    gulp.start(['sass']);
                }
                else {
                    gulp.start(['copy']);
                }
            }
        });
    }
    catch(error){
        gulp.start(['watch']);
    }
});

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
    gulp.run(['watch']);
});