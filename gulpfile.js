const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const glob = require('glob');
const vinylfs = require('vinyl-fs');
const argv = require('yargs').argv;

gulp.task('dist', [], () => {
  return vinylfs.src(['./src/*.scss', '!./src/tests.scss'])
    .pipe(sass({
      'outputStyle': argv.dev ? 'development' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('tests', [], () => {
  return gulp.src(['./src/tests.scss'])
    .pipe(sass({
      'outputStyle': argv.dev ? 'development' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./examples/'));
});

gulp.task('default', ['dist', 'tests'], () => {});

gulp.task('watch', ['default'], () => {
  gulp.watch(glob.sync('./src/*.scss'), ['dist']);
});
