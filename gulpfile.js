var gulp = require('gulp'),
    open = require('gulp-open');

gulp.task('runServer', function (cb) {
    var exec = require('child_process').exec;
    exec('node server/server.js', function (err){
        cb(err);
    });
});

gulp.task('runIndex', function(){
    var port = process.env.PORT || 3000;
    var options = {
        url: 'http://localhost:' + port
    };
    gulp.src('./dist/index.html')
        .pipe(open('', options));
});