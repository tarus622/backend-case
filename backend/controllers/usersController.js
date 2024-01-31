const usersService = require('../services/usersService');

const usersController = {
    create: async function (req, res) {
        try {
            const userCreated = await usersService.createUser(req.body);

            res.json(userCreated);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = usersController;