const setupPackage = require('./setup-package');
const path = require('path');
const fs = require('fs-extra');
const shell = require('./utils').shell;
const step = require('./utils').step;
const error = require('./utils').error;
const libRoot = path.join(__dirname, '../lib');

const buildPkg = step('build pkg...', () => shell(`yarn build`));

const printPkg = step('print pkg...', () => {
  const genPkgJson = fs
    .readFileSync(`${libRoot}/package.json`)
    .toString('utf-8');
  console.log(JSON.parse(genPkgJson));
});

Promise.resolve(true)
  .then(buildPkg)
  .then(() => {
    setupPackage();
    printPkg();
  })
  .catch(error);
