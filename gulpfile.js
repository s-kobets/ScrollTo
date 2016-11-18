var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var path = {
    public: {
        js: 'public/js/'
    },
    src: {
        js: 'static_src/js/*.js'
    },
    watch: {
        js: 'static_src/js/**/*.js'
    }
};

gulp.task('script', function () {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest(path.public.js));
});

gulp.task('build', ['script']);

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function () {
    watch([path.watch.js], function () {
        gulp.start('script');
    });
});