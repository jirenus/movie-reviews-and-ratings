var express = require("express");
var router = express.Router();
const movieController = require("./movieController");
/* GET home page. */


router.get("/review/:id", movieController.item);

module.exports = router;
