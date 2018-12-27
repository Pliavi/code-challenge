const pump = require("pump");
const gulp = require("gulp");
const styl = require("gulp-stylus");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

gulp.task("copy", cb => {
  pump(
    [
      gulp.src("src/img/*"),
      gulp.dest("dist/img"),
      gulp.src("src/css/**/*.css"),
      gulp.dest("dist/css"),
      gulp.src("src/js/**/*.js"),
      gulp.dest("dist/js")
    ],
    cb
  );
});

gulp.task("styl", cb => {
  var plugins = [autoprefixer({ browsers: ["last 4 version"] }), cssnano()];

  pump(
    [
      gulp.src("src/css/main.styl"),
      styl(),
      postcss(plugins),
      gulp.dest("dist/css")
    ],
    cb
  );
});

gulp.task("pug", cb => {
  pump(
    [
      gulp.src(["src/**/*.pug", "!src/_includes/**/*"]),
      pug(),
      gulp.dest("dist")
    ],
    cb
  );
});

gulp.task("watch", cb => {
  gulp.watch(
    ["src/img/**/*", "src/js/**/*.js", "src/css/**/*"],
    gulp.series("copy")
  );
  gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("src/css/**/*.styl", gulp.series("styl"));
});

gulp.task("default", gulp.parallel("pug", "styl", "copy", "watch"));
