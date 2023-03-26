const fs = require('fs');
const glob = require('glob');

const contentToPrepend = '"use client";\n\n';
const keyword = 'displayName';
const fileExtension = '.mjs';
const targetPattern = './packages/components/**/dist/**/*' + fileExtension;
const ignorePattern = './packages/components/**/node_modules/**';

function readDirRecursively(pattern) {
  return new Promise((resolve, reject) => {
    glob(pattern, { root: '../', ignore: ignorePattern }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function prependContentToFile(file, content) {
  // Ignore any files that include "node_modules"
  if (file.includes('node_modules')) {
    return;
  }
  
  const fileContent = fs.readFileSync(file, 'utf8');

  // Check if file contains the keyword
  if (fileContent.includes(keyword) && !fileContent.startsWith(contentToPrepend)) {
    console.log(`Prepending content to: ${file}`);
    const updatedContent = content + fileContent;
    fs.writeFileSync(file, updatedContent, 'utf8');
  }
}

readDirRecursively(targetPattern)
  .then((mjsFiles) => {
    console.log(`Found ${mjsFiles.length} files to process.`);
    mjsFiles.forEach((file) => {
      prependContentToFile(file, contentToPrepend);
    });

    console.log('Operation completed.');
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });
