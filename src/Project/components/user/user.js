const express = require('express');
const router = express.Router();
const userController = require('./userController');


/* GET User profile page. */
router.get('/profile/:id', userController.getProfilePage);


module.exports = router;
