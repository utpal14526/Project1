const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const socket = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json()); //middleware
const DB="mongodb+srv://itsmeutpalraj:Utpaliit%40123@cluster0.yba49sl.mongodb.net/mydb";



mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));



// mongoose.connect (DB).then(()=>{

//})

// mongoose.connect(Db).then(()=>{}).

// / means this is singup

app.use("/api", require("./routes/registerUser"));
app.use("/api", require("./routes/Profile"));
app.use("/api", require("./routes/SelectFriend"));
app.use("/api", require("./routes/MakeFriend"));
app.use("/api", require("./routes/Sendcurrentprofile"));
app.use("/api", require("./routes/FetchFriendsID"));
app.use("/api", require("./routes/Messages"));


app.listen(5000, () => {
  console.log("Listening");
});



