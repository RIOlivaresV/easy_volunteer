const mongoose = require("mongoose");

const conversation = mongoose.Schema(
  {
    member: Array,
  },
  { timestamps: true },
  {
    versionKey: false, //Turn off versioning,
  }
);

module.exports = mongoose.model("conversation", conversation);
