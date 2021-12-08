var express = require("express");
var router = express.Router();
const movieController = require("./movieController");
/* GET home page. */
router.get("/", movieController.home);

router.get("/:id", movieController.item);

module.exports = router;
