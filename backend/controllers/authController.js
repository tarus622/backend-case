const { login, authenticateToken } = require('../services/authService');

const authController = {
    signIn: async function (req, res) {
        try {
            const { token, secretKey } = await login(req.body);
            const user = await authenticateToken(req.headers, secretKey);
            console.log(token, user);

            // Rest of your logic
            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    authorize: async function (req, res) {
        try {
            return 4;
        } catch (error) {
            throw error
        }
    }

};

module.exports = authController;