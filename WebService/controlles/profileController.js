const model = require("../models/mongoModel");
const { ObjectId } = require("mongodb");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");
const { Mongoose } = require("mongoose");

// Reguster a new resume
exports.addProfile = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let profileType = req.body.profileType;
    let date = Date.now();
    // const profiles = await model.findOne({'profile': {'email':email}}, {'profile':1});
    const profiles = await model.find({ email: email });
    console.log("new profile :" + profiles);
    if (profiles != "") {
      res.status(500).send("This profile already exist");
    } else {
      var hashedPassword = bcrypt.hashSync(password, 8);
      var profile = await model.create({
        name: name,
        lastName: lastName,
        profileType: profileType,
        createdDate: date,
        email: email,
        password: hashedPassword,
        connection: {
          lat: 49.2682623,
          long: -123.1100531,
          status: "OFFLINE",
        },
      });
      var token = jwt.sign({ email: email }, config.secret, {
        expiresIn: 86400,
      });
      console.log("Profile added");
      res.status(200).send({ auth: true, token: token });
    }
  } catch (error) {
    res
      .status(500)
      .send("There was a problem registering the user.\n **Error** \n" + error);
  }
};

exports.login = async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let profile = await model.findOne({ email: email });
    console.log("email :" + email + "and password has been logged");
    // let profile = profiles.profile.findOne({
    //   profile: { $elemMatch: { email: email } },
    // });
    console.log(profile);
    if (!profile) {
      console.log("You are not a user yet");
      return res
        .status(404)
        .send({ message: "You are not a user yet", status: 404 });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        String(password),
        String(profile.password)
      );
      if (!passwordIsValid) {
        console.log("Password is nor valid");
        return res.status(401).send({
          auth: false,
          token: null,
          status: 401,
          message: "User or password are invalid",
        });
      }

      var token = jwt.sign({ email: email }, config.secret, {
        expiresIn: 86400,
      });
      console.log("You got access with the token " + token);
      res.status(200).send({ auth: true, token: token, userId: profile._id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on the server.\n ~~ERROR~~\n" + error);
  }
};

exports.getUser = async function (req, res) {
  try {
    let id = req.params.id;
    console.log("this is the user Id");
    console.log(id);
    var collection = await model.findOne({ _id: id });
    console.log(collection);
    return res.status(200).send({
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: " + error);
  }
};

exports.editUser = async function (req, res) {
  try {
    let email = req.body.email;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let id = req.body._id;
    var result = await model.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name: name,
          lastName: lastName,
          email: email,
        },
      }
    );

    return res.status(200).send({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: " + error);
  }
};
