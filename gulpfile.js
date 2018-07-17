/* eslint-env node */
'use strict';

// Pull in gulp task modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: './'
    });
});

// Compile sass into CSS and auto-inject into browsers
gulp.task('styles', () => {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

// Lint all js files
gulp.task('lint', () => {
    return gulp.src(['assets/js/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

// Watch for file changes
gulp.task('watch', ['styles'], () => {
    gulp.watch('assets/sass/**/*.scss', ['styles']);
    gulp.watch('assets/js/*.js', ['lint']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'styles', 'lint', 'watch']);
