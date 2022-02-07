var minify = require('terser').minify;
var fs = require('fs');
var path = require('path');
const { forEach } = require('p-iteration');
const { cyan } = require('chalk');

const error = require('./utils').error;

const libRoot = path.join(__dirname, '../lib');
const esRoot = path.join(libRoot, 'esm');
const cjsRoot = path.join(libRoot, 'cjs');

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles.filter((path) => path.match(/\.js$/));
}

async function minifyFiles(filePaths) {
  await forEach(filePaths, async (filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    const { code } = await minify(file, {
      compress: true,
      module: true,
      mangle: true,
      toplevel: true
    });
    fs.writeFileSync(filePath, code);
  });
}

const minifyLib = (dir) => {
  console.log(cyan('minifying files...'));
  const files = getAllFiles(dir);
  minifyFiles(files);
  console.log(cyan('✅ files minified'));
};

Promise.resolve(true)
  .then(() => Promise.all[(minifyLib(esRoot), minifyLib(cjsRoot))])
  .catch(error);
