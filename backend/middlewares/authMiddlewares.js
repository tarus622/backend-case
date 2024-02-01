const { login, authenticateToken } = require('../services/authService');

const authMiddlewares = {
    signIn: async function (req, res, next) {
        try {
            const { token } = await login(req.body);
            const user = await authenticateToken(req.headers, process.env.SECRET_KEY);
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
    },

    findUser: async function (req, res) {
        try {
            const userEmail = req.query.email;

            if (!userEmail) {
                return res.status(400).json({ error: 'Email parameter is required' });
            }

            const foundUser = await usersService.findUserByEmail(userEmail);

            if (foundUser) {
                res.status(200).json(foundUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

};

module.exports = authMiddlewares;