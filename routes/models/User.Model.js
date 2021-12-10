const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getAllUsers() {
    return UserModel.find().exec();
}

function findUserByUsername(username) {
    return UserModel.findOne({username}).exec();
}

function getAllCreatedJobsByUser(username) {
    return UserModel.findOne({username},'created').exec();
}

function insertCreatedJobByUser(username, jobId) {
    return UserModel.findOneAndUpdate({username},{ $addToSet: { created: jobId }});
}

function deleteCreatedJobByUser(username, jobId) {
    return UserModel.findOneAndUpdate({username},{ $pull: { created: jobId } });
}



// Make sure to export a function after you create it!
module.exports = {
    insertUser,
    insertCreatedJobByUser,
    getAllUsers,
    getAllCreatedJobsByUser,
    findUserByUsername,
    deleteCreatedJobByUser,
};