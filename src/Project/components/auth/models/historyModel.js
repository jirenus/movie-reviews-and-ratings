const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    userID: {
        type: "string"
    },
    movies: {
        type: "array"
    }
});
const history = mongoose.model("History", historySchema);
module.exports = history;