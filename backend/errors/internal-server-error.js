const createError = require('http-errors');

class InternalServerError extends createError.HttpError {
    constructor(message) {
        super(500, message);
        this.name = 'InternalServerError';
    }
}

module.exports = InternalServerError;
