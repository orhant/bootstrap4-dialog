// Gulpfile.js

"use strict";

const FOLDER_SRC = "src"
    , FOLDER_DIST = "dist"
    , FOLDER_JS = "js"
    , FOLDER_CSS = "css"
    , FOLDER_SASS = "scss"

    , FOLDER_SRC_SCSS = FOLDER_SRC + "/" + FOLDER_SASS
    , FOLDER_SRC_JS = FOLDER_SRC + "/" + FOLDER_JS
    , FOLDER_DIST_CSS = FOLDER_DIST + "/" + FOLDER_CSS
    , FOLDER_DIST_JS = FOLDER_DIST + "/" + FOLDER_JS
    ;


//var gulp = require("gulp"),
//    sass = require("gulp-sass"),
//    minifyCSS = require("gulp-minify-css"),
//    notify = require("gulp-notify"),
//    clean = require("gulp-clean"),
//    rename = require("gulp-rename"),
//    uglify = require("gulp-uglify");

//gulp.task("sass", function () {
//    return gulp.src(FOLDER_SRC_SCSS + "/bootstrap-dialog.scss")
//        .pipe(sass())
//        .pipe(gulp.dest(FOLDER_DIST_CSS))
//});

//gulp.task("minifycss", function () {
//    return gulp.src(FOLDER_DIST_CSS + "/**/*.css")
//        .pipe(minifyCSS())
//        .pipe(gulp.dest(FOLDER_DIST_CSS))
//});

//gulp.task("lint", function () {
//    gulp.src([FOLDER_SRC_JS + "/bootstrap-dialog.js"])
//        .pipe(eslint())
//        .pipe(eslint.format());
//});

//gulp.task("dist", ["clean", "sass"], function () {
//    gulp.src([FOLDER_SRC_JS + "/bootstrap-dialog.js"])
//        .pipe(gulp.dest(FOLDER_DIST_JS))
//        .pipe(rename("bootstrap-dialog.min.js"))
//        .pipe(uglify())
//        .pipe(gulp.dest(FOLDER_DIST_JS))
//        .pipe(notify({
//            message: "Build task completed."
//        }));
//});

//gulp.task("clean", function () {
//    return gulp.src([FOLDER_DIST + "/"], {
//        read: false
//    })
//        .pipe(clean());
//});

//gulp.task("default", ["clean"], function () {
//    //gulp.start("dist");
//});

const { series, parallel, src, dest } = require('gulp');
const clean = require("gulp-clean");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");

function reset(cb) {
    src([FOLDER_DIST + "/**/"], { read: false }).pipe(clean());
    cb();
}

function css(cb) {
    src(FOLDER_SRC_SCSS + "/bootstrap-dialog.scss")
        .pipe(sass())
        .pipe(dest(FOLDER_DIST_CSS));

    src(FOLDER_DIST_CSS + "/**/*.css")
        .pipe(minifyCSS())
        .pipe(dest(FOLDER_DIST_CSS));

    cb();
}

function js(cb) {
    cb();
}

exports.default = series(reset, parallel(css, js));