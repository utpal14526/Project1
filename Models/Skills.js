const mongoose = require("mongoose");
const { Schema } = mongoose;


const SkillModel = new Schema({
    selectedSkills: {
        type: Array,
        default: [],
    },
    USERID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
})

module.exports = mongoose.model('skills', SkillModel);