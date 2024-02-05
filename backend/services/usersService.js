const User = require('../database/models/user.model');
const { genSaltSync, hash } = require('bcrypt');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found')

const usersService = {
    createUser: async function (data) {
        try {
            const { username, email, password, accessLevel } = data

            const salt = genSaltSync(10);
            const passwordHashed = await hash(password, salt);

            return User.create({ username, email, password: passwordHashed, accessLevel })
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
                const { _id, username, email, accessLevel } = user;
                return { _id, username, email, accessLevel };
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

            const { _id, username, accessLevel } = user;
            return { _id, username, email, accessLevel };
        } catch (error) {
            throw error;
        }
    },

    editPassword: async function (data) {
        try {
            const { email, password } = data;
            if (password.length < 7) throw new BadRequestError('Password length must be at least 7 characters')

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