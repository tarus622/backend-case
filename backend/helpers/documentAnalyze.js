const textract = require('textract');
const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = async function analyzeDoc(document) {
    try {
        const extractedText = await extractTextFromPDF(document.file);

        await createPDFFromText(extractedText, `./output-documents/.pdf/${document.filename}.pdf`);

        return extractedText;
    } catch (error) {
        console.error('Error analyzing document:', error);
        throw error;
    }
};

async function createPDFFromText(extractedText, outputPath) {
    const pdfDoc = new PDFDocument();

    pdfDoc.pipe(fs.createWriteStream(outputPath));

    pdfDoc.text(extractedText);

    pdfDoc.end();
}

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