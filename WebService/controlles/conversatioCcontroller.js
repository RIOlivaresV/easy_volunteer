const { ObjectId } = require("mongodb");
const { Mongoose } = require("mongoose");
const Conversation = require("../models/conversationModel");
const profiles = require("../models/mongoModel");

exports.newConversation = async function (req, res) {
  try {
    let senderId = req.body.senderId;
    let recieverId = req.body.recieverId;
    console.log("sender and reciever");
    console.log(senderId);
    console.log(recieverId);
    let conversation = await Conversation.find({
      $or: [
        { member: [senderId, recieverId] },
        { member: [recieverId, senderId] },
      ],
    });
    console.log("conversation");
    console.log(conversation);
    console.log(conversation == []);
    if (conversation == "") {
      conversation = await Conversation.create(
        {
          member: [senderId, recieverId],
        },
        {
          if(err) {
            console.log(err);
          },
        }
      );
      console.log("Conversation created");
      console.log(senderId);
      console.log(recieverId);
      res.status(200).json(conversation);
    }
    res.status(500).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getConversation = async function (req, res) {
  try {
    let id = req.params.userId;
    let conversation = await Conversation.find({ member: { $in: [id] } });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
