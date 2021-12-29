const mongoose = require('mongoose');
const userRatingSchema = new mongoose.Schema({
    userID: {
        type: "string"
    },
    movies:{
        type: "array"
    }
});
const userRating = mongoose.model("UserRating", userRatingSchema);
module.exports = userRating;