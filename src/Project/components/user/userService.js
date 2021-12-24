const userModel = require('../auth/models/userModel');
const bcrypt = require("bcrypt");

exports.getOneUser = async (userID) =>{
    const user = await userModel.findById(userID).lean();
    return user;
}