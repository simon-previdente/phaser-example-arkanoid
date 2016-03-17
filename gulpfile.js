'use strict';

/**
 * Dependencies
 **/
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var template = require('gulp-template');
var kebabCase = require('lodash/string/kebabCase');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var pkg = require('./package.json');

var paths = {
  index: {
    src: pkg.project.source + pkg.project.index,
    dest: pkg.project.build
  },
  assets: {
    src: pkg.project.source + pkg.project.bundle.assets,
    dest: pkg.project.build + pkg.project.bundle.assets
  },
  js: {
    index: pkg.project.source + '/game/index.js',
    bundle: 'bundle-' + pkg.name + '.js',
    dest: pkg.project.build
  }
}

/**
 * Clean build directory
 */
gulp.task('clean', function(cb) {
  return del([pkg.project.build + '/**/*']);
});

/**
 * Build index
 */
gulp.task('build-index', function() {
  return gulp.src(paths.index.src)
    .pipe(plumber())
    .pipe(template({
      title: pkg.name,
      bundle: paths.js.bundle,
      gameId: kebabCase(pkg.name)
    }))
    .pipe(gulp.dest(paths.index.dest))
    .pipe(reload({stream: true}));
});

/**
 * Build js
 */
gulp.task('build-js', function() {

  var bundleStream = browserify(paths.js.index)
    .bundle()
    .on('error', function logError(error) {
      gutil.log(gutil.colors.red('BUNDLE JS'), error.toString());
      this.emit('end');
    })
    .pipe(source(paths.js.bundle))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(reload({stream: true}));
});

/**
 * Copy assets
 */
gulp.task('copy-assets', function() {
  return gulp.src(paths.assets.src + '/**/*')
    .pipe(gulp.dest(paths.assets.dest));
});

/**
 * Launch dev server
 */
gulp.task('serve', function() {

  browserSync({
    server: {
      baseDir: pkg.project.build
    },
    open: false,
    reloadOnRestart: true
  });

  gulp.watch([paths.index.src], ['build-index']);
  gulp.watch([paths.js.index], ['build-js']);

});

/**
 * Build game
 */
gulp.task('build', ['build-index', 'build-js', 'copy-assets']);

/**
 * DEFAULT
 */
gulp.task('default', function() {
  runSequence(
    ['clean'],
    ['build'],
    ['serve']
  );
});
