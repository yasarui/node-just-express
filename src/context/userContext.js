const User = require('../models/user');

class userContext {
    getAllUsers() {
        return User.find({}).then((response) => {
            return response
        }).catch((e) => {
            throw new Error(e)
        })
    }
    getUser(id) {
        return User.findById(id)
            .then((user) => {
                return user;
            })
            .catch((e) => {
                throw new Error(e)
            })
    }
    addUser(user) {
        return new User(user).save()
            .then((response) => {
                return response;
            }).catch((e) => {
                throw new Error(e);
            })
    }
}

module.exports = new userContext();