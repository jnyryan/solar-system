var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var del    = require('del');
var es     = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('default', ['all']);

var watcher = gulp.watch('lib/**/*.coffee', ['all']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

// This is a shorter way of doing method 2 below
gulp.task('all', function() {
  var jsFromCoffeeScript =
    gulp
      .src('lib/*.coffee')
      .pipe(sourcemaps.init())
      .pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(sourcemaps.write());
  var js =
    gulp.src('lib/*.js');
  return es.merge(jsFromCoffeeScript, js)
    .pipe(concat('app.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist'));
});

///////////////////////////////////////////////
// Method 2
gulp.task('copy', function () {
  return gulp
    .src('lib/**/*.js')
    .pipe(gulp.dest('_compiled'))
})

gulp.task('coffee', function() {
  return gulp
    .src('lib/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('_compiled'));
});

gulp.task('scripts', ['coffee', 'copy'], function() {
  return gulp
    .src('_compiled/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del([
    '_compiled', 'dist'
  ]);
});
