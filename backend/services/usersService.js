const User = require('../database/models/user.model');
const { genSaltSync, hash } = require('bcrypt');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found')

const usersService = {
    createUser: async function (data) {
        try {
            const { username, email, password } = data

            const salt = genSaltSync(10);
            const passwordHashed = await hash(password, salt);

            return User.create({ username, email, password: passwordHashed })
                .then(result => result)
                .catch(error => {
                    throw new BadRequestError(error.message)
                })
        } catch (error) {
            throw error;
        }
    },

    findUsers: async function () {
        try {
            const result = await User.find();

            if (result.length === 0) { throw new NotFoundError("Users not found") };

            const users = result.map(user => {
                const { _id, username, email } = user;
                return { _id, username, email };
            })

            return users;
        } catch (error) {
            throw error;
        }
    },

    findUserByEmail: async function (email) {
        try {
            const user = await User.findOne({ email });

            if (!user || user === null) { throw new NotFoundError("User not found") };

            const { _id, username } = user;
            return { _id, username, email };
        } catch (error) {
            throw error;
        }
    },

    editPassword: async function (data) {
        try {
            const { email, password } = data;

            const salt = genSaltSync(10);
            const passwordHashed = await hash(password, salt);

            const result = await User.updateOne({ email }, { $set: { password: passwordHashed } });

            if (result.modifiedCount === 1) {
                return { success: true, message: 'Password updated successfully' };
            } else {
                throw new NotFoundError('User not found or password not updated')
            }
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async function (email) {
        try {
            const deletedUser = await User.findOneAndDelete({ email });

            if (deletedUser) {
                return { success: true, message: 'User deleted successfully' };
            } else {
                throw new NotFoundError('User not found')
            }
        } catch (error) {
            throw error;
        }
    },
}

module.exports = usersService;