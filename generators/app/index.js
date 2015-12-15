var yeoman = require('yeoman-generator');

function ifEmpty(errorMessage, val) {
  return val.length > 0 ? true : errorMessage;
}

module.exports = yeoman.generators.Base.extend({
  prompting: function prompting() {
    var done = this.async();

    var prompts = [{
      name: 'underhoodName',
      message: 'underhood username:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide name'),
    }, {
      name: 'underhoodDesc',
      message: 'underhood description:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide description'),
    }, {
      name: 'underhoodSite',
      message: 'underhood site:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide site'),
    }, {
      name: 'githubUser',
      message: 'github user:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide github user'),
    }, {
      name: 'githubRepo',
      message: 'github repo:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide github repo'),
    }, {
      name: 'curatorEmail',
      message: 'curator email:',
      store: true,
      validate: ifEmpty.bind(null, 'You have to provide email'),
    }];

    this.prompt(prompts, function prompt(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function writing() {
    var copy = function copy(from, to) {
      this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props);
    }.bind(this);

    this.fs.writeJSON('.underhoodrc.json', {
      underhood: this.props.underhoodName,
      underhoodDesc: this.props.underhoodDesc,
      underhoodSite: this.props.underhoodSite,
      githubUser: this.props.githubUser,
      githubRepo: this.props.githubRepo,
      curatorEmail: this.props.curatorEmail,
    });

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
    copy('authors.js', 'authors.js');
    copy('deploy.sh', 'deploy.sh');
  },

  install: function install() {
    this.installDependencies({ bower: false });
  },
});
