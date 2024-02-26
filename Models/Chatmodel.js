const mongoose=require('mongoose');
const {Schema} = mongoose;

const  Chatmodel= new Schema ({

     chatName:{
        type:String,
        trim:true
     },
     isGroupChat:{
         type:Boolean,
         default:false
     },
     users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
     },],

     lastestMessage:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'Message',
     },
     groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
     }
        
},{
     timestamps:true,
 });


// chatName
// isGroupChat 
// users
// lastestMessage
// groupAdmin


module.exports = mongoose.model('Chat',Chatmodel);

//this is how y create schema in node js
