const gulp = require('gulp')
const watch = require('gulp-watch')
const browerSync = require('browser-sync').create()


gulp.task('watch', () => {
  browerSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  })

  watch('./app/index.html', () => { // file on computer to watch
    browerSync.reload() // what we want it to do when a change is detected
  })

  watch('./app/assets/styles/**/*.css', () => {
    gulp.start('cssInject')
  }) 
})

gulp.task('cssInject', ['styles'], () => {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browerSync.stream())
})
