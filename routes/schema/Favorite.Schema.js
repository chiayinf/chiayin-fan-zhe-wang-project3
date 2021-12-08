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
        default:true,
    },
    status: {
        type: String,
        default: "Not Started"
    },
    jobTitle: {
        type: String,
    },
    companyName: {
        type: String,
    },
    location: {
        type: String,
    },
}, {
    collection: 'favorites'
})
