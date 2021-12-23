const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
    userID: {
        type: "string"
    },
    movies: {
        type: "array"
    }
});
const favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = favorite;