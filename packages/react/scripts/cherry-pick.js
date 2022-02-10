const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = require('tiny-glob');
const readPkgUp = require('read-pkg-up');

const mkDir = promisify(fs.mkdir);
const rimraf = promisify(require('rimraf'));
const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

const isFile = (path) =>
  stat(path)
    .then((stats) => stats.isFile())
    .catch(() => false);

const withDefaults = (
  { cwd = '.', ...options } = {},
  additionalDefaults = {}
) => ({
  inputDir: 'src',
  cwd: path.resolve(process.cwd(), cwd),
  ...additionalDefaults,
  ...options,
});

const noop = () => {};

// get all folder name from a directory
const getFoldersFromDir = async (cwd, dir) => {
  const files = await glob(`${dir}/*`, { cwd });
  const folders = files
    .filter((file) => file.indexOf('.') === -1)
    .map((file) => file.replace(`${dir}/`, ''));
  return folders;
};

const findFiles = async ({ cwd, inputDir, esmDir }) => {
  const filePaths = await glob(
    path.join(inputDir, '!(index).{js,jsx,ts,tsx}'),
    { cwd }
  );

  const componentsFolders = await getFoldersFromDir(cwd, esmDir);

  const files = filePaths
    .filter((f) => !f.endsWith('.d.ts'))
    .filter((f) => !f.endsWith('.test.ts'))
    .filter((f) => !f.endsWith('.test.tsx'))
    .filter((f) => !f.endsWith('.stories.ts'))
    .filter((f) => !f.endsWith('.stories.tsx'))
    .map((filePath) => path.basename(filePath).replace(/\.(js|ts)x?$/, ''));
  return files.filter((file) => componentsFolders.includes(file));
};

const pkgCache = new WeakMap();

const getPkgName = async (options) => {
  if (options.name != null) {
    return options.name;
  }
  if (pkgCache.has(options)) {
    return pkgCache.get(options);
  }
  const result = await readPkgUp({ cwd: options.cwd });
  if (!result) {
    throw new Error(
      'Could not determine package name. No `name` option was passed and no package.json was found relative to: ' +
        options.cwd
    );
  }
  const pkgName = result.packageJson.name;
  pkgCache.set(options, pkgName);
  return pkgName;
};

const fileProxy = async (options, file) => {
  const { cwd, cjsDir, esmDir, typesDir } = options;
  //   const pkgName = await getPkgName(options);

  const proxyPkg = {
    // name: `${pkgName}/${file}`,
    // private: true,
    sideEffects: false,
    main: path.join('..', cjsDir, `${file}/index.js`),
    module: path.join('..', esmDir, `${file}/index.js`),
    types: path.join('..', esmDir, `${file}/index.d.ts`),
  };

  if (typeof typesDir === 'string') {
    proxyPkg.types = path.join('..', typesDir, `${file}.d.ts`);
  } else if (await isFile(path.join(cwd, `${file}.d.ts`))) {
    proxyPkg.types = path.join('..', `${file}.d.ts`);
    // try the esm path in case types are located with each
  } else if (await isFile(path.join(cwd, esmDir, `${file}.d.ts`))) {
    proxyPkg.types = path.join('..', esmDir, `${file}.d.ts`);
  }

  return JSON.stringify(proxyPkg, null, 2) + '\n';
};

const cherryPick = async (inputOptions) => {
  const options = withDefaults(inputOptions, {
    cjsDir: 'lib',
    esmDir: 'es',
  });

  const files = await findFiles(options);

  await Promise.all(
    files.map(async (file) => {
      const proxyDir = path.join(options.cwd, file);
      await mkDir(proxyDir).catch(noop);
      await writeFile(
        `${proxyDir}/package.json`,
        await fileProxy(options, file)
      );
    })
  );

  return files;
};

const clean = async (inputOptions) => {
  const options = withDefaults(inputOptions);
  const files = await findFiles(options);
  await Promise.all(
    files.map(async (file) => rimraf(path.join(options.cwd, file)))
  );
  return files;
};

module.exports.default = cherryPick;
module.exports.clean = clean;
