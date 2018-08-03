/* eslint-env node */
'use strict';
// Pull in gulp plugins
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import imageResize from 'gulp-image-resize';
import cache from 'gulp-cache';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import gulpAutoprefixer from 'gulp-autoprefixer';
import postcss from 'postcss';
import gulpPostcss from 'gulp-postcss';
import cleanCSS from 'gulp-clean-css';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import del from 'del';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks || use plain functions
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
  gulp.series - Execute list of tasks in specific order
  gulp.parallel - Execute list of tasks together
*/

// Specifiy folder & file path constants
const dirs = {
  src: 'assets',
  dest: 'dist'
};
const paths = {
  html: {
    src: '*.html',
    dest: `${dirs.dest}`
  },
  images: {
    src: `${dirs.src}/img/*`,
    dest: `${dirs.dest}/img`
  },
  css: {
    src: `${dirs.src}/sass/*.scss`,
    dest: `${dirs.dest}/css`,
    fileName: 'main.min.css',
    vendor: {
      src: `${dirs.src}/css/*.css`
    }
  },
  js: {
    src: `${dirs.src}/js/*.js`,
    dest: `${dirs.dest}/js`,
    fileName: 'main.min.js',
    vendor: {
      src: `${dirs.src}/js/vendor/*.js`,
      dest: `${dirs.dest}/js/vendor`
    }
  }
};

// Create an instance of a server
const server = browserSync.create();

// Create static server function
function serve(done) {
  server.init({
    server: {
      baseDir: paths.html.dest
    }
  });
  done();
}

// Create reload function
const reload = (done) => {
  server.reload({
    stream: true
  });
  done();
};

// Clean dist folder - dev & build
export const clean = (done) => {
  del([paths.html.dest]);
  done();
};

// Clean cached images from dist folder - build
const cleanImages = (done) => {
  cache.clearAll();
  done();
};

const cleanAll = gulp.series(cleanImages, clean);

// Copy all HTML files
function copyHTML() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

// Minify and copy all css vendor dependencies
function copyCSS() {
  return gulp.src(paths.css.vendor.src)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.dest));
}

// Copy all js vendor dependencies
function copyJS() {
  return gulp.src(paths.js.vendor.src)
    .pipe(gulp.dest(paths.js.vendor.dest));
}

// Copy all functions const
const copyAll = gulp.parallel(copyHTML, copyCSS, copyJS);

// Resize and minify all images - use as gulp images command
export function images(done) {
  const imageSizes = [
    {width: 1200, crop: false, suffix: '_1200'},
    {width: 800, crop: false, suffix: '_800'},
    {width: 400, crop: false, suffix: '_400'}
  ];

  const pluginsOptions = [
    imagemin.gifsicle({
      interlaced: true
    }),
    imagemin.jpegtran({
      progressive: true
    }),
    imagemin.optipng({
      optimizationLevel: 5
    }),
    imagemin.svgo({
      plugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]
    })
  ];

  imageSizes.forEach(function(image) {
    const resizeSettings = {
      width: image.width,
      crop: image.crop,
      upscale: false,
      imageMagick: true
    };

    return gulp.src(paths.images.src)
      .pipe(imageResize(resizeSettings))
      .pipe(cache(imagemin(pluginsOptions,
        {
          use: [pngquant()],
          verbose: true
        }
      )))
      .pipe(rename({
        suffix: image.suffix
      }))
      .pipe(gulp.dest(paths.images.dest));
  });
  done();
}

// Compile sass into CSS & auto-inject into browser - dev

function styles() {
  return gulp.src(paths.css.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulpAutoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename(paths.css.fileName))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(server.stream());
}

// Build production ready CSS file - build
function stylesDist() {
  const plugins = [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ];
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpPostcss(plugins))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(rename(paths.css.fileName))
    .pipe(gulp.dest(paths.css.dest));
}

// Transpile es6 to es5 & concat all js files - dev
function scripts() {
  return gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(concat(paths.js.fileName))
    .pipe(gulp.dest(paths.js.dest));
}

// Build production ready js file - build
function scriptsDist() {
  return gulp.src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat(paths.js.fileName))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dest));
}

// Lint all js files - dev & build
function lint() {
  return gulp.src([paths.js.src])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
}

const lintScripts = gulp.series(lint, scripts);
const lintScriptsDist = gulp.series(lint, scriptsDist);

// Watch for folder/ file changes - dev
function watch() {
  gulp.watch(paths.html.src, copyHTML);
  gulp.watch(paths.html.dest, reload);
  gulp.watch(paths.css.src, styles);
  gulp.watch(paths.js.src, gulp.series(lint, scripts, reload));
  gulp.watch(paths.css.vendor.src, copyCSS);
  gulp.watch(paths.css.dest, reload);
  gulp.watch(paths.js.vendor.src, copyJS);
  gulp.watch(paths.js.vendor.dest, reload);
}

// Gulp commands names
// Dev command
const dev = gulp.series(copyAll, styles, lintScripts, serve, watch);

// Default gulp command
export default dev;

// Build command for production
export const build = gulp.series(cleanAll, gulp.parallel(copyAll, images, stylesDist, lintScriptsDist));

// Deploy to gh-pages
export const deploy = () => {
  return gulp.src(`${dirs.dest}/**/*`)
    .pipe(ghPages());
}
