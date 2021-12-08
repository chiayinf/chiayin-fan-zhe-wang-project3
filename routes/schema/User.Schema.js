
const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    jobs:[String],
    favorites: {
        type: Array,
    },
    
// this explicitly declares what collection we're using
}, { collection : 'users' });
