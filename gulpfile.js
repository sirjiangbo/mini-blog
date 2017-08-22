const gulp = require('gulp');
const stylus = require('gulp-stylus');
const css = require('gulp-css');
const pump = require('pump');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('css', function() {
	return watch('./public/stylus/*', {verbose: true}, function() {
		pump([
      gulp.src('./public/stylus/*'),
      stylus(),
      css(),
      gulp.dest('./public/dist')
  	]);
	})
});

gulp.task('js', function() {
	 return gulp.src('./public/dist/hljs*.js')
    .pipe(concat('hljs.cpp.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['css']);