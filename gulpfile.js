/**
 * @author cjky<cjky@bilai.net>
 * @date 2016/2/2
 */
// 引入gulp
var gulp = require('gulp');

// 引入依赖模块
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');


//清空编译目录
gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})    //src的第二个参数的{read:false}，是不读取文件加快程序
        .pipe(clean())
});

// 检查脚本
gulp.task('lint', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Less
gulp.task('less', function () {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".css"
        }))
        .pipe(gulp.dest('./dist/css'));
});

// 合并，压缩文件
gulp.task('javascripts', function () {
    gulp.src('./src/javascript/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js"
        }))
        .pipe(gulp.dest('./dist/js'));
});

// 默认任务
gulp.task('default', ['clean'], function () {
    gulp.run('lint', 'less', 'javascripts');

    // 监听js目录文件变化，有变化自动执行语法检查任务和生成scripts任务
    gulp.watch('./src/js/**/*.js', function () {
        gulp.run('lint', 'javascripts');
    });

    // 监听less目录文件变化，有变化自动生成css任务
    gulp.watch('./src/less/**/*.less', function () {
        gulp.run('less');
    });

});