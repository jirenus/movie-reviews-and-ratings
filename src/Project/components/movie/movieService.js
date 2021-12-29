const Movie = require("./movieModel");
const Comment = require("../comment/commentModel");
const UserRating = require('../auth/models/userRatings');


exports.postComment = async function (user, movieId, content) {
    let comment = new Comment({
        movieId: movieId,
        userId: user,
        userName: user.name,
        userImg: user.avatar,
        content: content,
        createdDay: new Date(),
        reply: null
    });
    await comment.save()
    return comment;

}

exports.findComments = async function (id) {
    return Comment.find({movieId: id}).lean();
}

exports.listMovies = () => Movie.find().lean();
// exports.viewOne = (id) => Movie.findById(id).lean();
exports.viewOne = (id) => Movie.findOne({ _id: id }).lean();
exports.viewOne = async (id) => {
    let rated = [];
    let unrated = [];
    const movie = await Movie.findById(id).lean();
    let rating = movie.ratings;
    let sum = 0;
    let p = 0;
    let count = 0;
    for (let i = 0; i < rating.length; i++){
        if (rating[i] === 0)
            count++;
        sum += rating[i];
        p += (i+1)*rating[i];
    }
    if (count === 5)
        return [movie, null, null];
    let actualRate = Math.floor(p/sum);
    rated = Array(actualRate).fill(1);
    unrated = Array(5 - actualRate).fill(0);
    return [movie, rated, unrated];
}

exports.rate = async (userID, movieID, rate) => {
    await UserRating.updateOne({userID: userID}, {$push: {movies: movieID}});
    let movie = await Movie.findById(movieID).lean();
    let newRatings = movie.ratings;
    rate = parseInt(rate);
    newRatings[rate - 1] += 1; // add new rating
    await Movie.updateOne({_id: movieID}, {$set: {ratings: newRatings}});
}
exports.isRated = async (userID, movieID) => {
    let rating = await UserRating.findOne({userID: userID}).lean();
    for (let i = 0; i < rating.movies.length; i++) {
        if (rating.movies[i] === movieID)
            return true;
    }
    return false;
}