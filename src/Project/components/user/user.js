const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/report', userController.sendReport);
router.get('/profile/:id', userController.getProfilePage);
router.get('/editProfile/:id', userController.getEditProfilePage);
router.post('/editProfile/:id', userController.updateProfile);

module.exports = router;
