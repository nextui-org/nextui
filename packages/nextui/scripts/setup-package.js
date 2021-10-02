const fs = require('fs-extra');
const path = require('path');
const libRoot = path.join(__dirname, '../lib');

function main() {
  const source = fs
    .readFileSync(__dirname + '/../package.json')
    .toString('utf-8');
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};

  if (sourceObj.main.startsWith('lib/')) {
    sourceObj.main = sourceObj.main.replace('lib/', '');
  }
  if (sourceObj.module.startsWith('lib/')) {
    sourceObj.module = sourceObj.module.replace('lib/', '');
  }
  if (sourceObj.unpkg.startsWith('lib/')) {
    sourceObj.unpkg = sourceObj.unpkg.replace('lib/', '');
  }
  if (sourceObj.types.startsWith('lib/')) {
    sourceObj.types = sourceObj.types.replace('lib/', '');
  }
  if (sourceObj.publishConfig) {
    delete sourceObj.publishConfig;
  }
  if (sourceObj.files) {
    delete sourceObj.files;
  }
  fs.writeFileSync(
    libRoot + '/package.json',
    Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8')
  );
}

module.exports = main;
