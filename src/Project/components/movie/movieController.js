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
    let canRate = true;
    let movie;
    let rated = [];
    let unrated = [];
    let announcement = true;
    let comments;
    try {
      [movie, rated, unrated] = await movieService.viewOne(req.params.id);
      comments = await movieService.findComments(req.params.id);
      if (unrated === null && rated === null)
          announcement = false;
      if (req.user){
          await authService.saveToHistory(req.user._id, req.params.id);
          canRate = await movieService.isRated(req.user._id, req.params.id);
      }
    } catch (err) {}
    res.render("movie/views/review", { movie ,comments, canRate, rated, unrated, announcement});
};

exports.postComment = async function (req,res){
    if (!req.user){
        return res.redirect("/auth/login");
    }
    let comment = await movieService.postComment(req.user,req.params.id, req.body.content);
    res.redirect("/movie/review/" + req.params.id);
}
exports.rate = async (req, res) => {
    let rate = await movieService.rate(req.user._id, req.params.id, req.body.rate);
    res.redirect("/movie/review/" + req.params.id);
}