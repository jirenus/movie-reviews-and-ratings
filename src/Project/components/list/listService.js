const List = require("../movie/movieModel");


//exports.listMovies = () => List.find().lean();
const PAGE_SIZE = 4;

exports.listMovies = async (page) => {
  
    const Skip = (page - 1) * PAGE_SIZE;
    page = parseInt(page);
    let listMovie = await List.find({}).skip(Skip).limit(PAGE_SIZE);
    let topMovie = await List.find({hotRanking: 0}).lean();
    topMovie = topMovie.slice(-5);
    return [listMovie, topMovie];
};
exports.listAllMovies = (page) => {
    console.log(page);
    const Skip = (page - 1) * PAGE_SIZE;
    page = parseInt(page);
    return List.find({}).skip(Skip).limit(PAGE_SIZE);
  };
exports.listMoviesByCategory = (genre, page) => {
    const Skip = (page - 1) * PAGE_SIZE;
    page = parseInt(page);
    if (genre==null)
      return List.find({}).skip(Skip).limit(PAGE_SIZE);

      return List.find({ genre: genre}).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
};
  
exports.totalMovieNum = () => List.countDocuments();

exports.totalMovieByCategory = (genre) => List.find({ genre: genre});


//exports.viewOne = (id) => Movie.findOne({ _id: id }).lean();
exports.viewOne = (id) => List.findById(id).lean();
// search movies
exports.search = async (description) => {
    let searchList = await List.find({movieName: {"$regex": description, "$options": "i" }}).lean();
    return searchList;
}