var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    camelize: true
});
var browserSync = require('browser-sync');
var cp = require('child_process');


/********
 * Dest/src variables
 ********/

var jsFiles = 'assets/js/*.js';
var finalJS = 'assets/js';

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
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile JS into assets/js/app.js.
 */

gulp.task('scripts', function() {
    return gulp.src([jsFiles, '!assets/js/app.js', '!assets/js/modernizr.js'])
        .pipe($.newer('app.js'))
        .pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(finalJS));
});


/**
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('assets/css/*.css', ['jekyll-rebuild']);
    gulp.watch(jsFiles, ['scripts', 'jekyll-rebuild']);
    gulp.watch(['index.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the Jekyll site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
