var config       = require('../config')
if(!config.tasks.jade) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var jade         = require('gulp-jade')
var fs           = require('fs')

var exclude = path.normalize('!**/{' + config.tasks.jade.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.jade.src, '/**/*.jade'), exclude],
  dest: path.join(config.root.dest, config.tasks.jade.dest),
}

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.jade.src, config.tasks.jade.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}


var jadeTask = function() {
  return gulp.src(paths.src)
    .pipe(data(getData))
    .pipe(jade(config.tasks.jade.settings))
    .on('error', handleErrors)
    .pipe(gulpif(process.env.npm_lifecycle_event == 'production', htmlmin(config.tasks.jade.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('jade', jadeTask)
module.exports = jadeTask