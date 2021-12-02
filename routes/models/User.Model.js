const mongoose = require("mongoose")
const PokemonSchema = require('../schema/Pokemon.Schema').PokemonSchema

const PokemonModel = mongoose.model("Pokemon", PokemonSchema);

function insertPokemon(pokemon) {
    return PokemonModel.create(pokemon);
}

function getAllPokemon() {
    return PokemonModel.find().exec();
}

function findPokemonByName(name) {
    return PokemonModel.find({name: name}).exec();
}

function findPokemonById(id) {
    return PokemonModel.findById(id).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertPokemon,
    findPokemonByName,
    getAllPokemon,
    findPokemonById
};