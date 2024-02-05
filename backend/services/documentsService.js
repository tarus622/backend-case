const fs = require('fs');
const Document = require('../database/models/document.model');
const pdfHandler = require('../helpers/pdfHandler');
const NotFoundError = require('../errors/not-found');
const docxHandler = require('../helpers/docxHandler');
const documentsFilter = require('../helpers/documentsFilter');

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
            return documents;
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

            return documents;
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

            return documents;
        } catch (error) {
            throw error;
        }
    },

    getDocumentsByKeyword: async function (userData, word) {
        try {
            const documents = await Document.find({ accessLevel: { $lte: userData.accessLevel } })
            const documentsFiltered = await documentsFilter(documents, word);

            if (documentsFiltered.length === 0) throw new NotFoundError('No documents with the word provided and your access level were found');
            for (const doc of documentsFiltered) {
                if (doc[0].contentType.includes('pdf')) {
                    await pdfHandler(doc[0]);
                } else if (doc[0].contentType.includes('doc')) {
                    await docxHandler(doc[0]);
                }
            }

            return documents;
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
                accessLevel: accessLevel,
            });

            await document.save();

            return document;
        } catch (error) {
            throw error;
        }
        finally {
            const filename = file.filename;
            const filePath = `${__dirname}/../../uploads/${filename}`;
            fs.unlinkSync(filePath);
        }
    },

    updateDocumentById: async function (file, body, id) {
        try {
            const { filename, mimetype } = file;
            const { accessLevel } = body;

            const filePath = `../uploads/${filename}`;
            const fileBuffer = fs.readFileSync(filePath);

            const updatedDocument = await Document.findOneAndUpdate({ _id: id }, {
                file: fileBuffer,
                filename: body.filename,
                contentType: mimetype,
                accessLevel: accessLevel,
            })

            if (!updatedDocument) throw new NotFoundError('Document not found or not updated')

            return document;
        } catch (error) {
            throw error;
        }
        finally {
            const filename = file.filename;
            const filePath = `${__dirname}/../../uploads/${filename}`;
            fs.unlinkSync(filePath);
        }
    },

    deleteDocumentById: async function (id) {
        try {
            const deletedDocument = await Document.findOneAndDelete({ _id: id });
            if (!deletedDocument) throw new NotFoundError('Document not found or not deleted')

            return document;
        } catch (error) {
            throw error;
        }
    }

};

module.exports = documentsService;
