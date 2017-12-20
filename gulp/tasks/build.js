const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const del = require('del')
const usemin = require('gulp-usemin')
const rev = require('gulp-rev')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  })
})

gulp.task('deleteDistFolder', ['icons'], function() {
  return del("./docs")
})

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"))
})

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"))
})

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start("usemin")
})

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"))
})

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger'])
