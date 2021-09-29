const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const cherryPick = require('./cherry-pick').default;
const getConfig = require('./webpack.config');

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '../src');
const typesRoot = path.join(__dirname, '../types');
const dirRoot = path.join(__dirname, '.');

const libRoot = path.join(__dirname, '../lib');
const umdRoot = path.join(libRoot, 'umd');
const cjsRoot = path.join(libRoot, 'cjs');
const esRoot = path.join(libRoot, 'esm');

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = (cmd) =>
  execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step('generating .d.ts', () => shell(`yarn build-types`));

const copyTypes = (dest) => fse.copySync(typesRoot, dest, { overwrite: true });

const babel = (outDir, envName) =>
  shell(
    `yarn babel ${srcRoot} --config-file ${dirRoot}/babel.config.js -x .js,.jsx,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`
  );

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', async () => {
  await babel(cjsRoot, 'cjs');
  await copyTypes(cjsRoot);
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await babel(esRoot, 'esm');
  await copyTypes(esRoot);
});

/**
 * Bundles a minified and unminified version of nextui including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildUmd = step(
  'browser distributable',
  () =>
    new Promise((resolve, reject) => {
      webpack(
        [getConfig(umdRoot, false), getConfig(umdRoot, true)],
        async (err, stats) => {
          if (err || stats.hasErrors()) {
            reject(err || stats.toJson().errors);
            return;
          }

          resolve();
        }
      );
    })
);

const buildDirectories = step('Linking directories', () =>
  cherryPick({
    inputDir: '../src/**',
    cjsDir: 'cjs',
    esmDir: 'esm',
    cwd: libRoot,
  })
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`)
);

clean();

Promise.resolve(true)
  .then(buildTypes)
  .then(() =>
    Promise.all([
      has('lib') && buildLib(),
      has('es') && buildEsm(),
      has('umd') && buildUmd(),
    ])
  )
  .then(buildDirectories)
  .catch((err) => {
    if (err && Array.isArray(err))
      console.log(red(err.map((e) => e.message).join('\n')));
    if (err && typeof err === 'object')
      console.error(red(err.stack || err.toString()));
    process.exit(1);
  });
