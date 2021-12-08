const movieService = require("./movieService");
const { ObjectId } = require("mongodb");
const { application } = require("express");
exports.home = async function (req, res) {
  const movies = await movieService.listMovies({});

  const hot = [];
  for(let i = 0; i  < movies.length;i++) { 
    if(movies[i].hotRanking === 0) hot.push(movies[i]);
  }
  res.render("index", {movies, hot});
};

exports.item = async function (req, res) {
  if(req.params.id == "login") res.render('login');
  else if(req.params.id == "register") res.render('register');
  else if(req.params.id == "categories") res.render('categories');
  else
  {
    let movie;
    try {
      movie = await movieService.viewOne(req.params.id);
    } catch (err) {}
    res.render("review", { movie });
  }
};
