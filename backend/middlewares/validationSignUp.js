const userSchema = require('../database/schemas/user.schema');

module.exports = function validationSignUp(req, res, next) {
    try {
        const { error, value } = userSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        req.validatedData = value;

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
