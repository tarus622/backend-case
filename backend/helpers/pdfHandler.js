const textract = require('textract');
const createPDFFromText = require('./utils/createPDF');

module.exports = async function pdfHandler(document) {
    try {
        const extractedText = await extractTextFromPDF(document.file);

        await createPDFFromText(extractedText, `../output-documents/${document.filename}.pdf`);

        return extractedText;
    } catch (error) {
        throw error;
    }
};

function extractTextFromPDF(buffer) {
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