const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden');
const UnauthorizedError = require('../errors/unauthorized');

module.exports = async function authenticateToken(req, res, next) {
    try {
        const token = req.headers['authorization'];
        const secretKey = process.env.SECRET_KEY;

        if (!token) {
            throw new UnauthorizedError('Unauthorized');
        }

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                next(new ForbiddenError('Forbidden'));
            } else {
                req.user = user;
                next();
            }
        });
    } catch (error) {
        next(error);
    }

}