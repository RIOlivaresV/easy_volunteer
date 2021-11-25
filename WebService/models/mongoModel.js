const mongoose = require("mongoose");

const data = mongoose.Schema(
  {
    name: String,
    lastName: String,
    profileType: String,
    createdDate: Date,
    email: String,
    password: String,
    connection: {
      lat: String,
      long: String,
      status: String,
    },
    reviews: [
      {
        starts: Number,
        comments: String,
        createdBy: String,
        createdDate: Date,
      },
    ],
    voluntaring: [
      {
        benefited: String,
        createdDate: Date,
        finishedDate: Date,
      },
    ],
  },
  { timestamps: true },
  {
    versionKey: false, //Turn off versioning,
  }
);

module.exports = mongoose.model("profile", data);
