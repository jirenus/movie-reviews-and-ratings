const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: "string"
    },
    email: {
        type: "string"
    },
    password: {
        type: "string"
    },
    name: {
        type: "string"
    },
    status: {
        type: "boolean",
        default: true // true is active, false is banned
    },
    userType: {
        type: "boolean",
        default: false // false is user, true is admin
    },
    avatar: {
        type: "string"
    },
    avatarID: {
        type: "string"
    }
});
const user = mongoose.model("User", userSchema);
module.exports = user;