const User = require('../database/models/user.model');
const NotFoundError = require('../errors/not-found');
const UnauthorizedError = require('../errors/unauthorized');
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

async function generateToken(user) {
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign({ email: user.email, accessLevel: user.accessLevel }, secretKey, { expiresIn: '1h' });
}

async function authenticateUser(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const validPassword = await compare(password, user.password);

        if (!validPassword) {
            throw new UnauthorizedError('Invalid password');
        }

        return user.toJSON();
    } catch (error) {
        throw error;
    }
}

module.exports = { generateToken, authenticateUser };
