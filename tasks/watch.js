var gulp = require('gulp');
var watch = require('gulp-watch');

module.exports = function () {
    gulp.watch('./src/scripts/**/*.js', ['eslint', 'browserify']),
        gulp.watch('./src/images/*', ['imagemin']),
        gulp.watch('./src/scss/**/*.scss', ['sass']),
        gulp.watch('./src/templates/**/*.html', ['copy']);
};
