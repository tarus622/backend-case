const Joi = require('joi');

const userSchema = Joi.object({
    filename: Joi.string().required(),
    accessLevel: Joi.number().integer().positive().less(5)
});

module.exports = userSchema;
