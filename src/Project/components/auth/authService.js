const User = require('./userModel');
const {save} = require("debug");
const bcrypt = require("bcrypt");

exports.findByUsername = (username) => {
    return User.findOne({
        username: username
    }).lean();
}
exports.validPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
}
exports.createUser = async (userInfo) => {
    const hashPassword = await bcrypt.hash(userInfo.password, 10);
    const user = new User({
        username: userInfo.username,
        email: userInfo.email,
        name: userInfo.name,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        return savedUser;
    }catch (err){
        console.log({message: err});
    }
}
exports.findByEmail = (email) => {
    return User.findOne({email: email}).lean();
}
