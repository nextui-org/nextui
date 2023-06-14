/* eslint-disable no-console */
const fs = require('fs');

const filePath = './src/index.ts'; // Updated file path
const backupFilePath = filePath + '.backup.ts'; // Backup file

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
