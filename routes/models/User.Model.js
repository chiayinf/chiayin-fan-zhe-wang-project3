const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function getAllUsers() {
    return UserModel.find().exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}


function insertUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({username}).exec();
    // { username: username }
}

function findPokemonByName(name) {
    return PokemonModel.find({name: name}).exec();
}

function findPokemonById(id) {
    return PokemonModel.findById(id).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    getAllUsers,
    findUserByUsername,
    //findAllFavoriteJobsByUsername,
    //findAllCreatedJobsByUsername,

    insertUser,
    //insertFavoriteJob,
    //insertNewJob,

    //removeFavoriteJob,
    //removeJob,
};