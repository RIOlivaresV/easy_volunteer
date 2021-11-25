var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var conversation = require("../controlles/conversatioCcontroller");

router.post("/", conversation.newConversation);
router.get("/:userId", conversation.getConversation);

module.exports = router;
