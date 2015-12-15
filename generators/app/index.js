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
  },

  install: function install() {
    this.installDependencies();
  },
});
