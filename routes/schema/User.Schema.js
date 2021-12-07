
const Schema = require('mongoose').Schema;

exports.UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    jobs:[String],
    favorites: [String],
    
// this explicitly declares what collection we're using
}, { collection : 'users' });
