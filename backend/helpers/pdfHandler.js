const createPDFFromText = require('./utils/createPDF');
const extractTextFromPDF = require('./utils/extractTextFromPDF');

module.exports = async function pdfHandler(document) {
    try {
        const extractedText = await extractTextFromPDF(document.file);

        await createPDFFromText(extractedText, `${__dirname}/../../output-documents/${document.filename}.pdf`);

        return extractedText;
    } catch (error) {
        throw error;
    }
};