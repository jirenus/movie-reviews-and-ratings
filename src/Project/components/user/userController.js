const userService = require('./userService');
const authService = require('../auth/authService');

class UserController {
    async sendReport(req, res){
        const username = req.query.username;
        const sentReport = await userService.sendReport(req.query);
        res.render('../views/thanksPage', {username});
    }

    /* GET User profile page. */
    async getProfilePage(req, res, next) {
        const user = await userService.getOneUser(req.params.id);
        const favoriteMovies = await authService.getFavoriteList(req.params.id);
        const historyMovies = await authService.getHistoryList(req.params.id);

        res.render('user/views/profile',{user, favoriteMovies, historyMovies});
    }

    async getEditProfilePage(req, res, next) {
        const user = await userService.getOneUser(req.params.id);
        res.render('user/views/editProfile', {user});
    }

    async updateProfile(req, res){
        const id = req.params.id;
        const result = await userService.updateProfile(id, req.body);
        const user = await userService.getOneUser(id);
        res.render('user/views/profile', {result, user});
    }
}

module.exports = new UserController();