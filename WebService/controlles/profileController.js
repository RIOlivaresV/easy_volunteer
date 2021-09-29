const model = require("../models/mongoModel");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");

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
    const profiles = await model.find({
      profile: { $elemMatch: { email: email } },
    });
    // console.log("new profile :" + profiles);
    if (profiles != "") {
      res.status(500).send("This profile already exist");
    } else {
      var hashedPassword = bcrypt.hashSync(password, 8);
      var profile = await model.updateOne(
        {},
        {
          $push: {
            profile: {
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
            },
          },
        }
      );
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
    var collection = await model.findOne({}, { profile: 1 });
    let profiles = collection.profile;
    console.log("email :" + email + "and password has been logged");
    // let profile = profiles.profile.findOne({
    //   profile: { $elemMatch: { email: email } },
    // });
    let profile = profiles.find((element) => element.email == email);
    if (!profile) {
      console.log("NO user found");
      return res.status(404).send("No user found.");
    }
    console.log(profiles);
    console.log(profiles.profile);
    console.log(
      "Password from body " + password + "\nPassword from database " + profile
    );
    var passwordIsValid = bcrypt.compareSync(
      String(password),
      String(profile.password)
    );
    if (!passwordIsValid) {
      console.log("Password is nor valid");
      return res.status(401).send({ auth: false, token: null });
    }

    var token = jwt.sign({ email: email }, config.secret, {
      expiresIn: 86400,
    });
    console.log("You got access with the token " + token);
    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on the server.\n ~~ERROR~~\n" + error);
  }
};
