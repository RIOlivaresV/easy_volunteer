const profiles = require("../models/mongoModel");
const post = require("../models/postModel");
const { ObjectId } = require("mongodb");
const { Mongoose } = require("mongoose");

const status = {
  active: "Active",
  progress: "Progress",
  done: "Done",
  cancel: "Cancel",
};

exports.addPost = async function (req, res) {
  try {
    let id = req.body.id;
    let message = req.body.message;
    let date = Date.now();

    var profile = await profiles.findOne({ _id: id });

    var posted = await post.create({
      createdBy: ObjectId(profile._id),
      message: message,
      createdDate: date,
      status: status.active,
    });
    var posts = await post.find({ status: "Active" });
    // console.log(posted);
    res.status(200).send({ post: true, posts: posts });
  } catch (error) {
    res
      .status(500)
      .send("There was a problem posting this.\n **Error** \n" + error);
  }
};

exports.getPost = async function (req, res) {
  try {
    var collection = await post.find({ status: "Active" });
    var query = await post.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "createdBy",
          foreignField: "_id",
          as: "profile",
        },
      },
      { $sort: { createdDate: -1 } },
    ]);
    // console.log(collection);
    return res.status(200).send({
      query,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error here: " + error);
  }
};

exports.deletePost = async function (req, res) {
  try {
    let id = req.params.id;
    var query = await post.deleteOne({ _id: id });
    if (query.deletedCount > 0) {
      return res.status(200).send("Post deleted");
    } else {
      return res.status(200).send("Something was wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error here: " + error);
  }
};
