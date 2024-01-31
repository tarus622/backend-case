const { User } = require('../database/models/user.model');
const crypto = require('crypto');

const usersService = {
    createUser: function (body) {
        try {
            const { username, email, password } = body


            return User.create(body)
                .then(result => result)
                .catch(error => { throw new Error(error.message) })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = usersService;