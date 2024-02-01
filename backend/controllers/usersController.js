const usersService = require('../services/usersService');
const InternalServerError = require('../errors/internal-server-error');
const BadRequestError = require('../errors/bad-request');

const usersController = {
    create: async function (req, res, next) {
        try {
            const userCreated = await usersService.createUser(req.validatedData);
            res.status(201).json(userCreated);
        } catch (error) {
            if (error instanceof InternalServerError) {
                res.status(500).send('Internal Server Error');
            } else {
                next(error);
            }
        }
    },

    findUsers: async function (req, res, next) {
        try {
            const users = await usersService.findUsers();

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    findUser: async function (req, res, next) {
        try {
            const userEmail = req.query.email;

            if (!userEmail) {
                return res.status(400).json({ error: 'Email parameter is required' });
            }

            const foundUser = await usersService.findUserByEmail(userEmail);

            if (foundUser)
                res.status(200).json(foundUser);

        } catch (error) {
            next(error);
        }
    },

    editPassword: async function (req, res, next) {
        try {
            const user = await usersService.editPassword(req.body);

            if (user.success)
                res.status(201).json({ success: true, message: 'Password updated successfully' });

        } catch (error) {
            next(error);
        }
    },

    deleteUser: async function (req, res, next) {
        try {
            const userDeleted = await usersService.deleteUser(req.body.email);

            if (userDeleted.success)
                res.status(201).json({ success: true, message: 'User deleted successfully' });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = usersController;
