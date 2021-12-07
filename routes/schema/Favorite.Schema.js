const Schema = require('mongoose').Schema;

exports.FavoriteSchema = new Schema({
    id:{
        type: String,
        unique: true,
    },
    userId: {
        type: String,
    },
    jobId: {
        type: String,
    },
    favOrNot: {
        type: Boolean,
    },
    status: {
        type: String,
        default: "Not Started"
    },
}, {
    collection: 'favorites'
})
