const listService = require("./listService");
const siteService = require("../site/siteService")

exports.list = async function (req, res) {
  let page;
  if (req.query.page === undefined) {
    page = 1;
  } else if (req.query.page < 0) {
    page = 1;
  } else {
    page = parseInt(req.query.page);
  }
  const list = await listService.listAllMovies(page);

  let totalPage = await listService.totalMovieNum();
  totalPage = Math.ceil(totalPage / 4);

  let [movies, top8Movies, top10Movies] = await siteService.listMovies();


  res.render("list/views/list", {
    page: req.query.page, // Current Page
    totalPage, // Total Page
    list: list,
    top8Movies
  });
};

exports.item = async function (req, res) {
    let movie;
    try {
      movie = await listService.viewOne(req.params.id);
    } catch (err) {}
    res.render("review", { movie });
};

exports.searchList = async(req, res) => {
  const description = req.query.description;
  const searchList = await listService.search(description);
  let found = true;
  if (searchList.length === 0){
    found = false;
  }
  res.render('list/views/searchPage', {searchList, found, description});
}

exports.listByCategory = async function (req, res) {
  let genre=req.query.genre.charAt(0).toUpperCase() + req.query.genre.slice(1);
  let page=req.query.page
  const resList = await listService.listMoviesByCategory(genre, page);

  let totalPage=await listService.totalMovieByCategory(genre);

  totalPage=Math.ceil(totalPage.length/4)

  res.render("list/views/categories", {resList, genre,totalPage,page});
};