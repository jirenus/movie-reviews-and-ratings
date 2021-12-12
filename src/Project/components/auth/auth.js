const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require("../../utils/passport");

router.get('/login', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);
router.post('/login', authController.verifyAccount);
router.get('/logout', authController.logout);
module.exports = router;