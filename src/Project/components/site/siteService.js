const movieModel = require('../movie/movieModel');

exports.listMovies = async () => {
    const movieList = await movieModel.find().lean();
    const hotMovies = await movieModel.find({hotRanking: 0}).lean();
    let top6Movies = hotMovies.slice(6);
    let top10Movies = hotMovies.slice(-10);
    top6Movies = top6Movies.map(item => {
        let intro = item.intro.slice(0, 200) + "...";
        return {...item, intro: intro};
    })
    return [movieList, top6Movies, top10Movies];
}