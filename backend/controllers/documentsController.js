const BadRequestError = require('../errors/bad-request');
const documentsService = require('../services/documentsService');

const documentsController = {
    getDocuments: async function (req, res, next) {
        try {
            const userData = req.user;
            const documents = await documentsService.getDocuments(userData);
            res.send(documents);
        } catch (error) {
            next(new BadRequestError(error));
        }
    },

    getDocumentsByName: async function (req, res, next) {
        try {
            const userData = req.user;
            const { filename } = req.body;
            const documents = await documentsService.getDocumentsByFilename(userData, filename);
            res.send(documents);
        } catch (error) {
            next(new BadRequestError(error));
        }
    },

    getDocumentsByDate: async function (req, res, next) {
        try {
            const userData = req.user;
            const { firstDate, secondDate } = req.body;
            const documents = await documentsService.getDocumentsByDate(userData, firstDate, secondDate);
            res.send(documents);
        } catch (error) {
            next(new BadRequestError(error));
        }
    },

    getDocumentsByKeyword: async function (req, res, next) {
        try {
            const userData = req.user;
            const { keyword } = req.body;
            const documents = await documentsService.getDocumentsByKeyword(userData, keyword);
            res.send(documents);
        } catch (error) {
            console.log(error)
            next(new BadRequestError(error));
        }
    },

    uploadDocument: async function (req, res, next) {
        try {
            const body = req.body;
            const file = req.file;
            const document = await documentsService.uploadDocument(file, body);
            res.send(document);
        } catch (error) {
            next(new BadRequestError(error));
        }
    },

    updateDocument: async function (req, res, next) {
        try {
            const body = req.body;
            const file = req.file;
            const { id } = req.params;
            const document = await documentsService.uploadDocument(file, body, id);
            res.send(document);
        } catch (error) {
            next(new BadRequestError(error));
        }
    },

    deleteDocument: async function (req, res, next) {
        try {
            const { id } = req.params;
            const document = await documentsService.deleteDocumentById(id);
            res.send(document);
        } catch (error) {

        }
    }
}

module.exports = documentsController;