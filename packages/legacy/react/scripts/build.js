const path = require("path");

const {green} = require("chalk");
const webpack = require("webpack");
const fse = require("fs-extra");

const getConfig = require("../buildconfig/webpack.config");

const cherryPick = require("./cherry-pick").default;

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, "../src");
const typesRootInit = path.join(__dirname, "../types");

const libRoot = path.join(__dirname, "../lib");
const umdRoot = path.join(libRoot, "umd");
const cjsRoot = path.join(libRoot, "cjs");
const esRoot = path.join(libRoot, "esm");
const typesRoot = path.join(libRoot, "types");

const step = require("./utils").step;
const shell = require("./utils").shell;
const error = require("./utils").error;

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step("generating .d.ts", () => shell(`yarn build:types`));

const copyTypes = (dest) => fse.copySync(typesRootInit, dest, {overwrite: true});

const babel = (outDir, envName) => {
  shell(`yarn babel ${srcRoot} -x .js,.jsx,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`);
};

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step("commonjs modules", async () => {
  await babel(cjsRoot, "cjs");
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step("es modules", async () => {
  await babel(esRoot, "esm");
});

/**
 * Bundles a minified and unminified version of nextui including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildUmd = step(
  "browser distributable",
  () =>
    new Promise((resolve, reject) => {
      webpack([getConfig(umdRoot, false), getConfig(umdRoot, true)], async (err, stats) => {
        if (err || stats.hasErrors()) {
          reject(err || stats.toJson().errors);

          return;
        }

        resolve();
      });
    }),
);

const buildDirectories = step("Linking directories", () =>
  cherryPick({
    inputDir: "../src/**",
    cjsDir: "cjs",
    esmDir: "esm",
    cwd: libRoot,
  }),
);

console.log(green(`Building targets: ${targets.length ? targets.join(", ") : "all"}\n`));

clean();

Promise.resolve(true)
  .then(buildTypes)
  .then(() =>
    Promise.all([
      has("lib") && buildLib(),
      has("es") && buildEsm(),
      has("umd") && buildUmd(),
      copyTypes(typesRoot),
    ]),
  )
  .then(buildDirectories)
  .catch(error);
