const listService = require("./listService");
const { ObjectId } = require("mongodb");
const { application } = require("express");
exports.list = async function (req, res) {
  // const list = await listService.listMovies({});
  // console.log("listtttttttttt");
  // res.render("list", {list});

  let page;
  if (req.query.page === undefined) {
    page = 1;
  } else if (req.query.page < 0) {
    page = 1;
  } else {
    page = parseInt(req.query.page);
  }
  const list = await listService.listMovies(page);
 
  let totalPage = await listService.totalMovieNum();
  totalPage = Math.ceil(totalPage / 4);
  
  res.render("list", {
    page: req.query.page, // Current Page
    totalPage, // Total Page
    list: list,
  });
};

exports.item = async function (req, res) {
  if(req.params.id == "login") res.render('login');
  else if(req.params.id == "register") res.render('register');
  else if(req.params.id == "categories") res.render('categories');
  else
  {
    let movie;
    try {
      movie = await listService.viewOne(req.params.id);
    } catch (err) {}
    res.render("review", { movie });
  }
};
