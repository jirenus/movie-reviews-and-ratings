const authService = require('./authService');
const passport = require("../../utils/passport");


exports.getLoginPage = (req, res)=>{
    const wrongUser = req.query['invalid'] !== undefined;
    const bannedUser = req.query['banned']!== undefined;
    res.render('auth/views/login', {wrongUser, bannedUser});
}
exports.verifyAccount = (req, res, next) => {
    passport.authenticate('local',function(err,user){
        if(err){
            return next(err);
        }
        if(user.status==false){
            return res.redirect('/auth/login?banned');
        }
        if(!user)
        {
            return res.redirect('/auth/login?invalid');
        }
        req.logIn(user, function(err){
            if(err)
                return next(err);
            return res.redirect('/');
        })
    })(req,res,next);
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.getRegisterPage = (req, res)=>{
    const username_existed = req.query['username_existed']!== undefined;
    const email_existed = req.query['email_existed']!== undefined;
    res.render('auth/views/register', {
        username_existed,
        email_existed
    });
}


exports.register = async (req, res) => {
    const isValidUsername = await authService.findByUsername(req.body.username);
    const isValidEmail = await authService.findByEmail(req.body.email);
    if (isValidUsername){
        res.redirect('/auth/register?username_existed');
    }else if (isValidEmail){
        res.redirect('/auth/register?email_existed')
    }
    else{
        const newUser = await authService.createUser(req.body);
        res.redirect('/auth/login');
    }
}
exports.addToFavorite = async (req, res) => {
    const movieID = req.body.movieID;
    await authService.addToFavorite(movieID, req.user._id);
    res.redirect('/movie/review/' + movieID);
}