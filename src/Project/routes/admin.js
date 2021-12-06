const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/index',{layout:'adminLayout.hbs'});
});

/* GET home page. */
router.get('/user', function(req, res, next) {
    res.render('admin/user',{layout:'adminLayout.hbs'});
});

/* GET home page. */
router.get('/movie', function(req, res, next) {
    res.render('admin/movie',{layout:'adminLayout.hbs'});
});

/* GET home page. */
router.get('/add', function(req, res, next) {
    res.render('admin/AddMovieForm',{layout:'adminLayout.hbs'});
});

/* GET home page. */
router.get('/form', function(req, res, next) {
    res.render('admin/form',{layout:'adminLayout.hbs'});
});

module.exports = router;