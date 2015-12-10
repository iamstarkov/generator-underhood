'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-underhood:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        underhoodName: 'yo',
        underhoodSite: 'yo.ru'
      })
      .on('end', done);
  });

  it('creates files', function () {
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
      'helpers/ungroup-into.js'
    ]);
  });

  it('creates files with proper extrapolation', function () {
    assert.fileContent('static/CNAME', /yo\.ru/);
  });

  it('creates proper underhood config', function () {
    assert.fileContent('.underhoodrc.json', /yo/);
  });
});
