const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateToken } = require('../helpers/auth');

async function authenticateToken(headers) {
    const token = headers['authorization'];

    if (!token) {
        throw new Error('Unauthorized');
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
    const { username, password } = body;

    return new Promise((resolve, reject) => {
        if (username === 'example_user' && password === 'password123') {
            const { token, secretKey } = generateToken(body);
            resolve({ token, secretKey });
        } else {
            reject(new Error('Invalid credentials'));
        }
    });
}

module.exports = { generateToken, login, authenticateToken };
