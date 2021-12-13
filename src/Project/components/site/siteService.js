const movieModel = require('../movie/movieModel');

exports.listMovies = async () => {
    const allMovies = await movieModel.find().lean();
    const hotMovies = await movieModel.find({hotRanking: 0}).lean();
    let top8Movies = hotMovies.slice(-8);
    let top10Movies = hotMovies.slice(-10);
    let movieList = allMovies.slice(-9);
    top8Movies = top8Movies.map(item => {
        let intro = item.intro.slice(0, 200) + "...";
        return {...item, intro: intro};
    })
    return [movieList, top8Movies, top10Movies];
}