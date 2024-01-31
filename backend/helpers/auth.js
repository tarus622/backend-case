module.exports = function generateToken(body) {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return { token: jwt.sign({ id: body.id }, secretKey, { expiresIn: '1h' }), secretKey };
}