const authService = require('../services/authService');

const authController = {
    signIn: async function (req, res, next) {
        try {
            const token = await authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authController;