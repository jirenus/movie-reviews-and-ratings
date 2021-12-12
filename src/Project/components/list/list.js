var express = require("express");
var router = express.Router();
const listController = require("./listController");


router.get('/categories', listController.list);
router.post('/searchPage', listController.searchList);
module.exports = router;
