const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  movieName: String,
  type: String,
  hotRanking: Number,
  intro: String,  
  description1: String,
  description2: String,
  imageTopic:[String],
  images:[String],
  genre:String,
  author: String,
  episode: String,
  trailer: String,
  update: String
});
const movie = mongoose.model("Movie", movieSchema);

module.exports = movie;
