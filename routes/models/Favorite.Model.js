const mongoose = require("mongoose")
const FavSchema = require('../schema/Favorite.Schema').FavoriteSchema

const FavModel = mongoose.model("Fav",  FavSchema);

function insertFav(fav) {
    console.log("jb is ",fav);
    return FavModel.create(fav);
}

function getAllFavsForUserId(userId) {
    console.log("trying to find for ", userId);
    return FavModel.find(userId).exec();
}

function deleteFavById(id) {
     console.log("passing deleet uidJObid id is ", id);
    return FavModel.findByIdAndDelete(id.substring(1)).exec();
}

function findFavById(id) {
    console.log("passing uidJObid is ", id);
    return FavModel.findById(id.substring(1)).exec();
}

function updateStatusById(id, st) {
    return FavModel.findByIdAndUpdate(id, {status: st}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertFav, 
    getAllFavsForUserId,
    findFavById,
    deleteFavById,
    updateStatusById,
};