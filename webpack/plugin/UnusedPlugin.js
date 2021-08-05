const path = require('path');
const chalk = require('chalk');
const { searchFiles } = require('./lib/utils');

function UnusedPlugin(options) {
  this.sourceDirectories = options.directories || [];
  this.exclude = options.exclude || [];
  this.root = options.root;
  this.useGitIgnore = options.useGitIgnore || true;
}

UnusedPlugin.prototype.apply = function apply(compiler) {
  const checkUnused = (compilation, callback) => {
    const usedModules = Array.from(compilation.fileDependencies)
      .filter(file => this.sourceDirectories.some(dir => file.indexOf(dir) !== -1))
      .reduce((obj, item) => Object.assign(obj, {[item]: true}), {});

    Promise.all(
      this.sourceDirectories.map(dir => searchFiles(dir, this.exclude, this.useGitIgnore))
    )
    .then(files => files.map(arr => arr.filter(file => !usedModules[file])))
    .then(display.bind(this))
    .then(callback);
  }

  compiler.hooks.emit.tapAsync('UnusedPlugin', checkUnused);
}

function display(filesByDirectory) {
  const allFiles = filesByDirectory.reduce((arr, item) => arr.concat(item), []);
  if (!allFiles.length) {
    return [];
  }

  process.stdout.write('\n');
  process.stdout.write(chalk.green('\n*** Unused Plugin ***\n'));
  process.stdout.write(
    chalk.red(`${allFiles.length} unused source files found. \n`)
  )

  filesByDirectory.forEach((files, index) => {
    if (files.length === 0) return;
    const directory = this.sourceDirectories[index];
    const relative = this.root ? path.relative(this.root, directory) : directory;
    process.stdout.write(chalk.blue(`\n~~ ${relative}\n`));
    files.forEach(file => process.stdout.write(
      chalk.yellow(`        ~~${path.relative(directory, file)}\n`),
    ))
  })

  process.stdout.write(chalk.green('\n*** Unused Plugin ***\n'));
}


module.exports = UnusedPlugin;

