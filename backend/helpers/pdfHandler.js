const createPDFFromText = require('./utils/createPDF');
const extractTextFromPDFBuffer = require('./utils/extractTextFromPDFBuffer');

module.exports = async function pdfHandler(document) {
    try {
        const extractedText = await extractTextFromPDFBuffer(document.file);

        await createPDFFromText(extractedText, `${__dirname}/../../output-documents/${document.filename}.pdf`);

        return extractedText;
    } catch (error) {
        throw error;
    }
};