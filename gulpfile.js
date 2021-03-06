var gulp 		 	   = require('gulp'),
		browserSync  = require('browser-sync').create(),
		pug					 = require('gulp-pug'),
		sass 		 	   = require('gulp-sass'),
		rimraf 			 = require('rimraf'),
		rename			 = require('gulp-rename'),
		autoprefixer = require('autoprefixer'),
		sourcemaps	 = require('gulp-sourcemaps'),
		postcss			 = require('gulp-postcss'),
		uglify			 = require('gulp-uglify'),
		concat			 = require('gulp-concat');


/* --------------- BrowserSync --------------- */

gulp.task('server', function() {
	browserSync.init({
		server: {
			port: 3000,
			baseDir: "build"
		}
	});

	gulp.watch('build/**/*').on('change', browserSync.reload);
});


/* --------------- Pug compile --------------- */

gulp.task('templates:compile', function buildHTML() {
  return gulp.src('app/template/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'));
});


/* --------------- Sass compile --------------- */

gulp.task('sass:compile', function () {
  return gulp.src('app/css/main.scss')
  	.pipe(sourcemaps.init())
  	.pipe(postcss([ autoprefixer({
  		browsers: ['last 10 versions'],
  		cascade: false }) 
  	]))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css/'));
});


/* --------------- JS compile --------------- */

gulp.task('js:compile', function() {
	return gulp.src([
			'app/js/burger.js',
			'app/js/main.js',
			'app/js/map.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js'))
});


/* --------------- Delete --------------- */

gulp.task('clean', function del(cb) {
	return rimraf('build/', cb);
});


/* --------------- Copy fonts --------------- */

gulp.task('copy:fonts', function() {
	return gulp.src('./app/fonts/**/*.*')
		.pipe(gulp.dest('build/fonts'));
});


/* --------------- Copy images --------------- */

gulp.task('copy:images', function() {
	return gulp.src('./app/img/**/*.*')
		.pipe(gulp.dest('build/img'));
});

/* --------------- Copy css --------------- */

gulp.task('copy:css', function() {
	return gulp.src('app/css/libs/*.*')
		.pipe(gulp.dest('build/css'));
})

/* --------------- Copy js --------------- */

gulp.task('copy:js', function() {
	return gulp.src('./app/js/libs/*.*')
		.pipe(gulp.dest('build/js'));
});

/* --------------- Copy --------------- */

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:css', 'copy:js'));


/* --------------- Watchers --------------- */

gulp.task('watch', function () {
  gulp.watch('app/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('app/css/**/*.scss', gulp.series('sass:compile'));
  gulp.watch('app/js/**/*.js', gulp.series('js:compile'));
});


/* --------------- Default --------------- */

gulp.task('default', gulp.series(
	'clean',
	gulp.parallel('templates:compile', 'sass:compile', 'js:compile', 'copy'),
	gulp.parallel('watch', 'server')
	)
);