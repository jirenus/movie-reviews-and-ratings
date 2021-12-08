var express = require("express");
var router = express.Router();
const listController = require("./listController");
/* GET home page. */
router.get("/", listController.list);

router.get("/:id", listController.item);

module.exports = router;
