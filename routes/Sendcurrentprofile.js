const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");

router.post("/fetchcurprofile", fetchuser, async (req, res) => {
  let profile = await Profile.findOne({ USERID: req.id });

  res.json(profile);
});

module.exports = router;
