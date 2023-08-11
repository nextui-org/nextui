import ncu from 'npm-check-updates';
import glob from 'glob';
import { resolve } from 'path';


const shouldUpgrade = process.argv.includes('--upgrade');

const checkForUpdates = async (path: string) => {
  const filePaths = glob.sync(resolve(path, '**/package.json'), {
    ignore: '**/node_modules/**',
  });

  for (const filePath of filePaths) {
    try {
      const upgraded = await ncu({
        packageFile: filePath,
        filter: '/^@react-(aria|stately)\\/.*$/',
        upgrade: shouldUpgrade,
        jsonUpgraded: false,
      });
      console.log(`Upgrades for ${filePath}:`, upgraded);
    } catch (error) {
      console.error(`Error occurred while checking for updates in ${filePath}:`, error.message);
    }
  }
};

const main = async () => {
  const dirs = [resolve('app/docs'), resolve('packages')];
  for (const dir of dirs) {
    await checkForUpdates(dir);
  }
};

main();
