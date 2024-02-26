const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    Chatusers: {
      type: Array,
      require: true,
    },

    message: {
      type: String,
      require: true,
    },

    Sender: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
