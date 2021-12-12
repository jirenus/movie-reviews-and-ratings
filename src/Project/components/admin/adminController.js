const adminService = require('./adminService');

class AdminController {
    /* GET home page. */
    getDashboardPage(req, res, next) {
        res.render('admin/views/index',{layout:'adminLayout.hbs'});
    }
    /* GET home page. */
    getUserPage(req, res, next) {
        res.render('admin/views/user',{layout:'adminLayout.hbs'});
    }

    /* GET movie page. */
    async getMoviePage(req, res, next) {
        const movieList = await adminService.getMovieList();
        res.render('admin/views/movie', {layout: 'adminLayout.hbs', movieList});
    }
    async deleteMovie(req, res) {
        const movieID = req.params.id;
        const deletedMovie = await adminService.deleteMovie(movieID);
        res.redirect('/admin/movie');
    }
    async addMovie(req, res){
        const newMovie = await adminService.addNewMovie(req.body);
        res.redirect('/admin/movie');
    }
    /* GET home page. */
    getAddMovieForm(req, res, next) {
        res.render('admin/views/AddMovieForm',{layout:'adminLayout.hbs'});
    }



    /* GET home page. */
    getForm(req, res, next) {
        res.render('admin/views/form',{layout:'adminLayout.hbs'});
    }

    /* GET User profile page. */
    getProfilePage(req, res, next) {
        res.render('admin/views/userProfile',{layout:false});
    }

    /* GET User profile page. */
    getAddUserPage(req, res, next) {
        res.render('admin/views/addUserForm',{layout:false});
    }
    logout = (req, res) => {
        req.logout();
        res.redirect('/');
    }

}
module.exports = new AdminController();