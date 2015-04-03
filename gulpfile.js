//required variables
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    del = require('del');

//environment variables
//I discovered that gulp tasks cannot receive input data so I use globals
var source = "app/**",
    destination = "dist";

// Default Task
gulp.task('default', ['watch']);

//-- file handler ------------------------------------------------------------------------------------------------------
//Copy from source to destination (app-dist default)
gulp.task('kopi', function () {
    gulp.src(source)
        .pipe(gulp.dest(destination));

    //reset globals
    source = "app/**";
    destination = "dist";
});

gulp.task('klin', function() {
    del(destination);
});
//----------------------------------------------------------------------------------------------------------------------

//Copy js scripts to vendor folder
gulp.task('bc-vendor', function(){
    source = "bower_components/**/*.js";
    destination = "dist/vendor";
    gulp.start(['kopi']);
});

//Watch Task
//If standard gulp copy function copies entire folder structure regardless of how many files were changed
//  then this task makes it better;
//else
//  I have written a lot of extra code :(
gulp.task('watch', function(){
    gulp.watch('app/**', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        source = event.path.toString();
        destination = source.replace("\\app\\", "\\dist\\");
        if(event.type == 'deleted')
        {
            gulp.start(['klin']);
        }
        //if type is: added, changed or renamed. Works well, tested
        else
        {
            destination = destination.slice(0, destination.lastIndexOf('\\')); //remove filename with extension. Only for creating files needed
            gulp.start(['kopi']);
        }
    });
});

//Livereload Task
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
    gulp.run(['watch']);
});