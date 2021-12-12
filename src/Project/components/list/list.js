var express = require("express");
var router = express.Router();
const listController = require("./listController");


router.get('/categories', listController.list);
router.get('/searchPage', listController.searchList);
module.exports = router;
