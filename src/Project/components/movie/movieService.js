

const Movie = require("./movieModel");
const Comment = require("../comment/commentModel");

exports.postComment = async function (user,movieId,content){
    let comment = new Comment({
        movieId : movieId,
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

//exports.viewOne = (id) => Movie.findOne({ _id: id }).lean();
exports.viewOne = (id) => Movie.findById(id).lean();
