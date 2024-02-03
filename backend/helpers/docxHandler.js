const createPDFFromText = require('./utils/createPDF');
const WordExtractor = require("word-extractor");

module.exports = async function docxHandler(document) {
    try {
        const extractor = new WordExtractor();
        const wordObject = await extractor.extract(document.file);
        let finalText = '';

        for (let key in wordObject) {
            finalText += wordObject[key];
        }

        await createPDFFromText(finalText, `../output-documents/${document.filename}.pdf`);

        return finalText;
    } catch (error) {
        console.error('Error analyzing document:', error);
        throw error;
    }
};


