const siteService = require('./siteService');
exports.getHomepage = async (req, res) => {
    let [movies, top8Movies, top10Movies] = await siteService.listMovies();
    res.render('site/views/index', {movies, top8Movies, top10Movies});
}
