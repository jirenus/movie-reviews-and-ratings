const adminService = require('./adminService');

class AdminController {
    /* GET home page. */
    async getDashboardPage(req, res, next) {
        const userList = await adminService.getUserList();
        const movieList = await adminService.getShortedMovieList();
        res.render('admin/views/index',{layout:'adminLayout.hbs', userList, movieList});
    }
    /* GET home page. */
    async getUserPage(req, res, next) {
        const userList = await adminService.getUserList();
        res.render('admin/views/user',{layout:'adminLayout.hbs', userList});
    }

    /* GET User profile page. */
    async getProfilePage(req, res, next) {
        const user = await adminService.getOneUser(req.params.id);
        res.render('admin/views/userProfile',{layout:'adminLayout.hbs', user});
    }

    async getUpdateProfilePage(req, res, next) {
        const user = await adminService.getOneUser(req.params.id);
        res.render('admin/views/updateProfile', {layout:'adminLayout.hbs', user});
    }

    async updateProfile(req, res){
        // if (req.body.password !== "")
        //     req.body.password = await adminService.hashPassword(req.body.password);
        const userID = req.params.id;
        const result = await adminService.updateProfile(userID, req.body);
        const user = await adminService.getOneUser(userID);
        res.render('admin/views/userProfile', {layout:'adminLayout.hbs', result, user});
    }

    async deleteUser(req, res) {
        const userID = req.params.id;
        const deletedUser = await adminService.deleteUser(userID);
        res.redirect('/admin/user');
    }

    async lockUser(req, res){
        const userID = req.params.id;
        const result = await adminService.lockUser(userID);
        res.redirect('/admin/user');
    }

    async unlockUser(req, res){
        const userID = req.params.id;
        const result = await adminService.unlockUser(userID);
        res.redirect('/admin/user');
    }

    async getReportPage(req, res, next) {
        const reportList = await adminService.getReportPage();
        res.render('admin/views/report',{layout:'adminLayout.hbs', reportList});
    }

    async deleteReport(req, res) {
        const reportID = req.params.id;
        const deletedReport = await adminService.deleteReport(reportID);
        res.redirect('/admin/report');
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
    async getUpdateMoviePage(req, res){
        const movieID = req.params.id;
        const movie = await adminService.getOneMovie(movieID);
        res.render('admin/views/updateMovie', {layout:'adminLayout.hbs', movie});
    }
    async updateMovie(req, res){
        const movieID = req.params.id;
        const newMovie = await adminService.updateMovie(movieID, req.body);
        const movie = await adminService.getOneMovie(movieID);
        res.render('admin/views/updateMovie', {layout:'adminLayout.hbs', newMovie, movie});
    }


    /* GET home page. */
    getForm(req, res, next) {
        res.render('admin/views/form',{layout:'adminLayout.hbs'});
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