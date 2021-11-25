var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var message = require("../controlles/messageController");

router.post("/", message.newMessage);
router.get("/:conversationId", message.getMessage);

module.exports = router;
