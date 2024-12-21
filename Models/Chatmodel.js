const mongoose = require('mongoose');
const { Schema } = mongoose;

const Chatmodel = new Schema({

   content: {
      type: String,
   },
   users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },],

   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }

}, {
   timestamps: true,
});


// chatName
// isGroupChat 
// users
// lastestMessage
// groupAdmin


module.exports = mongoose.model('Chat', Chatmodel);

//this is how y create schema in node js
