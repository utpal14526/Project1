const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageModel = new Schema({


    USERID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },

    seenmessages: {
        type: Array,
        default: []
    },
    newmessages: {
        type: Array,
        default: []
    }

}, { timesatmps: true })

module.exports = mongoose.model("messages", MessageModel);
