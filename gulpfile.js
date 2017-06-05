const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const glob = require('glob');
const argv = require('yargs').argv;

gulp.task('dist', [], () => {
  return gulp.src(['./src/*.scss'])
    .pipe(sass({
      'outputStyle': argv.dev ? 'development' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['dist'], () => {});

gulp.task('watch', ['default'], () => {
  gulp.watch(glob.sync('./src/*.scss'), ['dist']);
});
