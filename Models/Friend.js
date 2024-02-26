const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendSchema = new Schema({
  USERID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  Friends: {
    type: Array,
  },
});

module.exports = mongoose.model("friend", FriendSchema);
