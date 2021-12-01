const Movie = require("./movieModel");


exports.listMovies = () => Movie.find().lean();

//exports.viewOne = (id) => Movie.findOne({ _id: id }).lean();
exports.viewOne = (id) => Movie.findById(id).lean();
