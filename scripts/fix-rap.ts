import glob from 'glob';
import { resolve } from 'path';
import { promises as fs } from 'fs';

const fixVersions = (packageData: any) => {
  ['dependencies', 'devDependencies'].forEach(depType => {
    if (packageData[depType]) {
      Object.keys(packageData[depType]).forEach(key => {
        if (/^@react-(aria|stately|types)/.test(key)) {
          packageData[depType][key] = packageData[depType][key].replace('^', '');
        }
      });
    }
  });
};

const processPackageFiles = async (path: string) => {
  const filePaths = glob.sync(resolve(path, '**/package.json'), {
    ignore: '**/node_modules/**',
  });

  await Promise.all(
    filePaths.map(async filePath => {
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const packageData = JSON.parse(fileContent);

        fixVersions(packageData);

        await fs.writeFile(filePath, JSON.stringify(packageData, null, 2), 'utf8');
        console.log(`✅ Fixed versions in ${filePath}`);
      } catch (error) {
        console.error(`Error processing ${filePath}: ${error.message}`);
      }
    })
  );
};

const main = async () => {
  const dirs = [resolve('app/docs'), resolve('packages')];

  try {
    await Promise.all(dirs.map(dir => processPackageFiles(dir)));
    console.log('✅ All files processed successfully.');
  } catch (error) {
    console.error('Error during processing:', error.message);
  }
};

main().catch(console.error);