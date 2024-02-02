const fs = require('fs');
const Document = require('../database/models/document.model');
const jwt = require('jsonwebtoken');
const analyzeDoc = require('../helpers/documentAnalyze');

const documentsService = {
    getDocuments: async function (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const documents = await Document.find({ accessLevel: { $lte: decodedToken.accessLevel + 1 } })
            documents.forEach(async (doc) => {
                await analyzeDoc(doc)
            })

            return "Success!";
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    getDocumentByFilename: async function (token, filename) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const documents = Document.find({ accessLevel: { $lte: decodedToken.accessLevel + 1 } })
            return documents;
        } catch (error) {
            throw error;
        }
    },

    uploadDocument: async function (file, body) {
        try {
            const { filename, mimetype } = file;
            const { accessLevel } = body;

            const fileBuffer = fs.readFileSync(`../uploads/${filename}`);

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
    }
};

module.exports = documentsService;
