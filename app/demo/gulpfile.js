var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');
var src = process.cwd();

gulp.task('sass', function () {
  gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(prefix({
      versions: ['IE 9']
    }))
    .pipe(cssnano())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./styles'));
});

gulp.task('html', function () {

  gulp.src(['_pages/*.html'])
    .pipe(wrap({
      src: '_layout/layout.html'
    }))
    .pipe(gulp.dest('./pages'));
});

gulp.task('watch', ['sass', 'html'], function () {
  gulp.watch('sass/**/*', {cwd: src}, ['sass']);
  gulp.watch('_pages/**/*', {cwd: src}, ['html']);
  gulp.watch('_layout/**/*', {cwd: src}, ['html']);
});

gulp.task('default', ['watch']);
