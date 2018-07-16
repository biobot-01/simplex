'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('defult', function() {
  console.log('default gulp tasks');
});

gulp.task('styles', function() {
  gulp.src('assets/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('assets/css'));
});
