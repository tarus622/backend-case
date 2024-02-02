const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(7),
    accessLevel: Joi.number().integer().positive().less(5)
});

module.exports = userSchema;
