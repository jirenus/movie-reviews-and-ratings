const movieModel = require("../movie/movieModel");

exports.getMovieList = async ()=>{
    const movieList = await movieModel.find().lean();
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
       trailer: movieDetail.trailer
    });
    try{
        const savedMovie = await newMovie.save();
        return savedMovie;
    }catch (err){
        console.log(err);
    }
}