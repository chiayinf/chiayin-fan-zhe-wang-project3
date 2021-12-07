const mongoose = require("mongoose")
const FavSchema = require('../schema/Favorite.Schema').FavoriteSchema

const FavModel = mongoose.model("Fav", FavSchema);

function insertFav(fav) {
    console.log("jb is ", fav);
    return FavModel.create(fav);
}

function getAllFavsForUserId(userId) {
    console.log("trying to find for ", userId);
    console.log("trying to find for ", { userId: userId });
    return FavModel.find({ userId: userId }).exec();
}

function deleteFavById(id) {
    console.log("passing deleet uidJObid id is ", id);
    return FavModel.findOneAndDelete({id:id}).exec();
}

function updateStatusById(id, st) {
    console.log("update for id is ", id, st);
    return FavModel.findOneAndUpdate(id, { status: st }).exec();
}

function findFavById(id) {
    console.log("passing uidJObid is ", id);
    return FavModel.findOne({id:id}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertFav,
    getAllFavsForUserId,
    deleteFavById,
    updateStatusById,
    findFavById,
};