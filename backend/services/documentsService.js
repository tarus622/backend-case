const fs = require('fs');
const Document = require('../database/models/document.model');
const jwt = require('jsonwebtoken');
const pdfHandler = require('../helpers/pdfHandler');
const NotFoundError = require('../errors/not-found');
const docxHandler = require('../helpers/docxHandler');

const documentsService = {
    getDocuments: async function (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const documents = await Document.find({ accessLevel: { $lte: decodedToken.accessLevel } })
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

    getDocumentsByFilename: async function (token, filename) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const documents = await Document.find({ filename: { $regex: new RegExp(filename, 'i') }, accessLevel: { $lte: decodedToken.accessLevel } })
            if (documents.length === 0) throw new NotFoundError('No documents with the name provided and your access level were found');
            for (const doc of documents) {
                await pdfHandler(doc);
            }

            return "Success!";
        } catch (error) {
            throw error;
        }
    },

    getDocumentsByDate: async function (token, date) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const formatedDate = date.slice(0, 10) + 'T23:59:59.471+00:00';

            const documents = await Document.find({
                createdAt: { $lt: formatedDate },
                accessLevel: { $lte: decodedToken.accessLevel }
            });

            if (documents.length === 0) {
                throw new NotFoundError('No documents with the provided date and your access level were found');
            }

            for (const doc of documents) {
                await pdfHandler(doc);
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

            fs.unlinkSync(filePath);

            return document.toJSON();
        } catch (error) {
            throw error;
        }
    }
};

module.exports = documentsService;
