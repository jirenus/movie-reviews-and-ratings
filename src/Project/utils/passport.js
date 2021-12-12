const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const authService = require('../components/auth/authService');
const {validPassword} = require("../components/auth/authService");

passport.use(new LocalStrategy(
    async function(username, password, done) {
        const user = await authService.findByUsername(username);
        if(!user)
            return done(null, false, {message: "Incorrect username."});
        const isValidPassword = await authService.validPassword(password, user);
        if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(async function(user, done) {
    // const user = await authService.findByUsername(username);
    done(null, user);
});
module.exports = passport;