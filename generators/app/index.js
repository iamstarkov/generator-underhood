var yeoman = require('yeoman-generator');
var pkg = require('./../../package.json');
var join = require('path').join;
var fs = require('fs');
var assign = require('object-assign');

function ifEmpty(errorMessage, val) {
  return val.length > 0 ? true : errorMessage;
}

module.exports = yeoman.Base.extend({
  prompting: function prompting() {
    var done = this.async();
    var existing = this.fs.exists(this.destinationPath('.underhoodrc.json'))
          ? JSON.parse(this.fs.read(this.destinationPath('.underhoodrc.json')))
          : {};

    var prompts = [];

    if (!existing.underhood) {
      prompts = prompts.concat([{
        name: 'underhoodName',
        message: 'underhood username:',
        validate: ifEmpty.bind(null, 'You have to provide name'),
      }]);
    }

    if (!existing.underhoodDesc) {
      prompts = prompts.concat([{
        name: 'underhoodDesc',
        message: 'underhood description:',
        validate: ifEmpty.bind(null, 'You have to provide description'),
      }]);
    }

    if (!existing.underhoodSite) {
      prompts = prompts.concat([{
        name: 'underhoodSite',
        message: 'underhood site:',
        validate: ifEmpty.bind(null, 'You have to provide site'),
      }]);
    }

    if (!existing.githubUser) {
      prompts = prompts.concat([{
        name: 'githubUser',
        message: 'github user:',
        validate: ifEmpty.bind(null, 'You have to provide github user'),
      }]);
    }

    if (!existing.githubRepo) {
      prompts = prompts.concat([{
        name: 'githubRepo',
        message: 'github repo:',
        validate: ifEmpty.bind(null, 'You have to provide github repo'),
      }]);
    }

    if (!existing.curatorEmail) {
      prompts = prompts.concat([{
        name: 'curatorEmail',
        message: 'curator email:',
        validate: ifEmpty.bind(null, 'You have to provide email'),
      }]);
    }

    if (!existing.curatorTwitter) {
      prompts = prompts.concat([{
        name: 'curatorTwitter',
        message: 'curator twitter:',
        validate: ifEmpty.bind(null, 'You have to provide twitter'),
      }]);
    }

    if (!existing.googleAnalytics) {
      prompts = prompts.concat([{
        name: 'googleAnalytics',
        message: 'google analytics id:'
      }]);
    }

    if (!existing.yandexMetric) {
      prompts = prompts.concat([{
        name: 'yandexMetric',
        message: 'yandex metric id:'
      }]);
    }

    this.prompt(prompts, function prompt(props) {
      if (existing.underhood) {
        existing.underhoodName = existing.underhood;
      }

      this.props = assign({},
        {
          gauges: '56742cb6c88d9046da0016f5'
        },
        props,
        existing,
        {
          underhoodVersion: pkg.version,
          creatorTwitter: 'iamstarkov',
          creatorCreds: 'iamstarkov@gmail.com (Vladimir Starkov)',
        }
      );
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

    this.composeWith('git-init', {}, {
      local: require.resolve('generator-git-init/generators/app'),
    });
  },

  install: function install() {
    this.installDependencies({ bower: false });
  },
});
