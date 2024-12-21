const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    COLLEGENAME: {
      type: String,
      require: true,
    },

    USERID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    YEAROFGRADUATION: {
      type: Number,
      default: "",
    },

    LINKEDINID: {
      type: String,
      default: "",
    },

    PORTFOLIOLINK: {
      type: String,
      default: "",
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    rating: {
      type: Number,
      default: 0
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profile", ProfileSchema);
