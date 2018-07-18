/* eslint-env node */
'use strict';

// Pull in gulp task modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

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

gulp.task('styles-dist', () => {
    const plugins = [
        autoprefixer(
            {browsers: ['last 2 versions']}
        )
    ];
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('main.css.map'))
        .pipe(gulp.dest('assets/css'));
});

// Concat all js files
gulp.task('scripts', () => {
    return gulp.src('assests/js/*.js')
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', () => {
    return gulp.src('assests/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(uglify('main.min.js'))
        .pipe(sourcemaps.write('main.js.map'))
        .pipe(gulp.dest('dist/js'));
});

// Copy images from dev to production
gulp.task('copy-images', () => {
    return gulp.src('assets/img/*')
        .pipe(gulp.dest('dist/img'));
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
gulp.task('watch', ['browser-sync', 'styles', 'scripts', 'lint'], () => {
    gulp.watch('assets/sass/**/*.scss', ['styles']);
    gulp.watch('assets/js/*.js', ['lint']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'styles', 'scripts', 'lint', 'watch']);

gulp.task('dist', ['copy-images', 'styles-dist', 'scripts-dist', 'lint']);
