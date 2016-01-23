/* eslint-env mocha */
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var pkg = require('./../package.json');

describe('generator-underhood:app', function _describe() {
  before(function _before(done) {
    // Leave it alone for a little longer...
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        underhoodName: 'yo',
        underhoodDesc: 'best yo from the yoest',
        underhoodSite: 'yo.ru',
        githubUser: 'uhs',
        githubRepo: 'yo',
        curatorEmail: 'curator@ema.il',
        curatorTwitter: 'curator',
      })
      .on('end', done);
  });

  it('creates files', function _it() {
    assert.file([
      '.underhoodrc.json',
      'css/styles.css',
      'js/index.js',
      'static/CNAME',
      'static/.nojekyll',
      'dump/index.js',
      'helpers/author-render.js',
      'helpers/bust.js',
      'helpers/ensure-author-files.js',
      'helpers/get-author-area.js',
      'helpers/get-links.js',
      'helpers/last-updated.js',
      'helpers/log.js',
      'helpers/save-author-area.js',
      'helpers/save-media.js',
      'helpers/save.js',
      'helpers/ungroup-into.js',
      'layouts/article.jade',
      'layouts/author.jade',
      'layouts/footer.jade',
      'layouts/gauges.jade',
      'layouts/head.jade',
      'layouts/header.jade',
      'layouts/index.jade',
      'layouts/menu.jade',
      'layouts/page.jade',
      'layouts/share-text.jade',
      'layouts/share.jade',
      'layouts/stats.jade',
      'pages/about.md',
      'pages/authoring.md',
      'pages/instruction.md',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.travis.yml',
      'authors.js',
      'gulpfile.babel.js',
      'README.md',
      'stats.js',
      'test.js',
      'update.js',
      'webpack.config.babel.js',
      'package.json',
      '.git',
      'CHANGELOG.md',
      'ROADMAP.md',
    ]);
  });

  it('creates files with proper extrapolation', function _it() {
    assert.fileContent('static/CNAME', 'yo.ru');
    assert.fileContent('./pages/about.md', 'yo');
    assert.fileContent('pages/about.md', 'best yo from the yoest');
    assert.fileContent('pages/about.md', 'https://twitter.com/yo');
    assert.fileContent('pages/authoring.md', 'https://twitter.com/yo');
    assert.fileContent('pages/authoring.md', 'curator@ema.il');
    assert.fileContent('deploy.sh', 'git remote add origin '
      + 'https://uhs:${GITHUB_TOKEN}@github.com/uhs/yo.git');
    assert.fileContent('README.md', 'best yo from the yoest');
    assert.fileContent('README.md', 'yo.ru');
    assert.fileContent('layouts/gauges.jade', '568823b84b2ffa534600335e');
  });
});

describe('generator-underhood:app with existing .underhoodrc.json', function _describe() {
  before(function _before(done) {
    // He is not dumb, he is thorough...
    this.timeout(10000);

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        underhoodDesc: 'best yo from the yoest',
        underhoodSite: 'yo.ru',
        githubUser: 'uhs',
        githubRepo: 'yo',
        curatorEmail: 'curator@ema.il',
        curatorTwitter: 'curator',
      })
      .on('ready', function onReady(gen) {
        gen.fs.write(gen.destinationPath('.underhoodrc.json'), '{ "underhood": "yay", "underhoodVersion": "0.0.0" }');
      })
      .on('end', done);
  });

  it('creates files with proper extrapolation', function _it() {
    assert.fileContent('.underhoodrc.json', 'yay');
    assert.fileContent('.underhoodrc.json', pkg.version);
  });
});
