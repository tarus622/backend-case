const fs = require('fs');
const Document = require('../database/models/document.model');
const pdfHandler = require('../helpers/pdfHandler');
const NotFoundError = require('../errors/not-found');
const docxHandler = require('../helpers/docxHandler');

const documentsService = {
    getDocuments: async function (userData) {
        try {
            const documents = await Document.find({ accessLevel: { $lte: userData.accessLevel } })
            if (documents.length === 0) throw new NotFoundError('No documents with your access level were found');

            for (const doc of documents) {
                if (doc.contentType.includes('pdf')) {
                    await pdfHandler(doc);
                } else if (doc.contentType.includes('doc')) {
                    await docxHandler(doc);
                }
            }
            return "Success!";
        } catch (error) {
            throw error;
        }
    },

    getDocumentsByFilename: async function (userData, filename) {
        try {
            const documents = await Document.find({ filename: { $regex: new RegExp(filename, 'i') }, accessLevel: { $lte: userData.accessLevel } })
            if (documents.length === 0) throw new NotFoundError('No documents with the name provided and your access level were found');
            for (const doc of documents) {
                if (doc.contentType.includes('pdf')) {
                    await pdfHandler(doc);
                } else if (doc.contentType.includes('doc')) {
                    await docxHandler(doc);
                }
            }

            return "Success!";
        } catch (error) {
            throw error;
        }
    },

    getDocumentsByDate: async function (userData, firstDate, secondDate) {
        try {
            const formatedFirstDate = firstDate.slice(0, 10) + 'T00:00:00.471+00:00';
            const formatedSecondDate = secondDate.slice(0, 10) + 'T23:59:59.471+00:00';

            const documents = await Document.find({
                createdAt: { $gte: formatedFirstDate, $lte: formatedSecondDate },
                accessLevel: { $lte: userData.accessLevel }
            });

            if (documents.length === 0) {
                throw new NotFoundError('No documents with the provided date and your access level were found');
            }

            for (const doc of documents) {
                if (doc.contentType.includes('pdf')) {
                    await pdfHandler(doc);
                } else if (doc.contentType.includes('doc')) {
                    await docxHandler(doc);
                }
            }

            return "Success!";
        } catch (error) {
            throw error;
        }
    },

    getDocumentsByTextContent: async function (userData, textContent) {
        try {
            const documents = await Document.find({ filename: { $regex: new RegExp(filename, 'i') }, accessLevel: { $lte: userData.accessLevel } })
            if (documents.length === 0) throw new NotFoundError('No documents with the name provided and your access level were found');
            for (const doc of documents) {
                if (doc.contentType.includes('pdf')) {
                    await pdfHandler(doc);
                } else if (doc.contentType.includes('doc')) {
                    await docxHandler(doc);
                }
            }

            return "Success!";
        } catch (error) {
            throw error;
        }
    },

    uploadDocument: async function (file, body) {
        try {
            const { filename, mimetype } = file;
            const { accessLevel } = body;

            const filePath = `../uploads/${filename}`;
            const fileBuffer = fs.readFileSync(filePath);

            const document = new Document({
                file: fileBuffer,
                filename: body.filename,
                contentType: mimetype,
                accessLevel: accessLevel
            });

            await document.save();

            return document.toJSON();
        } catch (error) {
            throw error;
        }
        finally {
            const filePath = `../uploads/${file.filename}`;
            fs.unlinkSync(filePath);
        }
    }
};

module.exports = documentsService;
