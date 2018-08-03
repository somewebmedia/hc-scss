const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const glob = require('glob');
const argv = require('yargs').argv;

gulp.task('dist', () => {
  return gulp.src(['./src/*.scss', '!./src/demo.scss'])
    .pipe(sass({
      'includePaths': ['node_modules'],
      'outputStyle': argv.dev ? 'development' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('demo', () => {
  return gulp.src(['./src/demo.scss'])
    .pipe(sass({
      'includePaths': ['node_modules'],
      'outputStyle': argv.dev ? 'development' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./examples/'));
});

gulp.task('default', ['dist', 'demo'], () => {});

gulp.task('watch', ['default'], () => {
  gulp.watch(glob.sync('./src/*.scss'), ['dist']);
});