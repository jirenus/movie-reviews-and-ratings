const User = require('./models/userModel');
const {save} = require("debug");
const bcrypt = require("bcrypt");
const History = require('./models/historyModel');
const Favorite = require('./models/favoriteListModel');
const Movie = require('../movie/movieModel');
const UserRating = require('./models/userRatings');

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
        const userID = savedUser._id.toString();
        await History.create({
            userID: userID
        });
        await Favorite.create({
            userID: userID
        });
        await UserRating.create({
            userID: userID
        });
        return savedUser;
    }catch (err){
        console.log({message: err});
    }
}
exports.findByEmail = (email) => {
    return User.findOne({email: email}).lean();
}
exports.addToFavorite = async (movieID, userID) => {
    const favorite = await Favorite.findOne({userID: userID});
    if (!favorite.movies.includes(movieID))
        await Favorite.updateOne({userID: userID}, {$push: {movies: movieID}});
}
exports.saveToHistory = async (userID, movieID) => {
    const history = await History.findOne({userID: userID});
    if (!history.movies.includes(movieID))
        await History.updateOne({userID: userID}, {$push: {movies: movieID}});
}
exports.getFavoriteList = async (userID) => {
    let favorite = await Favorite.findOne({userID: userID}).lean();
    let movies = [];
    for (let i = 0; i < favorite.movies.length; i++) {
        let movie = await Movie.findById(favorite.movies[i]).lean();
        movies.push(movie);
    }
    return movies;
}
exports.getHistoryList = async (userID) => {
    let history = await History.findOne({userID: userID}).lean();
    let movies = [];
    for (let i = 0; i < history.movies.length; i++) {
        let movie = await Movie.findById(history.movies[i]).lean();
        movies.push(movie);
    }
    return movies;
}
