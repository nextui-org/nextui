/* eslint-disable no-console */
const fs = require('fs');
const path = require('path')

const coreDir = path.resolve(__dirname, '../..'); // Core directory path
const packagesDir = path.resolve(coreDir, '../..'); // Packages directory path
const componentsDir = path.resolve(packagesDir, 'components'); // Components directory path
const outputPath = path.resolve(coreDir, 'dist'); // Output directory path

const filePath = './src/index.ts'; // Updated file path
const backupFilePath = filePath + '.backup.ts'; // Backup file

const baseDocs = 'https://nextui.org/docs/components'

function generateComponents() {
    const components = fs.readdirSync(componentsDir);
    const resultList = [];

    for (const component of components) {
        const componentPath = path.resolve(componentsDir, component);

        const componentPkg = require(path.resolve(componentPath, 'package.json'));
        const componentPkgName = componentPkg.name;
        const componentVersion = componentPkg.version;
        const componentDocs = `${baseDocs}/${component}`

        const componentInfo = {
            name: component,
            package: componentPkgName,
            version: componentVersion,
            docs: componentDocs
        }

        resultList.push(componentInfo);
    }

    fs.writeFileSync(path.resolve(outputPath, 'components.json'), JSON.stringify(resultList, null, 2));
}

function main() {
    // Restore the original file from the backup
    fs.copyFile(backupFilePath, filePath, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('The original file has been restored.');

        // Delete the backup file
        fs.unlink(backupFilePath, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The backup file has been deleted.');
        });
    });

    // Generate the components meta data
    try {
        generateComponents()
    } catch (error) {
        console.error(`Generate the components Error: ${error}`)
    }
}

main()
