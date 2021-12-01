const movieService = require("./movieService");
const { ObjectId } = require("mongodb");
const { application } = require("express");
exports.list = async function (req, res) {
  const movies = await movieService.listMovies({});

  res.render("index", {movies});
};

// exports.item = async function (req, res) {
//   const movie = await movieService.viewOne(ObjectId(req.params.id));

//   res.render("review", { movie });

  
// };
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
