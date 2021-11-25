const mongoose = require("mongoose");
const profile = require("./mongoModel");

const post = mongoose.Schema(
  {
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "profile" }],
    message: String,
    createdDate: Date,
    status: String,
  },
  { timestamps: true },
  {
    versionKey: false, //Turn off versioning,
  }
);

module.exports = mongoose.model("post", post);
