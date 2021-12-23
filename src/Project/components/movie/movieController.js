const movieService = require("./movieService");
const { ObjectId } = require("mongodb");
const { application } = require("express");
const authService = require('../auth/authService');
exports.home = async function (req, res) {
  const movies = await movieService.listMovies({});

  const hot = [];
  for(let i = 0; i  < movies.length;i++) { 
    if(movies[i].hotRanking === 0) hot.push(movies[i]);
  }
  res.render("index", {movies, hot});
};

exports.item = async function (req, res) {
    let movie;
    let comments;
    try {
      movie = await movieService.viewOne(req.params.id);
      comments = await movieService.findComments(req.params.id);
      if (req.user){
          await authService.saveToHistory(req.user._id, req.params.id);
      }
    } catch (err) {}
    res.render("movie/views/review", { movie ,comments});
};

exports.postComment = async function (req,res){
    if (!req.user){
        return res.redirect("/auth/login");
    }
    let comment = await movieService.postComment(req.user,req.params.id, req.body.content);
    res.redirect("/movie/review/" + req.params.id);
}