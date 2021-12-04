const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    favorites: {
        type: Array,
    },
    jobs: {
        type: Array,
    }

}, {
    collection: 'users'
})
