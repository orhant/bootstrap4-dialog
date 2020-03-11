// Gulpfile.js

"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  minifyCSS = require("gulp-minify-css"),
  notify = require("gulp-notify"),
  clean = require("gulp-clean"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify");

var sass_src = [
  "node_modules/bootstrap/scss/variables.scss", 
  "node_modules/bootstrap/scss/mixins/*.scss",
  "src/scss/bootstrap-dialog.scss"
];

gulp.task("sass", function () {
    gulp.src(sass_src)
    .pipe(concat("bootstrap-dialog.scss"))
    .pipe(gulp.dest("dist/scss"))
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(gulp.dest("src/css"))
    .pipe(rename("bootstrap-dialog.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("lint", function() {
  gulp.src(["src/js/bootstrap-dialog.js"])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("dist", ["clean", "sass"], function() {
  gulp.src(["src/js/bootstrap-dialog.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(rename("bootstrap-dialog.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(notify({
      message: "Build task completed."
    }));
});

gulp.task("clean", function() {
  return gulp.src(["dist/"], {
    read: false
  })
    .pipe(clean());
});

gulp.task("default", ["clean"], function() {
  gulp.start("dist");
});
