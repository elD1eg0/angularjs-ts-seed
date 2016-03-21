'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var watch = require('gulp-watch');

var join = require('path').join;
var yargs = require('yargs');

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var openResource = require('open');

var port = 5555;

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function(path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

// --------------
// Serve dev.

gulp.task('serve.dev', ['build.dev'], function() {
  var app = connect();

  $.livereload.listen();
  watch(PATH.src.lib.js.concat(PATH.src.lib.css), function() {
    gulp.start('build.lib.dev');
  });
  watch(PATH.src.app.dev, function() {
    gulp.start('build.js.dev');
  });
  watch(PATH.src.html.directive, function() {
    gulp.start('build.html.dev');
  });
  watch(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'], function() {
    gulp.start('build.assets.dev');
  });
  watch(injectableDevAssetsRef(), function() {
    gulp.start('build.index.dev');
  });
  watch(PATH.src.scss, function() {
    gulp.start('build.styles.dev');
  });
  // watch('./app/**', function() {
  //   gulp.start('build.app.dev');
  // });

  app.use(serveStatic(join(__dirname, '..', PATH.dest.dev.all)));
  app.use(serveStatic(join(__dirname, '..', 'app')));
  app.listen(port, function() {
    openResource('http://localhost:' + port);
  });
});

// --------------
// Serve prod.

gulp.task('serve.prod', ['build.prod'], function() {
  var app;

  watch('./app/**', function() {
    gulp.start('build.app.prod');
  });

  app = connect().use(serveStatic(join(__dirname, '..', PATH.dest.prod.all)));
  http.createServer(app).listen(port, function() {
    openResource('http://localhost:' + port);
  });
});

function serve() {
  var argv = yargs.reset()
    .usage('Usage: gulp serve -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment and serve')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.prod)
    gulp.start('serve.prod');
  else
    gulp.start('serve.dev');
}

serve.description = 'Build for either Development or the requested environment and serve';

serve.flags = {
  '-p, --prod': 'Build for Production Environment',
  '-s, --support': 'Show help'
};


gulp.task('serve', serve);
