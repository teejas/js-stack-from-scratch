// require dependencies
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const exec = require('child_process').exec;

// create paths to ES6 scripts object
const paths = {
	allSrcScripts: 'src/**/*.js',
	libDir: 'lib'
};

// define clean task to clear directory
gulp.task('clean', () => {
	return del(paths.libDir);
});

/* define build task clean lib then to treat using babel and
	place treated files in lib */
gulp.task('build', ['clean'], () => {
	return gulp.src(paths.allSrcScripts)
		.pipe(babel())
		.pipe(gulp.dest(paths.libDir));
});

// define main task to build and then execute lib files
gulp.task('main', [ 'build' ], (callback) => {
    exec(`node ${paths.libDir}`, (error, stdout) => {
        console.log(stdout);
        return callback(error);
    });
});

/* define watch task to track original source files and run main task if any
    files are changed in the source folder */
gulp.task('watch', () => {
    gulp.watch(paths.allSrcScripts, [ 'main' ]);
});

// define default task that executes watch and main
gulp.task('default', [ 'watch', 'main' ]);