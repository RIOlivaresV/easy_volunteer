const mongoose = require("mongoose");

const message = mongoose.Schema(
  {
    conversationId: String,
    senderId: String,
    text: String,
    createdDate: Date,
  },
  { timestamps: true },
  {
    versionKey: false, //Turn off versioning,
  }
);

module.exports = mongoose.model("message", message);
