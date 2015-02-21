var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    camelize: true
});
var browserSync = require('browser-sync');
var cp = require('child_process');
var mainBowerFiles = require('main-bower-files');
var jsFilter = $.filter('*.js');


/********
 * Dest/src variables
 ********/

var scssMainFile = 'assets/_styles/';
var cssExpanded = 'assets/_styles/build/';
var finalCSS = 'assets/css';
var jsFiles = 'assets/js/*.js';
var finalJS = 'assets/js';
var bowerFiles = 'assets/_bower_components/';

options = {
    uncss: {
        html: ["_site/index.html"]
    }
};

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {
        stdio: 'inherit'
    })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile my styles into both _site/css (for live injecting) and site (for future jekyll builds)
 */

gulp.task('styles', function() {
    return $.rubySass('assets/_styles/', {
        style: "expanded"
    })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe($.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
        .pipe(gulp.dest('assets/_styles/build'))
        .pipe($.uncss(options.uncss))
        .pipe($.minifyCss({
            keepBreaks: false,
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe($.notify({
            message: 'Styles task complete'
        }))
    browserSync.reload();
});


/**
 * Compile my js files into both _site/css (for live injecting) and site (for future jekyll builds)
 */

gulp.task('scripts', function() {
    return gulp.src([, 'assets/js/*.js', '!assets/js/app.js', '!assets/js/modernizr.js'])
        .pipe($.newer('app.js'))
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(finalJS));
    browserSync.reload();
});


gulp.task('modernizr', function() {
    return gulp.src(bowerFiles + 'modernizr/modernizr.js')
        .pipe($.uglify())
        .pipe(gulp.dest(finalJS));
});

gulp.task('bowerJSFiles', function() {
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulp.dest(finalJS));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('assets/_styles/**/*.scss', ['styles', 'jekyll-rebuild']);
    gulp.watch('assets/js/*.app', ['scripts', 'jekyll-rebuild']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);