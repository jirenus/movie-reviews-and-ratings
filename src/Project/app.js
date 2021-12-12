const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require('express-session');
const passport = require("./utils/passport");
const siteRouter = require('./components/site/site');
const authRouter = require('./components/auth/auth');
const listRouter = require('./components/list/list');
const movieRouter = require('./components/movie/movie');
const adminRouter = require('./routes/admin');
const guard = require('./utils/authenticateGuard');


const app = express();


// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'components')]);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

// app.use("/review", express.static(path.join(__dirname, "public")));
app.use('/admin', guard.loggedInAdminGuard, adminRouter);
app.use('/auth', authRouter);
app.use('/list', listRouter);
app.use('/movie', movieRouter);
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

module.exports = app;
