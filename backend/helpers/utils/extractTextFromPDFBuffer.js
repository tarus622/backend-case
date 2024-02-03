const textract = require('textract');

module.exports = function extractTextFromPDFBuffer(buffer) {
    return new Promise((resolve, reject) => {
        textract.fromBufferWithMime('application/pdf', buffer, (err, text) => {
            if (err) {
                reject(err);
            } else {
                resolve(text);
            }
        });
    });
}