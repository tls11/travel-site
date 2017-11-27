const gulp = require('gulp')
const watch = require('gulp-watch')
const browserSync = require('browser-sync').create()


gulp.task('watch', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  })

  watch('./app/index.html', () => { // file on computer to watch
    browserSync.reload() // what we want it to do when a change is detected
  })

  watch('./app/assets/styles/**/*.css', () => {
    gulp.start('cssInject')
  }) 
})

gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream())
})
