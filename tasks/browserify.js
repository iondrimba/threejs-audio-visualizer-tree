var gulp = require('gulp');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var stringify = require('stringify');
var browserify = require('browserify');
var babelify = require('babelify');

module.exports = function () {
  stringify.registerWithRequire({
    extensions: ['.txt', '.html'],
    minify: true,
    minifier: {
      extensions: ['.html']
    }
  });

  var bundleStream = browserify('./src/scripts/demo.js')
    .transform(babelify, {
      'presets': ['env']
    })
    .transform(stringify(['.html']))
    .bundle();

  bundleStream
    .pipe(source('demo.js'))
    .pipe(gulp.dest('./public/js'))
};
