const extractTextFromPDFBuffer = require('./extractTextFromPDFBuffer');
const extractDocxObject = require('./extractDocxObject');
const analyzeText = require('./analyzeText');

module.exports = async function analyzeDocument(document) {
    try {
        let text = '';

        if (document.contentType.includes('pdf')) {
            text = await extractTextFromPDFBuffer(document.file)
        } else if (document.contentType.includes('doc')) {
            const docxObject = await extractDocxObject(document)
            for (let key in docxObject) {
                text += docxObject[key];
            }
        } else {
            throw new Error('The document provided must be a pdf or docx file')
        }

        const result = analyzeText(text);

        return result;

    } catch (error) {
        throw error;
    }

}