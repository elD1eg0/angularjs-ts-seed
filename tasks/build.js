'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');

var fs = require('fs');
var join = require('path').join;
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var yargs = require('yargs');

var appProdBuilder = new Builder({
  baseURL: 'file:./tmp',
});

var HTMLMinifierOpts = { conditionals: true };

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

// --------------
// Build dev.

gulp.task('build.lib.dev', /*['build.ng2.dev'],*/ function() {
  return gulp.src(PATH.src.lib)
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.js.dev', ['lint'], function() {
  var result = gulp.src(PATH.src.app.dev)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.assets.dev', ['build.js.dev'], function() {
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.index.dev', function() {
  var target = gulp.src(injectableDevAssetsRef(), { read: false });
  return gulp.src('./app/index.html')
    .pipe(inject(target, { transform: transformPath('dev') }))
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.app.dev', function(done) {
  runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});

gulp.task('build.dev', function(done) {
  runSequence('clean.dev', 'build.lib.dev', 'build.app.dev', done);
});

// --------------
// Build prod.

gulp.task('build.lib.prod', /*['build.ng2.prod'],*/ function() {
  var jsOnly = filter('**/*.js');

  return gulp.src(PATH.src.lib)
    .pipe(jsOnly)
    .pipe(sourcemaps.init())
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('build.js.tmp', function() {
  var result = gulp.src(['./app/**/*.ts', '!./app/init.ts',
    '!./app/**/*.spec.ts'])
    .pipe(plumber())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest('tmp'));
});

// TODO: add inline source maps (System only generate separate source maps file).
gulp.task('build.js.prod', ['build.js.tmp'], function() {
  gulp.src('./tmp/at-angular*.js').pipe(gulp.dest(PATH.dest.prod.all));
  return appProdBuilder.build('app', join(PATH.dest.prod.all, 'app.js'),
    { minify: true }).catch(function(e) { console.log(e); });
});

gulp.task('build.init.prod', function() {
  var result = gulp.src('./app/init.ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template({ VERSION: getVersion() }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.assets.prod', ['build.js.prod'], function() {
  var filterHTML = filter('**/*.html');
  var filterCSS = filter('**/*.css');
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
    .pipe(filterHTML)
    .pipe(minifyHTML(HTMLMinifierOpts))
    .pipe(filterHTML.restore())
    .pipe(filterCSS)
    .pipe(minifyCSS())
    .pipe(filterCSS.restore())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.index.prod', function() {
  var target = gulp.src([join(PATH.dest.prod.lib, 'lib.js'),
    join(PATH.dest.prod.all, '**/*.css')], { read: false });
  return gulp.src('./app/index.html')
    .pipe(inject(target, { transform: transformPath('prod') }))
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.app.prod', function(done) {
  // build.init.prod does not work as sub tasks dependencies so placed it here.
  runSequence('clean.app.prod', 'build.init.prod', 'build.assets.prod',
    'build.index.prod', 'clean.tmp', done);
});

gulp.task('build.prod', function(done) {
  runSequence('clean.prod', 'build.lib.prod', 'clean.tmp', 'build.app.prod',
    done);
});

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

function transformPath(env) {
  var v = '?v=' + getVersion();
  return function(filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return inject.transform.apply(inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  var src = PATH.src.lib.map(function(path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

function build() {
  var argv = yargs.reset()
    .usage('Usage: gulp build -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.prod)
    gulp.start('build.prod');
  else
    gulp.start('build.dev');
}

build.description = 'Build for either Development or the requested environment';

build.flags = {
  '-p, --prod': 'Build for Production Environment',
  '-s, --support': 'Show help'
};


gulp.task('build', build);
