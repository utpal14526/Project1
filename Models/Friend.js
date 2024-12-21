const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendSchema = new Schema({

  USERID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }

});

module.exports = mongoose.model("friend", FriendSchema);
