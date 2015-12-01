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
      'css', 'js', 'static/CNAME', 'static/.nojekyll'
    ]);
  });
  it('creates files with proper extrapolation', function () {
    assert.fileContent('static/CNAME', /yo\.ru/);
  });
});
