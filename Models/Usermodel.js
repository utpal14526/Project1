const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    pic: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// chatName
// isGroupChat
// users
// lastestMessage
// groupAdmin

module.exports = mongoose.model("user", messageModel);

//this is how y create schema in node js
