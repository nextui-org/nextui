const setupPackage = require('./setup-package');

const shell = require('./utils').shell;
const step = require('./utils').step;
const error = require('./utils').error;

const buildPkg = step('building...', () => shell(`yarn build`));

Promise.resolve(true)
  .then(buildPkg)
  .then(
    Promise.all([setupPackage()]).then(() => {
      console.log(process.cwd());
      //   shell('pwd');
    })
  )
  .catch(error);
