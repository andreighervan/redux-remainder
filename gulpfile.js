var gulp=require('gulp');
var browserify=require('browserify');
var reactify=require('reactify');
var source=require('vinyl-source-stream');

gulp.task('browserify',function(){
    browserify('./src/index.js')
        .transform('reactify')
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('default',['browserify','copy'],function(){
    return gulp.watch('src/**/*.*',['browserify','copy']);
});