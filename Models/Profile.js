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
      type: String,
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

    PROFILELINK: {
      type: String,
      default:
        "https://i.pinimg.com/originals/f5/c2/33/f5c233abe166b186b989293ad18ba07a.jpg",
    },

    SELECTINTERESTS: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profile", ProfileSchema);
