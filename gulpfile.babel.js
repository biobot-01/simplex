/* eslint-env node */
'use strict';
// Pull in gulp plugins
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import imageResize from 'gulp-image-resize';
import cache from 'gulp-cache';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import postcss from 'gulp-postcss';
import cleanCSS from 'gulp-clean-css';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import del from 'del';
import browserSync from 'browser-sync';

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
  gulp.series - Execute list of tasks in specific order
  gulp.parallel - Execute list of tasks together
*/

// Specifiy file path constants
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
  styles: {
    src: `${dirs.src}/sass/*.scss`,
    dest: `${dirs.dest}/css`,
    fileName: 'main.min.css'
  },
  scripts: {
    src: `${dirs.src}/js/*.js`,
    dest: `${dirs.dest}/js`,
    fileName: 'main.min.js'
  },
  vendors: {
    css: `${dirs.src}/css/*.css`,
    js: `${dirs.src}/js/vendor/*.js`
  }
};

// Create an instance of a server
const server = browserSync.create();

// Static server function and export as task
export function serve(done) {
  server.init({
    server: {
      baseDir: paths.html.dest
    }
  });
  done();
}

// Create reload function and export as constant
export const reload = (done) => {
  server.reload({
    stream: true
  });
  done();
};

// Clean dist folder
export const clean = (done) => {
  del([paths.html.dest]);
  done();
};

// Clean cached images from dist folder
export const cleanImages = (done) => {
  cache.clearAll();
  done();
};

export const cleanAll = gulp.series(cleanImages, clean);

// Copy all HTML files
export function copyHTML() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

// Minify and copy all css vendor dependencies
export function copyCSS() {
  return gulp.src(paths.vendors.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

// Copy all js vendor dependencies
export function copyJS() {
  return gulp.src(paths.vendors.js)
    .pipe(gulp.dest(paths.scripts.dest));
}

// Copy all functions bundled as one task
export const copyAll = gulp.parallel(copyHTML, copyCSS, copyJS);

// Resize and minify all images
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
    return gulp.src(paths.images.src)
      .pipe(imageResize({
        width: image.width,
        crop: image.crop,
        upscale: false,
        imageMagick: true
      }))
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

// Compile sass into CSS and auto-inject into browsers
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename(paths.styles.fileName))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(reload);
}

export function stylesDist() {
  const plugins = [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ];
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename(paths.styles.fileName))
    .pipe(gulp.dest(paths.styles.dest));
}

// Transpile es6 to es5 and concat all js files
export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(concat(paths.scripts.fileName))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function scriptsDist() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename(paths.scripts.fileName))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Lint all js files
export function lint() {
  return gulp.src([paths.scripts.src])
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

// Watch for file changes
export function watch() {
  gulp.watch(paths.html.src, copyHTML);
  gulp.watch(paths.html.dest, reload);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, gulp.series(lint, scripts, reload));
}

const dev = gulp.series(clean, copyAll, images, styles, lint, scripts, serve, watch);
export default dev;

export const dist = gulp.series(cleanAll, copyAll, images, stylesDist, lint, scriptsDist);
