'use strict';
var yeoman = require('yeoman-generator');

function ifEmpty(errorMessage, val) {
  return val.length > 0 ? true : errorMessage;
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      name: 'underhoodName',
      message: 'underhood username:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide name')
    }, {
      name: 'underhoodDesc',
      message: 'underhood description:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide description')
    }, {
      name: 'underhoodSite',
      message: 'underhood site:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide site')
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var copy = function (from, to) {
      this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
    }.bind(this);

    this.fs.writeJSON('.underhoodrc.json', {
      underhood: this.props.underhoodName
    });

    copy('css', 'css');
    copy('js', 'js');
    copy('static/CNAME', 'static/CNAME');
    copy('static/nojekyll', 'static/.nojekyll');
    copy('dump', 'dump');
    copy('helpers', 'helpers');
    copy('layouts', 'layouts');
    copy('pages', 'pages');
  },

  install: function () {
    this.installDependencies();
  }
});
