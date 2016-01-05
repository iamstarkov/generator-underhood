var yeoman = require('yeoman-generator');
var pkg = require('./../../package.json');
var join = require('path').join;
var fs = require('fs');

function ifEmpty(errorMessage, val) {
  return val.length > 0 ? true : errorMessage;
}

module.exports = yeoman.generators.Base.extend({
  prompting: function prompting() {
    var done = this.async();

    var prompts = [{
      name: 'underhoodName',
      message: 'underhood username:',
      validate: ifEmpty.bind(null, 'You have to provide name'),
    }, {
      name: 'underhoodDesc',
      message: 'underhood description:',
      validate: ifEmpty.bind(null, 'You have to provide description'),
    }, {
      name: 'underhoodSite',
      message: 'underhood site:',
      validate: ifEmpty.bind(null, 'You have to provide site'),
    }, {
      name: 'githubUser',
      message: 'github user:',
      validate: ifEmpty.bind(null, 'You have to provide github user'),
    }, {
      name: 'githubRepo',
      message: 'github repo:',
      validate: ifEmpty.bind(null, 'You have to provide github repo'),
    }, {
      name: 'curatorEmail',
      message: 'curator email:',
      validate: ifEmpty.bind(null, 'You have to provide email'),
    }, {
      name: 'curatorTwitter',
      message: 'curator twitter:',
      validate: ifEmpty.bind(null, 'You have to provide twitter'),
    }];

    this.prompt(prompts, function prompt(props) {
      props.creatorTwitter = 'iamstarkov';
      props.creatorCreds = 'iamstarkov@gmail.com (Vladimir Starkov)';
      props.gauges = '56742cb6c88d9046da0016f5';
      props.underhoodVersion = pkg.version;

      this.props = props;
      done();
    }.bind(this));
  },

  writing: function writing() {
    var copy = function copy(from, to) {
      this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
    }.bind(this);

    fs.stat(this.destinationPath('authors.js'), function stat(err) {
      if (err) {
        copy('authors.js', 'authors.js');
      }
    });

    copy('underhoodrc.json', '.underhoodrc.json');
    copy('css', 'css');
    copy('js', 'js');
    copy('static/CNAME', 'static/CNAME');
    copy('static/nojekyll', 'static/.nojekyll');
    copy('dump', 'dump');
    copy('helpers', 'helpers');
    copy('layouts', 'layouts');
    copy('pages', 'pages');
    copy('editorconfig', '.editorconfig');
    copy('eslintignore', '.eslintignore');
    copy('eslintrc', '.eslintrc');
    copy('gitignore', '.gitignore');
    copy('travis.yml', '.travis.yml');
    copy('deploy.sh', 'deploy.sh');
    copy('gulpfile.babel.js', 'gulpfile.babel.js');
    copy('README.md', 'README.md');
    copy('stats.js', 'stats.js');
    copy('test.js', 'test.js');
    copy('update.js', 'update.js');
    copy('webpack.config.babel.js', 'webpack.config.babel.js');
    copy('_package.json', 'package.json');
    copy('CHANGELOG.md', 'CHANGELOG.md');
    copy('ROADMAP.md', 'ROADMAP.md');
    copy(join('migration', pkg.version + '.js'), 'migration.js');

    this.composeWith('git-init', {}, {
      local: require.resolve('generator-git-init/generators/app'),
    });
  },

  install: function install() {
    this.installDependencies({ bower: false });
  },
});
