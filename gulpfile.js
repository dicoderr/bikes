"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var surge = require("gulp-surge");
var googleWebFonts = require("gulp-google-webfonts");
var soften = require("gulp-soften");

var options = {
  cssDir: "../sass/base/",
  cssFilename: "_typography.scss",
};

gulp.task("webfonts", function () {
  return gulp.src("./fonts.list")
    .pipe(googleWebFonts(options))
    .pipe(gulp.dest("./source/fonts"))
    ;
});

gulp.task('soften', function () {
  return gulp.src('./source/sass/base/_typography.scss')
    .pipe(soften(2))
    .pipe(gulp.dest('./source/sass/base'));
});

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("copyjs", function () {
  return gulp
    .src("node_modules/imask/dist/imask.min.js")
    .pipe(gulp.dest("build/js"));
});

gulp.task("copycss", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo(),
      ])
    )

    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp
    .src("source/img/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2,ttf}",
        "source/img/**",
        "source/js/**",
        "source//*.ico",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("surge", function () {
  return surge({
    project: "./build",
    domain: "di-bikes.surge.sh",
  });
});

gulp.task("build", gulp.series("clean", "copy", "copycss", "copyjs", "css",
  "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
gulp.task("deploy", gulp.series("build", "surge"));
gulp.task("fonts", gulp.series("webfonts", "soften"));
