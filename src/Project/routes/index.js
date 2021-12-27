const siteRouter = require('../components/site/site');
const authRouter = require('../components/auth/auth');
const userRouter = require('../components/user/user');
const listRouter = require('../components/list/list');
const movieRouter = require('../components/movie/movie');
const adminRouter = require('../components/admin/admin');
const guard = require('../utils/authenticateGuard');
const express = require("express");
const path = require("path");
const createError = require("http-errors");

function route(app){
    app.use('/auth', authRouter);
    app.use('/user', guard.loggedInUserGuard, userRouter);
    app.use('/admin', guard.loggedInAdminGuard, adminRouter);
    app.use("/review", express.static(path.join(__dirname, "public")));
    app.use('/list', listRouter);
    app.use('/movie', movieRouter);
    //app.use('/list',  siteRouter);
    app.use('/',  siteRouter);
// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
    });
}
module.exports = route;