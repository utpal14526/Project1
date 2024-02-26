const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");
const Friend = require("../Models/Friend");
const { ObjectId } = require("mongodb");

router.post("/fetchfriend", fetchuser, async (req, res) => {
  // current logged in ke friends arr mai bhej do

  let friendsarr = await Friend.find({ USERID: req.id });

  let arr = [];

  if (friendsarr.length > 0) {
    friendsarr = friendsarr[0].Friends.length == 0 ? [] : friendsarr[0].Friends;

    for (let i = 0; i < friendsarr.length; i++) {
      const objectId = new ObjectId(friendsarr[i]); // string to Object iD

      let profile = await Profile.find({ USERID: objectId });
      arr.push(profile);
    }
  }

  res.status(200).json(arr);
});

module.exports = router;

// jinke friends abhi tak nahi hai friendarr aayega
