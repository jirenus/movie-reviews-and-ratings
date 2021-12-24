const userService = require('./userService');

class UserController {
    /* GET User profile page. */
    async getProfilePage(req, res, next) {
        const user = await userService.getOneUser(req.params.id);
        res.render('user/views/profile',{user});
    }
}

module.exports = new UserController();