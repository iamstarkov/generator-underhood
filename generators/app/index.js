'use strict';
var yeoman = require('yeoman-generator');

function ifEmpty(errorMessage, val) {
  return val.length > 0 ? true : errorMessage;
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      name: 'underhood',
      message: 'underhood username:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide name')
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var copy = function (from, to) {
      this.fs.copy(this.templatePath(from), this.destinationPath(to));
    }.bind(this);

    copy('css', 'css');
    copy('js', 'js');
  },

  install: function () {
    this.installDependencies();
  }
});
