'use strict';

/**
 * Dependencies
 **/
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var pkg = require('./package.json');

var paths = {
  index: {
    src: pkg.project.source + pkg.project.index,
    dest: pkg.project.build
  },
  assets: {
    src: pkg.project.source + pkg.project.bundle.assets,
    dest: pkg.project.build + pkg.project.bundle.assets
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
    .pipe(gulp.dest(paths.index.dest));
});

/**
 * Copy assets
 */
gulp.task('copy-assets', function() {
  return gulp.src(paths.assets.src + '/**/*')
    .pipe(gulp.dest(paths.assets.dest));
});

/**
 * DEFAULT
 */
gulp.task('default', function() {
  runSequence(
    ['clean'],
    ['build-index', 'copy-assets']
  );
});
