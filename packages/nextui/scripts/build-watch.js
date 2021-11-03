const { green } = require('chalk');

const path = require('path');
const fse = require('fs-extra');

const cherryPick = require('./cherry-pick').default;

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '../src');
const typesRoot = path.join(__dirname, '../types');

const libRoot = path.join(__dirname, '../lib');
const esRoot = path.join(libRoot, 'esm');

const step = require('./utils').step;
const shell = require('./utils').shell;
const error = require('./utils').error;

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step('generating .d.ts', () => shell(`yarn build:types`));

const copyTypes = (dest) => fse.copySync(typesRoot, dest, { overwrite: true });

const babel = (outDir, envName) => {
  shell(
    `yarn babel ${srcRoot} -x .js,.jsx,.ts,.tsx --out-dir ${outDir} --env-name "${envName}" --watch`
  );
};

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await babel(esRoot, 'esm');
  await copyTypes(esRoot);
});

const buildDirectories = step('Linking directories', () =>
  cherryPick({
    inputDir: '../src/**',
    cjsDir: 'cjs',
    esmDir: 'esm',
    cwd: libRoot
  })
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`)
);

clean();

Promise.resolve(true)
  .then(buildTypes)
  .then(() => Promise.all([has('es') && buildEsm()]))
  .then(buildDirectories)
  .catch(error);
