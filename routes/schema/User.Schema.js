
const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    jobs:[String],
    favorites: [String],
    
// this explicitly declares what collection we're using
}, { collection : 'users' });
