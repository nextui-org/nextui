/* eslint-disable no-console */
const fs = require('fs');

const filePath = './src/index.ts'; // Updated file path
const backupFilePath = filePath + '.backup.ts'; // Backup file

// Create a backup of the original file
fs.copyFile(filePath, backupFilePath, (err) => {
    if (err) {
        return console.log(err);
    }

    // Read the original file and remove the "use client" directive
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        const result = data.replace('"use client";\n', '');

        fs.writeFile(filePath, result, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('The "use client" directive was removed.');
        });
    });
});
