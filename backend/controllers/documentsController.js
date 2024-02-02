const usersService = require('../services/usersService');
const InternalServerError = require('../errors/internal-server-error');
const BadRequestError = require('../errors/bad-request');
const documentsService = require('../services/documentsService');

const documentsController = {
    getDocuments: async function (req, res, next) {
        try {
            const token = req.headers.authorization;
            const documents = await documentsService.getDocuments(token);
            res.send(documents);
        } catch (error) {
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
    }
}

module.exports = documentsController;