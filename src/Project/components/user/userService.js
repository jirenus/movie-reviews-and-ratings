const userModel = require('../auth/models/userModel');
const bcrypt = require('bcrypt');

exports.getOneUser = async (id) =>{
    const user = await userModel.findById(id).lean();
    return user;
}

exports.updateProfile = async (id, userDetail) =>{
    if (userDetail.password != "") {
        const hashPassword = await bcrypt.hash(userDetail.password, 10);
        userDetail.password = hashPassword;
        const result = await userModel.updateOne({ _id: id },
            { $set: {username: userDetail.username, name: userDetail.name,
                    email: userDetail.email, password: hashPassword} });
        return result;
    }
    else {
        const result = await userModel.updateOne({ _id: id },
            { $set: {username: userDetail.username, name: userDetail.name,
                    email: userDetail.email} });
        return result;
    }
}