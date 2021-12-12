
class Guard{
    loggedInUserGuard(req, res, next) {
        if (req.user){
            next();
        }
        else{
            res.redirect('/auth/login');
        }
    }
    loggedInAdminGuard(req, res, next) {
        if (req.user && req.user.userType){
            next();
        }
        else{
            res.redirect('/auth/login');
        }
    }
}
module.exports= new Guard();
