var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');

gulp.task('css', function() {
  var processorArray = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];
  return gulp.src('css/**/*.css')
    .pipe(postcss(processorArray))
    .pipe(gulp.dest('public/css'))
});
