const jwt = require('jsonwebtoken');
const { generateToken, authenticateUser } = require('../helpers/auth');
const UnauthorizedError = require('../errors/unauthorized');

async function login(body) {
    try {
        const { email, password } = body;

        const user = await authenticateUser(email, password);
        if (user) {
            const token = await generateToken(user);

            return token;
        } else {
            throw new UnauthorizedError('Invalid credentials');
        }
    } catch (error) {
        throw error;
    }
}


module.exports = { generateToken, login };
