const gulp = require('gulp');
const stylus = require('gulp-stylus');
const css = require('gulp-css');
const pump = require('pump');

gulp.task('css', function() {
    pump([
        gulp.src('./public/stylus/*'),
        stylus(),
        css(),
        gulp.dest('./public/dist')
    ]);
});

gulp.task('default', ['css']);