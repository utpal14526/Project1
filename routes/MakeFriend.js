const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");
const Friend = require("../Models/Friend");

router.post("/makefriend/:id", fetchuser, async (req, res) => {
  let friendData = await Friend.findOne({ USERID: req.id });

  const newData = {};
  newData.USERID = req.id;

  newData.Friends = [];

  if (friendData) {
    const id = friendData._id;
    let friendData1 = await Friend.findByIdAndDelete(id);
    newData.Friends = friendData.Friends;
  }

  let a = false;

  for (let i = 0; i < newData.Friends.length; i++) {
    if (newData.Friends[i] == req.params.id) {
      a = true;
      break;
    }
  }

  // friend already exist
  // req.id.params se bnda nikal dal de isme

  if (a == false) {
    newData.Friends.push(req.params.id); //push only
  }

  friendData = await Friend.create(newData);
  console.log(friendData);

  res.status(200).json(a);
});

module.exports = router;
