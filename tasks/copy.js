var gulp = require('gulp');

module.exports = function () {
  gulp.src(['./src/scripts/demo.js'])
    .pipe(gulp.dest('./public/js'));

  gulp.src(['./src/styles/demo.css'])
    .pipe(gulp.dest('./public/css'));

  gulp.src(['./src/jingle_bells.mp3'])
    .pipe(gulp.dest('./public/'));

  gulp.src(['./src/models/*'])
    .pipe(gulp.dest('./public/models'));

  return gulp.src(['./src/templates/index.html'])
    .pipe(gulp.dest('./public'));
};
