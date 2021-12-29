const movieModel = require("../movie/movieModel");
const userModel = require('../auth/models/userModel');
const reportModel = require('../report/reportModel');
const bcrypt = require("bcrypt");

exports.getUserList = async () => {
    const userList = await userModel.find().lean();
    return userList;
}

exports.getOneUser = async (userID) => {
    const user = await userModel.findById(userID).lean();
    return user;
}

exports.updateProfile = async (userID, userDetail) => {
    if (userDetail.password != "") {
        const hashPassword = await bcrypt.hash(userDetail.password, 10);
        userDetail.password = hashPassword;
        const result = await userModel.updateOne({_id: userID},
            {
                $set: {
                    username: userDetail.username, name: userDetail.name,
                    email: userDetail.email, password: hashPassword, status: userDetail.status
                }
            });
        return result;
    } else {
        const result = await userModel.updateOne({_id: userID},
            {
                $set: {
                    username: userDetail.username, name: userDetail.name,
                    email: userDetail.email, status: userDetail.status
                }
            });
        return result;
    }
}

exports.deleteUser = async (userID) => {
    let deletedUser = null;
    deletedUser = await userModel.findByIdAndDelete(userID);
    return deletedUser;
}

exports.lockUser = async (userID) => {
    const result = await userModel.updateOne({_id: userID},
        {$set: {status: Boolean(false)}});
    return result;
}

exports.unlockUser = async (userID) => {
    const result = await userModel.updateOne({_id: userID},
        {$set: {status: Boolean(true)}});
    return result;
}

// Report list
exports.getReportPage = async () => {
    const reportList = await reportModel.find().lean();
    return reportList;
}

exports.deleteReport = async (reportID) => {
    let deletedUser = null;
    deletedUser = await reportModel.deleteOne({_id: reportID});
    return deletedUser;
}

exports.getMovieList = async () => {
    const movieList = await movieModel.find().lean();
    return movieList;
}
exports.getShortedMovieList = async () => {
    let movieList = await movieModel.find().lean();
    movieList = movieList.map(item => {
        let movieName = item.movieName;
        if (movieName.length >= 20)
            movieName = movieName.slice(0, 18) + "...";
        return {...item, movieName: movieName};
    })
    return movieList;
}
exports.deleteMovie = async (movieID) => {
    let deletedMovie = null;
    deletedMovie = await movieModel.findByIdAndDelete(movieID);
    return deletedMovie;
}

exports.addNewMovie = async (movieDetail) => {
    const newMovie = new movieModel({
        movieName: movieDetail.movieName,
        type: movieDetail.type,
        intro: movieDetail.intro,
        description1: movieDetail.description1,
        description2: movieDetail.description2,
        description3: movieDetail.description3,
        genre: movieDetail.genre,
        author: movieDetail.author,
        episode: movieDetail.episode,
        trailer: movieDetail.trailer,
        ratings: [0, 0, 0, 0, 0]
    });
    try {
        const savedMovie = await newMovie.save();
        return savedMovie;
    } catch (err) {
        console.log(err);
    }
}

exports.getOneMovie = async (movieID) => {
    const movie = await movieModel.findById(movieID).lean();
    return movie;
}

exports.updateMovie = async (movieID, movieDetail) => {
    let updateMovie = await movieModel.updateOne({_id: movieID}, movieDetail);
    return updateMovie;
}