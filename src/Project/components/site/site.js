const express = require('express');
const router = express.Router();
const siteController = require('./siteController');

router.get('/', siteController.getHomepage);
module.exports = router;
