const mongoose = require("mongoose");
const replySchema = new mongoose.Schema({
    userId: {
        type: "string"
    },
    userName: {
        type: "string"
    },
    userImg: {
        type: "string"
    },
    content: {
        type: "string"
    },
    createdDay: {
        type: "Date"
    }
});
const commentSchema = new mongoose.Schema({
    movieId: {
        type: "string"
    },
    userId: {
        type: "string"
    },
    userName: {
        type: "string"
    },
    userImg: {
        type: "string"
    },
    content: {
        type: "string"
    },
    createdDay: {
        type: "Date"
    },
    reply: [replySchema]
});
const comment = mongoose.model("comments", commentSchema);

module.exports = comment;
