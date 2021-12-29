const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  movieName: String,
  type: String,
  hotRanking:{
    type: "number",
    default: "1"
  },
  intro: String,  
  description1: String,
  description2: String,
  description3: String,
  imageTopic:[String],
  images:[String],
  genre:String,
  author: String,
  episode: String,
  trailer: String,
  update: {
    type: "string",
    default: "new"
  },
  ratings:{
    type: "array"
  }
});
const movie = mongoose.model("Movie", movieSchema);

module.exports = movie;
