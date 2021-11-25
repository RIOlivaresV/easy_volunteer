var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var auth = require("../controlles/profileController");

router.post("/register", auth.addProfile);
router.get("/profile/:id", auth.getUser);
router.put("/edit", auth.editUser);
router.post("/login", auth.login);

module.exports = router;
