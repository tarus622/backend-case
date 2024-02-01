const jwt = require('jsonwebtoken');
const { generateToken, authenticateUser } = require('../helpers/auth');
const UnauthorizedError = require('../errors/unauthorized');

async function authenticateToken(headers) {
    const token = headers['authorization'];
    const secretKey = process.env.SECRET_KEY;

    if (!token) {
        throw new UnauthorizedError('Unauthorized');
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                reject(new Error('Forbidden'));
            } else {
                resolve(user);
            }
        });
    });
}

async function login(body) {
    try {
        const { email, password } = body;

        const user = await authenticateUser(email, password);

        if (user) {
            const token = await generateToken(body);
            return token;
        } else {
            throw new UnauthorizedError('Invalid credentials');
        }
    } catch (error) {
        throw error;
    }
}


module.exports = { generateToken, login, authenticateToken };
