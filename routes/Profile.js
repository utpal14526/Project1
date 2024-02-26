const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");

router.post("/profileupdate", fetchuser, async (req, res) => {
  let profile = await Profile.findOne({ USERID: req.id });

  console.log(req.body);

  if (profile) {
    let idofprofile = profile._id;

    profile = await Profile.findByIdAndDelete(idofprofile);
  }

  let c = {
    ...req.body,
    USERID: req.id,
  };

  if(req.body.PROFILELINK.length==0){
     c = {
        ...req.body,
        USERID: req.id,
        PROFILELINK:"https://i.pinimg.com/originals/f5/c2/33/f5c233abe166b186b989293ad18ba07a.jpg",
     };
  }

  console.log(c);

  profile = await Profile.create(c); // user id bhi frontend se aayegi

  res.status(200).json(profile);
});

module.exports = router;
