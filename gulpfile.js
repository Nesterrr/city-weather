'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const path = require('path');
const browserSync = require('browser-sync');

var reload = browserSync.reload;

const paths = {
    html:['./src/index.html'],
    css:['./src/css/main.scss']
};

gulp.task('less', function () {
  return gulp.src('./less/**/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(reload({stream:true}));
});

gulp.watch('./less/**/*.*', gulp.series('less'));