const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");
const mongoose = require('mongoose');
const Skills = require('../Models/Skills');

router.post("/fetchcurprofile", fetchuser, async (req, res) => {


  let profile = await Profile.findOne({ USERID: req.id });

  if (profile) {
    res.status(200).json(profile);
  }

  else {

    const profile = {
      name: "",
      USERID: req.id,   // this should be come from a different point 
      COLLEGENAME: "",
      YEAROFGRADUATION: "",
      LINKEDINID: "",
      PORTFOLIOLINK: "",
      SELECTINTERESTS: [],
    };

    res.status(200).json(profile);

  }


});


router.get("/fetchprofilebyuserid/:USERID", async (req, res) => {


  let profile = await Profile.findOne({ USERID: req.params.USERID });

  if (profile) {
    res.status(200).send(profile);
  }

  else {

    const profile = {
      name: "",
      USERID: req.id,   // this should be come from a different point 
      COLLEGENAME: "",
      YEAROFGRADUATION: "",
      LINKEDINID: "",
      PORTFOLIOLINK: "",
      SELECTINTERESTS: [],
    };

    res.status(200).send(profile);

  }


});




router.get("/fetchallprofiles", fetchuser, async (req, res) => {


  let profiles = await Skills.find({}).select("-photo"); // a new way to drop baki bnde 

  // console.log(profile[0].USERID);
  // console.log(new mongoose.Types.ObjectId(req.id));



  let profile = profiles.filter((e) => {
    return (e.USERID).toString() !== req.id;
  })

  // two methods 
  // new Object(string)

  res.status(200).send({
    sucess: true,
    profile
  })


});




module.exports = router;
