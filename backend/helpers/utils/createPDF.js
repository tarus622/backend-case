const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = async function createPDFFromText(extractedText, outputPath) {
    const pdfDoc = new PDFDocument();

    pdfDoc.pipe(fs.createWriteStream(outputPath));

    pdfDoc.text(extractedText);

    pdfDoc.end();
}