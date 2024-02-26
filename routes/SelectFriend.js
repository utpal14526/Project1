const express = require("express");
const router = express.Router();
const cors = require("cors");

const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");

router.post("/filteruser", fetchuser, async (req, res) => {
  let arr = [];

  console.log(req.body);

  const profiles = await Profile.find();
  console.log(profiles.length);

  for (let z = 0; z < profiles.length; z++) {
    if (profiles[z].USERID.toString() != req.id) {
      // console.log(profiles[z].USERID.toString);

      // console.log(req.id);
      let barr = profiles[z].SELECTINTERESTS;
      let a = true;

      for (let i = 0; i < req.body.Interests.length; i++) {
        let b = false;

        let interest = req.body.Interests[i];

        for (let j = 0; j < barr.length; j++) {
          if (interest == barr[j]) {
            b = true;
            break;
          }
        }

        if (b == false) {
          a = false;
        }
      } //for

      if (a) {
        arr.push(profiles[z]);
      }
    }
  }

  res.json(arr);
});

module.exports = router;
