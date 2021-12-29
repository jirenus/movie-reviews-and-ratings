var express = require("express");
var router = express.Router();
const movieController = require("./movieController");
/* GET home page. */


router.get("/review/:id", movieController.item);
router.post("/review/:id/comment", movieController.postComment);
router.post("/review/:id/rating", movieController.rate);
module.exports = router;
