var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var post = require("../controlles/postController");

router.post("/", post.addPost);
router.get("/get", post.getPost);
router.delete("/delete/:id", post.deletePost);
// router.post("/login", auth.login);

module.exports = router;
