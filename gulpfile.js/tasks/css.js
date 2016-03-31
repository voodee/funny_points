var config       = require('../config')
if(!config.tasks.css) return

var gulp         = require('gulp')
var browserSync  = require('browser-sync')

var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')

var path         = require('path')

var stylus       = require('gulp-stylus') 
var nib          = require('nib')

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    // .pipe(sass(config.tasks.css.sass))
    .pipe(stylus({
       use: [nib()]
       //compress: true
     }))
    .on('error', handleErrors)

    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('css', cssTask)
module.exports = cssTask
