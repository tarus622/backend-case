const documentSchema = require('../database/schemas/document.schema');

module.exports = function validationDocument(req, res, next) {
    try {
        req.body.accessLevel ? req.body.accessLevel : req.body.accessLevel = 1;
        const { error, value } = documentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        req.validatedData = value;

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
