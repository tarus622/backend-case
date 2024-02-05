const Joi = require('joi');

const createDocumentSchemaValidator = Joi.object({
    filename: Joi.string().required(),
    accessLevel: Joi.number().integer().positive().less(5).min(1)
});

module.exports = createDocumentSchemaValidator;
