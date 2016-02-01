var gulp = require('gulp');
var coffee = require('gulp-coffee');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var copy = require('gulp-copy2');
var zip = require('gulp-zip'); 

var pkg = require('./package.json');

gulp.task('build:source', function () {
	return gulp.src('./src/**/*.coffee')
		.pipe(coffee({ bare: true }))
		.pipe(gulp.dest('./build'));
});

gulp.task('build:tests', function () {
	return gulp.src('./tests/**/*.coffee')
		.pipe(coffee({ bare: true }))
		.pipe(gulp.dest('./tests'));
});

gulp.task('build:demo', function () {
	return gulp.src('./demo/**/*.coffee')
		.pipe(coffee({ bare: true }))
		.pipe(gulp.dest('./demo'))
});

gulp.task('build:release', [ 'run:tests' ], function () {
	var banner = '/*!\n * <%= name %> <%= version %>\n * (c) <%= author %> - <%= homepage %>\n * License: <%= license.type %> (<%= license.url %>)\n */\n';

	return gulp.src([
			'src/fragments/prefix.js',
			'build/url-query-parser.js',
			'src/route.js',
			'build/router.js',
			'build/extension.js',
			'src/fragments/suffix.js',
		])
		.pipe(concat('knockout-singlepage.js'))
		.pipe(uglify())
		.pipe(header(banner, pkg))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build:package', [ 'build:release' ], function () {
	return gulp.src([
		'dist/knockout-singlepage.js',
		'README.md',
		'LICENSE',
	])
	.pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
	.pipe(gulp.dest('./'))
});

gulp.task('run:tests', function () {
	return gulp.src('./tests/route-tests.js')
		.pipe(jasmine({
			jasmineVersion: "2.3",
			integration: true,
			vendor: [
				'./node_modules/knockout/build/output/knockout-latest.debug.js',
				'build/url-query-parser.js',
				'src/route.js',
				'build/router.js',
				'build/extension.js',
			]
		}));
});

gulp.task('copy:demo', [ 'build:release' ], function () {
	var distFile = './dist/knockout-singlepage.js';

	return copy([
		{ src: distFile, dest: './demo/amd/scripts/' },
		{ src: distFile, dest: './demo/traditional/scripts/' }
	]);
});

/* Watch tasks */

gulp.task('watch:tests', [ 'run:tests' ], function () {
	gulp.watch('./tests/*.js', [ 'run:tests' ]);
	gulp.watch('./src/**/*.js', [ 'run:tests' ]);
});

gulp.task('watch', function () {
	gulp.watch('./**/*.coffee', [ 'copy:demo' ]);
	gulp.watch('./src/**/*.js', [ 'copy:demo' ]);
	gulp.watch('./tests/*.js', [ 'run:tests' ]);
});

/* Meta tasks */

gulp.task('demo', [ 'copy:demo', 'build:demo' ]);
gulp.task('build', [ 'build:source', 'build:tests', 'build:demo' ]);
gulp.task('default', [ 'build:release' ]);
