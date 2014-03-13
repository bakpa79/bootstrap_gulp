//npm install gulp http path gulp-minify-js gulp-minify-css gulp-util gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename connect gulp-livereload --save-dev


var gulp = require('gulp'),
	gulpSass = require('gulp-sass'),
	gulpUtil = require('gulp-util'),
	gulpUglify = require('gulp-uglify'),
	gulpMinifyCSS = require('gulp-minify-css'),
	gulpRename = require('gulp-rename'),
	connect = require('connect'),
	concat = require('gulp-concat'),
	http= require ('http'),
	path = require('path'),
	gulpJshint = require('gulp-jshint'),
	gulpLiveReload = require('gulp-livereload'),
	server = gulpLiveReload();

//setup tasks
gulp.task('server', function()
{
  var app, base, directory, hostname, port;
  port = 8888;
  hostname = null;
  base = path.resolve('.');
  directory = path.resolve('.');
  app = connect().use(connect["static"](base)).use(connect.directory(directory));
  gulpUtil.log('w00t a server!!!!');
  return http.createServer(app).listen(port, hostname);
});

gulp.task('sass', function () {
  return gulp.src([
  	'assets/scss/*.scss'])
    .pipe(gulpSass({}))
    .pipe(gulpMinifyCSS({}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(''));
});

gulp.task('js', function() {
	return gulp.src([
		'assets/js/bootstrap/*.js',])
	.pipe(gulpJshint())
	.pipe(gulpJshint.reporter('default'))
	.pipe(concat('app.js'))
	.pipe(gulp.dest(''));
});

gulp.task('pageReload', function() {
	return gulp.src(['.html'])
	.pipe(gulpLiveReload());
});

gulp.task('watch', function() {
    gulp.watch('assets/scss/*.scss', ['sass', 'pageReload']);  
    gulp.watch('assets/scss/bootstrap/*.scss', ['sass', 'pageReload']);
    gulp.watch('assets/js/*.js', ['js', 'pageReload']); 
    gulp.watch('assets/js/bootstrap/*.js', ['js', 'pageReload']); 
    // gulp.watch('build/*.html', ['pageReload']); 
});