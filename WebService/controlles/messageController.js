const { ObjectId } = require("mongodb");
const { Mongoose } = require("mongoose");
const Message = require("../models/messageModel");

exports.newMessage = async function (req, res) {
  try {
    let message = req.body;
    console.log("this is the body ");
    console.log(message);
    var newMessage = await Message.create(message);
    var messages = await Message.find({
      conversationId: message.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessage = async function (req, res) {
  try {
    let conversationId = req.params.conversationId;
    var message = await Message.find({ conversationId: conversationId });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};
