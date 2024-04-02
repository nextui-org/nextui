/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const coreDir = path.resolve(__dirname, '../..'); // Core directory path
const packagesDir = path.resolve(coreDir, '../..'); // Packages directory path
const componentsDir = path.resolve(packagesDir, 'components'); // Components directory path
const outputPath = path.resolve(coreDir, 'dist'); // Output directory path

const rootDir = path.resolve(__dirname, '../../../../..'); // Root directory path
const appsConfigDir = path.resolve(rootDir, 'apps/docs/config'); // Apps config directory path
const appsRoutesJsonPath = path.resolve(appsConfigDir, 'routes.json'); // Apps routes file path

const docsComponentsDir = path.resolve(rootDir, 'apps/docs/content/docs/components'); // Docs components directory path

const filePath = './src/index.ts'; // Updated file path
const backupFilePath = filePath + '.backup.ts'; // Backup file

const baseDocs = 'https://nextui.org/docs/components';

const EXCLUDE_LIST = ['.DS_Store'];

function generateComponents() {
    const routesJson = require(appsRoutesJsonPath);
    const routes = routesJson.routes.find(route => route.key === 'components').routes;
    const components = fs.readdirSync(componentsDir);
    const resultList = [];

    for (const component of components) {
        if (EXCLUDE_LIST.includes(component)) continue;
        const componentPath = path.resolve(componentsDir, component);

        const componentPkg = require(path.resolve(componentPath, 'package.json'));
        const componentPkgName = componentPkg.name;
        const componentVersion = componentPkg.version;
        const componentDocs = `${baseDocs}/${component}`;
        const componentDesc = componentPkg.description;

        const routeComponent = routes.find(route => route.key === component) || {};

        // Add style alias for the component
        const mdxComponentPath = path.resolve(docsComponentsDir, `${component}.mdx`);
        const mdxComponentContent = fs.existsSync(mdxComponentPath) && fs.readFileSync(mdxComponentPath, 'utf8') || '';
        const styleRegex = /<ComponentLinks[^>]*styles="([^"]*)"[^>]*>/;
        const style = mdxComponentContent.match(styleRegex)?.[1];

        const componentInfo = {
            name: component,
            package: componentPkgName,
            version: componentVersion,
            docs: componentDocs,
            description: componentDesc,
            status: (routeComponent.updated && 'updated') || (routeComponent.newPost && 'newPost') || 'stable',
            style: style || '',
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
        console.error(chalk.red(`Generate the components Error: ${error}`))
    }
}

main()
