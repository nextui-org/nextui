import ncu from 'npm-check-updates';
import glob from 'glob';
import { resolve } from 'path';

// Check for the `--upgrade` or `-u` flag
const shouldUpgrade = process.argv.includes('--upgrade') || process.argv.includes('-u');

const checkForUpdates = async (path: string) => {
  const filePaths = glob.sync(resolve(path, '**/package.json'), {
    ignore: '**/node_modules/**',
  });

  // Process all package.json files concurrently
  await Promise.all(filePaths.map(async (filePath) => {
    try {
      const upgraded = await ncu({
        packageFile: filePath,
        filter: /^@react-(aria|stately|types)\/.*/, // Proper regex
        upgrade: shouldUpgrade, // Upgrade only if --upgrade flag is passed
        jsonUpgraded: false,
      });

      if (Object.keys(upgraded).length > 0) {
        console.log(`Upgrades for ${filePath}:`, upgraded);

        if (shouldUpgrade) {
          console.log(`✅ Upgraded packages in ${filePath}`);
        }
      } else {
        console.log(`No updates found for ${filePath}.`);
      }
    } catch (error) {
      console.error(`Error checking updates for ${filePath}:`, error.message);
    }
  }));
};

const main = async () => {
  const dirs = [resolve('app/docs'), resolve('packages')];

  try {
    // Process all directories concurrently
    await Promise.all(dirs.map(checkForUpdates));
    console.log('✅ All package checks completed.');
  } catch (error) {
    console.error('Error during package checks:', error.message);
  }
};

main();