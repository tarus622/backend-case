const createPDFFromText = require('./utils/createPDF');
const extractDocxObject = require('./utils/extractDocxObject');

module.exports = async function docxHandler(document) {
    try {
        const wordObject = await extractDocxObject(document);
        let finalText = '';

        for (let key in wordObject) {
            finalText += wordObject[key];
        }

        await createPDFFromText(finalText, `${__dirname}/../../output-documents/${document.filename}.pdf`);

        return finalText;
    } catch (error) {
        console.error('Error analyzing document:', error);
        throw error;
    }
};


