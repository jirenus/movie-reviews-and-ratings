var express = require("express");
var router = express.Router();
const listController = require("./listController");

router.get('/',listController.list);
router.get('/categories',listController.listByCategory);
router.get('/searchPage', listController.searchList);
module.exports = router;
