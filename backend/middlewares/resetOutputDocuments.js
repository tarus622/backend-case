const fs = require('fs');
const path = require('path');
const InternalServerError = require('../errors/internal-server-error');

const folderPath = `${__dirname}/../../output-documents`;

module.exports = function resetOutputDocuments(req, res, next) {
    try {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            files.forEach(file => {
                const filePath = path.join(folderPath, file);

                fs.unlink(filePath, err => {
                    if (err) {
                        new InternalServerError('Error deleting file:', filePath, err);
                    } else {
                        console.log('File deleted:', filePath);
                    }
                });
            });
        });
        next();
    } catch (error) {
        next(error);
    }

}

