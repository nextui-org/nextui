const setupPackage = require('./setup-package');
const path = require('path');
const fse = require('fs-extra');
const shell = require('./utils').shell;
const step = require('./utils').step;
const error = require('./utils').error;
const libRoot = path.join(__dirname, '../lib');
const rootDir = path.join(__dirname, '../');

const buildPkg = step('build pkg...', () => shell(`yarn build`));

const minifyPkg = step('minify pkg...', () => shell(`yarn build:minify`));

const printPkg = step('print pkg...', () => {
  const genPkgJson = fse
    .readFileSync(`${libRoot}/package.json`)
    .toString('utf-8');
  console.log(JSON.parse(genPkgJson));
});

const copyFromRoot = (file) =>
  fse.copySync(`${rootDir}/${file}`, `${libRoot}/${file}`, { overwrite: true });

Promise.resolve(true)
  .then(buildPkg)
  .then(minifyPkg)
  .then(() => {
    setupPackage();
    printPkg();
    copyFromRoot('README.md');
    copyFromRoot('LICENSE');
  })
  .catch(error);
